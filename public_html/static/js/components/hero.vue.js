import { initModel, animateModel } from '../../models/desktop-computer/model.js';
export const hero = {
    props: {
        title: { type: String, required: false, default: '' },
        highlightTitle: { type: String, required: false, default: '' },
        subTitle: { type: String, required: false, default: '' },
        introTitle: { type: String, required: false, default: '' },
        introContent : { type: String, required: false, default: '' },
        backgroundImage: { type: String, required: false, default: '' },
        modelSrc: { type: String, required: false, default: '' },
    },
    data() {
        return {
            className: 'hero',
            modelLoadingProgress: 0,
            animatProxy: null,
            animatControl: {
                animating: false,
                animatingIcon: {
                    on: 'fa-regular fa-circle-stop',
                    off: 'fa-regular fa-circle-play',
                },
                following: true,
                followingIcon: {
                    on: 'fa-solid fa-lock',
                    off: 'fa-solid fa-lock-open',
                }
            },
        };
    },
    methods: {
        init() {
            const canvas = this.$refs.ModelCanvas;
            if (!this.modelSrc) return;
            initModel(canvas, this.modelSrc, (progress) => {
                this.modelLoadingProgress = Math.floor(progress);
            }).then(({ scene, camera, renderer, model, controls, resizeHandler }) => {
                if (!model) console.error('*** Failed to Initialize Hero Model');
                this.animatProxy = animateModel(renderer, scene, camera, model, controls, resizeHandler);
                this.animatControl.animating = true;
                this.animatControl.following = true;
            }).catch(error => { console.error('***Hero Model Initialization Failed:', error); });
        },
        lockAnimation() {
            if (this.animatProxy) this.animatProxy.lockMouseControl();
        },
        unlockAnimation() {
            if (this.animatProxy) this.animatProxy.unlockMouseControl();
        },
        stopAnimation() {
            if (this.animatProxy) {
                this.animatProxy.stop();
                // this.animatProxy.unregisterEvents();
                this.animatProxy = null;
                this.animatControl.animating = false;
            }
        },
        restartAnimation() {
            if (!this.animatProxy) {
                this.init()
            }
        },
        toggleAnimationFollow() {
            if (!this.animatProxy) return;
            if (this.animatControl.following) this.animatProxy.lockMouseControl();
            else this.animatProxy.unlockMouseControl();
            this.animatControl.following = !this.animatControl.following;
        },
        toggleAnimation() {
            if (this.animatProxy && this.animatProxy.animationId) this.stopAnimation();
            else this.restartAnimation();
        },
    },
    mounted () {
        this.init();
    },
    unmounted() {
        this.stopAnimation();
    },
    template: `
    <section :class="className + '-container'" :style="{ backgroundImage: backgroundImage ? 'url(' + backgroundImage + ')' : '' }">
      <!-- <div :class="className + '-blur-overlay'"></div> -->
      <div v-if="modelSrc && modelLoadingProgress < 100" :class="className + '-model-progress-bar-wrapper'">
        <div :class="className + '-model-progress-bar-container'">
          <div :class="className + '-model-progress-bar'" :style="{ width: modelLoadingProgress + '%' }"/>
        </div>
        <span :class="className + '-progress-text'">{{ modelLoadingProgress }}%</span>
      </div>
      
      <div :class="className + '-content-wrapper'">
        <div :class="className + '-content'">
          <div :class="className + '-icon'">
            <div :class="className + '-icon-line-gradient'"></div>
          </div>
          <div :class="className + '-text'">
            <h1>{{ title }}&nbsp;<span :class="className + '-highlight-text'">{{ highlightTitle }}</span></h1>
            <p v-html="subTitle"/>
            </p>
          </div>
        </div>

        <div :class="className + '-content-secondary'">
          <h2>{{ introTitle }}</h2>
          <p v-html="introContent"/>
          <button>About Me&nbsp;&nbsp;>></button>
        </div>
      </div>

      <div v-if="modelSrc" :class="className + '-button-wrapper'">
        <button @click="toggleAnimation" :class="className + '-animation-control-btn'">
          <i :class="animatControl.animating ? animatControl.animatingIcon.on : animatControl.animatingIcon.off"/>
        </button>
        <button @click="toggleAnimationFollow" :class="className + '-animation-follow-control-btn'">
          <i :class="animatControl.following ? animatControl.followingIcon.on : animatControl.followingIcon.off"></i>
        </button>
      </div>

      <canvas ref="ModelCanvas" :class="className + '-model-canvas'"></canvas>
    </section>
    `,
};

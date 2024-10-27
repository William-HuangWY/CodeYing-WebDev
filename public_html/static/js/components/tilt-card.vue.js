import VanillaTilt  from './src/vanilla-tilt.js'

export const tiltCard = {
    props: {
        title: { type: String, default: '' },
        icon: { type: String, default: '' },
        content: { type: String, default: '' },
        maxTilt: { type: Number, default: 15 },
        scale: { type: Number, default: 1.05 },
        glare: { type: Boolean, default: true },
        maxGlare: { type: Number, default: 0.2 },
    },
    data() {
        return {
            className: 'tilt-card',
        };
    },
    mounted() {
        VanillaTilt.init(this.$refs.tiltCard, {
          max: this.maxTilt,
          scale: this.scale,
          glare: this.glare,
          "max-glare": this.maxGlare,
        });
    },
    unmounted() {
        if (this.$refs.tiltCard && this.$refs.tiltCard.vanillaTilt) {
            this.$refs.tiltCard.vanillaTilt.destroy();
        }
    },
    template: `
    <div ref="tiltCard" :class="className" data-tilt data-tilt-glare>
      <div :class="className + '-content'">
        <img :src="icon" :alt="title" v-if="icon" />
        <h3>{{ title }}</h3>
        <motion-div animation="scale-up"><p>{{ content }}</p></motion-div>
      </div>
    </div>
    `,
};
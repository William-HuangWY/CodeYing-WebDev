export const motionDiv = {
    props: {
        animation: { type: String, required: false, default: 'dummy' },
        onEnter: { type: Function, required: false, default: null },
        onLeave: { type: Function, required: false, default: null },
    },
    data() {
        return {
            className: 'motion-div',
            isVisible: false,
            observer: null,
        };
    },
    mounted() {
        const handleScroll = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    if (this.onEnter) this.onEnter();
                } else {
                    this.isVisible = false;
                    if (this.onLeave) this.onLeave();
                }
            });
        };

        this.observer = new IntersectionObserver(handleScroll, { threshold: 0.1 });
        const wrapper = this.$el; // root element
        this.observer.observe(wrapper);
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    template: `
    <div :class="className">
      <transition :name="animation">
        <slot v-if="isVisible"></slot>
      </transition>
    </div>
    `,
};

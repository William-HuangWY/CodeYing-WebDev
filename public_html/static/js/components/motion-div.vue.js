export const motionDiv = {
    props: {
        animation: { type: String,  required: true },
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
                if (entry.isIntersecting) this.isVisible = true;
                else this.isVisible = false;
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

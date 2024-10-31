export const navigator = {
    props: {
        sections: { type: Array, required: true, default: () => [] },
        navFunction: { type: Function, required: false, default: () => {} },
    },
    data() {
        return {
            className: 'navigator',
            toNextIcon: '<i class="fa-solid fa-arrow-down"></i>',
            toTopIcon: '<i class="fa-solid fa-arrow-up"></i>',
            currentSectionId: '',
        };
    },
    methods: {
        navigate(currSectionId) {
            const nextSectionIndex = this.sections.indexOf(currSectionId) + 1;
            if (nextSectionIndex > this.sections.length - 1) this.navFunction('');
            else this.navFunction(this.sections[nextSectionIndex]);
        },
        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) this.currentSectionId = entry.target.id;
                });
            }, { root: null, rootMargin: '0px', threshold: 0.5 });

            this.sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) observer.observe(section);
            });
        },
    },
    mounted() {
        this.setupObserver();
    },
    beforeUnmount() {
        if (this.observer) {
            observer.disconnect();
        }
    },
    template: `
    <div :class="className + '-container'">
      <button
        v-if="currentSectionId && this.sections.length && currentSectionId != this.sections[0]"
        @click="navigate(currentSectionId)"
      >
        <span v-html="currentSectionId === sections.at(-1) ? toTopIcon : toNextIcon"/>
      </button>
    </div>
    `,
};

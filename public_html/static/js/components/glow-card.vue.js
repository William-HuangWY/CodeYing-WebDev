export const glowCard = {
    props: {
        title: { type: String, require: false, default: '' },
        icon: { type: String, require: false, default: '' },
        alt: { type: String, require: false, default: '' },
        content: { type: String, require: false, default: '' },
        animationIdentifier: { type: String, require: false, default: '1' },
    },
    data() {
        return {
            className: 'glow-card',
        };
    },
    template: `
    <div :class="className + '-container' + animationIdentifier">
      <div :class="className + '-content'">
        <img :src="icon" :alt="alt" :class="className + '-icon'"/>
        <div :class="className + '-info'">
          <h3>{{ title }}</h3>
          <p>{{ content }}</p>
        </div>
      </div>
    </div>
    `,
};

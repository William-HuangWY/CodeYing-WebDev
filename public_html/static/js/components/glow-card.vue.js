export const glowCard = {
    props: {
        title: { type: String, require: false, default: '' },
        icon: { type: String, require: false, default: '' },
        alt: { type: String, require: false, default: '' },
        content: { type: String, require: false, default: '' },
        detail: { 
            type: Object, 
            required: false, 
            default: () => ({
                period: { start: '', end: '' },
                organization: { name: '', url: '' },
                location: { city: '', map: '' },
            })
        },
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
          <div :class="className + '-info-detail'">
            <a style="cursor: auto;">
              <span>{{ detail.period.start }} - {{ detail.period.start }}&nbsp;&nbsp;</span>
            </a>
            <br/>
            <a :href="detail.organization.url" target="_blank">
              <i class="fa-solid fa-sitemap"/>
              <span>&nbsp;&nbsp;{{ detail.organization.name }}&nbsp;&nbsp;</span>
            </a>
            <a :href="detail.location.map" target="_blank">
              <i class="fa-solid fa-location-dot"/>
              <span>&nbsp;&nbsp;{{ detail.location.city }}&nbsp;&nbsp;</span>
            </a>  
          </div>
        </div>
      </div>
    </div>
    `,
};

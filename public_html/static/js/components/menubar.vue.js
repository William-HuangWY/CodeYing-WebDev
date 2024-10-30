export const menuBar = { 
    data() {
      return {
        className: 'menubar',
        logo: {
            text: 'CodeYing',
            href: `${baseURL}`,
            imgSrc: `${srcURL}img/global/logo/CodeYing-Logo.svg`,
            alt: "CodeYing Logo",
        },
        toggleButton: {
            openIcon: 'fa-solid fa-bars',
            closeIcon: 'fa-solid fa-xmark',
        },
        menuItems: [
            { text: 'Home', link: '/' },
            // { text: 'Portfolio', href: '#' },
            { text: 'Blog', link: '/blog' },
            { text: 'Contact', link: '/contact' },
            { text: 'Search', link: '#', icon: 'fas fa-search' } // last-child
        ],
        dropdownOpen: false,
      };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        navigateTo(navigation) {
            if (navigation.startsWith('#')) {
                const elementId = navigation.slice(1);
                const targetElement = document.getElementById(elementId);
                if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            else if (navigation.startsWith('/')) {
                this.$router.push(navigation).catch(err => {
                    if (err.name !== 'NavigationDuplicated') console.error(err);
                });
            }
            else {
                window.location.href = navigation;
            }
        }
    },
    template: `
    <nav :class="className">
      <ul :class="className + '-logo'">
        <li>
          <a :href="logo.href">
            <img :src="logo.imgSrc" :alt="logo.alt"/>
            <span :class="className + '-logo-text'">{{ logo.text }}</span>
          </a>
        </li>
      </ul>

      <ul :class="className + '-menu'">
        <li v-for="(item, index) in menuItems" :key="index">
          <a @click="navigateTo(item.link)">
            <i v-if="item.icon" :class="item.icon"></i> 
            <span v-if="!item.icon">{{ item.text }}</span>
          </a>
        </li>
      </ul>
      
      <div :class="className + '-toggle-button'" @click="toggleDropdown">
        <i :class="dropdownOpen ? toggleButton.closeIcon : toggleButton.openIcon"></i>
      </div>

      <div :class="className + '-dropdown-menu'" :class="{ open: dropdownOpen }">
        <li v-for="(item, index) in menuItems.slice(0, menuItems.length - 1)" :key="index">
          <a @click="navigateTo(item.link)">{{ item.text }}</a>
        </li>
      </div>
    </nav>
    `,
};

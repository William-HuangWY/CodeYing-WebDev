const menuBar = { 
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
            { text: 'About', href: '#' },
            { text: 'Portfolio', href: '#' },
            { text: 'Blog', href: '#' },
            { text: 'Contact', href: '#' },
            { text: 'Search', href: '#', icon: 'fas fa-search' } // last-child
        ],
        dropdownOpen: false,
      };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        }
    },
    mounted() {

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
          <a :href="item.href">
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
          <a :href="item.href">{{ item.text }}</a>
        </li>
      </div>
    </nav>
    `,
};


const sideBar = {
    data() {
        return {
            className: 'sidebar',
            indicatorIcon: {
                svg: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24', width: "48", height: "36",
                    fill: 'currentColor', class: 'double-arrow',
                    pathd: [
                        'M11 12l4-4-1.4-1.4L8.2 12l5.4 5.4L15 16l-4-4zm-6 0l4-4L7.6 6.6 2.2 12l5.4 5.4L9 16l-4-4z',
                    ],
                },
            },
            links: [
                { // GitHub
                    href: '#',
                    svg: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 24 24', width: "48", height: "32",
                        fill: 'currentColor', class: '',
                        pathd: [
                            'M12 0C5.37 0 0 5.37 0 12c0 5.25 3.36 9.66 7.94 11.29.58.11.8-.25.8-.56 0-.28-.01-1.22-.01-2.23-3.22.7-3.91-1.55-3.91-1.55-.53-1.36-1.29-1.73-1.29-1.73-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.72-1.56-2.7-.31-5.54-1.35-5.54-6.01 0-1.33.48-2.42 1.26-3.28-.13-.31-.55-1.55.12-3.23 0 0 1.02-.33 3.34 1.27.97-.27 2.02-.4 3.06-.4 1.04 0 2.09.14 3.06.4 2.32-1.6 3.34-1.27 3.34-1.27.67 1.68.25 2.92.12 3.23.79.86 1.26 1.95 1.26 3.28 0 4.67-2.84 5.7-5.55 6.01.41.35.77 1.04.77 2.09 0 1.51-.01 2.73-.01 3.1 0 .31.22.68.81.56C20.64 21.66 24 17.25 24 12c0-6.63-5.37-12-12-12z',
                        ],
                    },
                    text: 'GitHub',
                },
                { // LinkedIn
                    href: '#',
                    svg: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 16 16', width: "48", height: "32",
                        fill: 'currentColor', class: 'bi bi-linkedin',
                        pathd: [
                            'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
                        ],
                    },
                    text: 'LinkedIn',
                },
                { // Discord
                    href: '#',
                    svg: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 16 16', width: "48", height: "32",
                        fill: 'currentColor', class: 'bi bi-discord',
                        pathd: [
                            'M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612',
                        ],
                    },
                    text: 'Discord',
                },
                { // HackMD
                    href: '#',
                    svg: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 16 16', width: "48", height: "32",
                        fill: 'currentColor', class: 'bi bi-file-earmark-text',
                        pathd: [
                            'M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5',
                            'M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z',
                        ],
                    },
                    text: 'HackMD',
                },
                { // Email
                    href: '#',
                    svg: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 16 16', width: "48", height: "32",
                        fill: 'currentColor', class: 'bi bi-envelope-at',
                        pathd: [
                            'M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z',
                            'M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z',
                        ],
                    },
                    text: 'Email',
                },
            ],
            themeToggleBtn: {
                id: 'theme-toggle',
                svg: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 16 16', fill: 'currentColor', class: 'bi bi-mask',
                    pathd: [
                        'M6.225 1.227A7.5 7.5 0 0 1 10.5 8a7.5 7.5 0 0 1-4.275 6.773 7 7 0 1 0 0-13.546M4.187.966a8 8 0 1 1 7.627 14.069A8 8 0 0 1 4.186.964z',
                    ],
                },
            },
        };
    },
    methods: {
        toggleTheme() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        },
        initializeTheme() {
            const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            let currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'dark' || (!currentTheme && userPrefersDark)) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    },
    mounted () {
        this.initializeTheme();
    },
    template: `
    <nav :class="className">
      <ul>
        <li>
          <svg :xmlns="indicatorIcon.svg.xmlns" :viewBox="indicatorIcon.svg.viewBox" :width="indicatorIcon.svg.width" :height="indicatorIcon.svg.height" :fill="indicatorIcon.svg.fill" :class="indicatorIcon.svg.class">
            <path v-for="(path, pIndex) in indicatorIcon.svg.pathd" :key="pIndex" :d="path"/>
          </svg>
        </li>
        
        <li v-for="(link, index) in links" :key="index">
          <a :href="link.href">
          <svg :xmlns="link.svg.xmlns" :viewBox="link.svg.viewBox" :width="link.svg.width" :height="link.svg.height" :fill="link.svg.fill" :class="link.svg.class">
              <path v-for="(path, pIndex) in link.svg.pathd" :key="pIndex" :d="path"/>
          </svg>
          <span :class="className + '-link-text'">&nbsp;{{ link.text }}</span>
          </a>
        </li>

        <li>
          <button :id="themeToggleBtn.id" @click="toggleTheme">
            <svg :xmlns="themeToggleBtn.svg.xmlns" :fill="themeToggleBtn.svg.fill" :class="themeToggleBtn.svg.class" :viewBox="themeToggleBtn.svg.viewBox">
              <path v-for="(path, pIndex) in themeToggleBtn.svg.pathd" :key="pIndex" :d="path"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
    `,
};


const navBars = {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted () {

    },
    template: `
    <menubar></menubar>
    <sidebar></sidebar>
    `,
};

const heroSection = {
    data() {
        return {
            className: 'hero',
        };
    },
    methods: {

    },
    mounted () {

    },
    template: `
      <section :class="className + '-container'">
        <div :class="className + '-content'">
          <div :class="className + '-icon'">
            <div :class="className + '-icon-line-gradient'"></div>
          </div>

          <div :class="className + '-text'">
            <h1>Hi, Welcome to <span :class="className + '-highlight-text'">CodeYing</span></h1>
            <p>
              Building Seamless Solutions,<br/>
              Engaging User Interfaces and Software Applications
            </p>
          </div>
        </div>
      </section>
    `,
};

/* https://weiyinghuang.com/static/js */
import { motionDiv } from '../components/motion-div.vue.js'
import { navigator } from '../components/navigator.vue.js'
import { menuBar } from '../components/menubar.vue.js'
import { sideBar } from '../components/sidebar.vue.js'
import { hero } from '../components/hero.vue.js'
import { tiltCard } from '../components/tilt-card.vue.js'
import { glowCard } from '../components/glow-card.vue.js'
import { stereoscopicCanvas } from '../components/stereoscopic-canvas.vue.js'
import { clap, scrollToSection } from './app.js'

const { ref, computed  } = Vue;
const{ createRouter, createWebHistory, createWebHashHistory} = VueRouter;
const app = Vue.createApp({});
app.component('motion-div', motionDiv);
app.component('navigator', navigator);
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('hero', hero);
app.component('tilt-card', tiltCard);
app.component('glow-card', glowCard);
app.component('stereoscopic-canvas', stereoscopicCanvas);

app.component('navs', {
    template: `
    <menubar></menubar>
    <sidebar></sidebar>
    `,
});

app.component('hero-section', {
    data() {
        return {
            className: 'hero-section',
            imagePath: `${srcURL}img/home/hero-bg.png`,
            modelPath: `${srcURL}models/desktop-computer/scene.gltf`,
        };
    },
    methods: { scrollToSection },
    template: `
    <section :class="className + '-container'">
      <navigator
        :sections="['hero', 'intro', 'skills', 'experience']"
        :nav-function="scrollToSection"
      ></navigator>
      <hero
        title="Welcome to"
        highlight-title="CodeYing"
        sub-title="Building Seamless Solutions<br/>Engaging User Interfaces and Software Applications"
        intro-title="Know About Me"
        :background-image="imagePath"
        :link-id="'intro'"
        :link-function="scrollToSection"
        :modelSrc="modelPath"
      ></hero>
    </section>
    `,
});

app.component('intro-section', {
    data() {
        return {
            className: 'intro-section',
            infomations: [
                {
                    title: 'Web Development',
                    icon: `${srcURL}img/home/icons/purple-blue/networking.png`,
                    content: 'Building responsive, dynamic, and user-centric web app using modern frameworks like Vue and React.',
                },
                {
                    title: 'Game Development',
                    icon: `${srcURL}img/home/icons/purple-blue/gamification.png`,
                    content: 'Designing from 2D to 3D games, utilizing powerful engines to bring creative ideas to life.',
                },
                {
                    title: 'Data Modelling and Analytics',
                    icon: `${srcURL}img/home/icons/purple-blue/big-data.png`,
                    content: 'Turning raw data into actionable insights. Expertise in solving complex problems with data-driven algorithms.',
                },
                {
                    title: 'Machine Learning',
                    icon: `${srcURL}img/home/icons/purple-blue/artificial-intelligence.png`,
                    content: 'Harnessing the power of AI to build models that learn and improve. Specializing in predictive analytics and optimize solutions.',
                },
              ],
        };
    },
    template: `
    <section :class="className + '-container'">
      <div :class="className + '-content'">
        <div :class="className + '-header'">
          <p>introduction</p>
           <h2>Overview</h2>
        </div>

        <p :class="className + '-description'">
          Hi, I'm <span style='color: #9C5FCA; font-weight: bold;'>Wei-Ying Huang (William)</span>, a passionate developer with a deep interest in technology.
          Building on a strong foundation in software development, I am currently planning to pursue a master's in Computer Science to further deepen my expertise.
          Through this platform, I aim to share my journey, explore new concepts, and continue growing as a developer.
        </p>

        <div :class="className + '-cards-wrapper'">
          <tilt-card v-for="(info, index) in infomations" :key="index"
            :title="info.title"
            :icon="info.icon"
            :content="info.content"
          ></tilt-card>
        </div>
      </div>
    </section>
    `,
});

app.component('skill-section', {
    props: {
        textureFolder: { type: String, default: `${srcURL}img/home/icons/skill` },
    },
    data() {
      return {
        className: 'skill-section',
        technologies: [ // Levels: Beginner > Intermediate > Advanced > Expert > Master
            { // Python
                name: 'Python',
                texturePath: `${this.textureFolder}/Python-Texture.png`,
                level: 'Expert',
                tag: ['Data Science', 'Game Development', 'Machine Learning', 'Miscellaneous'],
                content: [
                    { title: 'Matplotlib', description: 'Library for data visualization.' },
                    { title: 'OpenCV', description: 'Computer vision library for image processing.' },
                    { title: 'PyTorch', description: 'Deep learning framework for dynamic computation.' },
                    { title: 'Pygame', description: 'Library for game development.' },
                ],
            },
            { // C++
                name: 'C++',
                texturePath: `${this.textureFolder}/CPP-Texture.png`,
                level: 'Advanced',
                tag: ['Game Development', 'Systems Design', 'IoT'],
                content: [
                    { title: 'Unreal Engine', description: 'Game engine using C++ for game development.' },
                    { title: 'Arduino', description: 'Platform using simplified C++ for prototyping embedded systems and IoT applications.' },
                    { title: 'SystemC', description: 'C++ library for system-level modeling and simulation in hardware design.' },
                    { title: 'STL', description: 'Core C++ library for algorithms, containers, and iterators.' },
                ],
            },
            { // JavaScript
                name: 'JavaScript',
                texturePath: `${this.textureFolder}/JavaScript-Texture.png`,
                level: 'Advanced',
                tag: ['Web Development', 'Front-End Development', 'React', 'VueJs', 'ThreeJs', 'NodeJs'],
                content: [
                    { title: 'jQuery', description: 'Library for simplifying DOM manipulation.' },
                    { title: 'React', description: 'Library for building user interfaces.' },
                    { title: 'Vue.js', description: 'Progressive framework for building user interfaces.' },
                    { title: 'Node.js', description: 'Runtime for executing JavaScript server-side.' },
                ]
            },
            { // HTML5
                name: 'HTML5',
                texturePath: `${this.textureFolder}/HTML5-Texture.png`,
                level: 'Advanced',
                tag: ['Web Development', 'Front-End Development'],
                content: [
                    { title: 'Canvas', description: 'Element for drawing graphics via JavaScript.' },
                    { title: 'Web APIs', description: 'APIs for web applications like local storage and geolocation.' },
                ],
            },
            { // CSS
                name: 'CSS',
                texturePath: `${this.textureFolder}/CSS-Texture.png`,
                level: 'Advanced',
                tag: ['Web Design', 'Styling'],
                content: [
                    { title: 'Flexbox', description: 'Layout model for responsive designs.' },
                    { title: 'Grid', description: 'CSS layout system for complex layouts.' },
                ],
            },
            { // PHP
                name: 'PHP',
                texturePath: `${this.textureFolder}/PHP-Texture.png`,
                level: 'Intermediate',
                tag: ['Web Development', 'Back-End Development', 'Laravel'],
                content: [
                    { title: 'Laravel', description: 'Popular PHP framework for web applications.' },
                    { title: 'Symfony', description: 'Framework for building robust applications.' },
                ],
            },
            { // C
                name: 'C',
                texturePath: `${this.textureFolder}/C-Texture.png`,
                level: 'Intermediate',
                tag: ['Systems Programming', 'Embedded Systems'],
                content: [
                    { title: 'Embedded Systems', description: 'Programming for microcontrollers and hardware.' },
                ]
            },
            { // Csharp
                name: 'Csharp',
                texturePath: `${this.textureFolder}/CS-Texture.png`,
                level: 'Intermediate',
                tag: ['Game Development'],
                content: [
                    { title: 'Unity', description: 'Popular game engine for creating 2D and 3D games.' },
                ],
            },
            { // Java
                name: 'Java',
                texturePath: `${this.textureFolder}/Java-Texture.png`,
                level: 'Intermediate',
                tag: ['Object-Oriented Programming', 'Basic Syntax', 'Core Libraries'],
                content: [
                    { title: 'Java SE', description: 'Standard Edition for developing general applications.' },
                    { title: 'Basic OOP Concepts', description: 'Understanding classes, objects, inheritance, and polymorphism.' },
                    { title: 'Java Collections', description: 'Utilizing collections framework for data manipulation.' },
                ],
            },
            { // MySQL
                name: 'MySQL',
                texturePath: `${this.textureFolder}/MySQL-Texture.png`,
                level: 'Advanced',
                tag: ['Database Management', 'SQL'],
                content: [
                    { title: 'Relational Database', description: 'Structured data storage with SQL support.' },
                ]
            },
            { // Git
                name: 'Git',
                texturePath: `${this.textureFolder}/Git-Texture.png`,
                level: 'Advanced',
                tag: ['CI/CD', 'Collaboration', 'GitHub'],
                content: [
                    { title: 'GitHub', description: 'Platform for hosting Git repositories and collaboration.' },
                    { title: 'GitLab', description: 'DevOps lifecycle tool that provides a Git repository manager.' },
                ]
            },
            { // Docker
                name: 'Docker',
                texturePath: `${this.textureFolder}/Docker-Texture.png`,
                level: 'Advanced',
                tag: ['CI/CD', 'Containerization', 'DevOps'],
                content: [
                    { title: 'Docker Compose', description: 'Tool for defining and running multi-container Docker applications.' },
                    { title: 'Kubernetes', description: 'Orchestrator for managing containerized applications.' },
                ],
            },
            // { name: 'Autodesk Inventor' }, // 
        ],
      };
    },
    template: `
    <div :class="className + '-container'">
      <div :class="className + '-content'">
        <div :class="className + '-header'">
          <p>Expertise</p>
          <h2>Tech Stack</h2>
        </div>

        <div :class="className + '-display'">
          <div v-for="(tech, index) in technologies" :key="tech.name" :class="className + '-item-wrapper'">
            <stereoscopic-canvas :dimension="380" :texture-path="tech.texturePath"></stereoscopic-canvas>
            <motion-div animation="wave"><p>{{ tech.name }}</p></motion-div>

            <span :class="className + '-item-description'">
              <h3>{{ tech.name }}&nbsp;&nbsp;<span>({{ tech.level }})<span></h3>
              <div :class="className + '-item-description-tag-wrapper'">
                <span v-for="(tag, index) in tech.tag" :key="index" :class="className + '-item-description-item-tag'">{{ tag }}</span>
              </div>
              <ul v-if="tech.content.length" :class="className + '-item-description-list'">
                <li v-for="(contentItem, contentIndex) in tech.content" :key="contentIndex">
                  <span :class="className + '-item-description-list-subtitle'">{{ contentItem.title }}</span><br/>
                  <span :class="className + '-item-description-list-subcontent'">{{ contentItem.description }}</span>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
    `
});

app.component('experience-section', {
    data() {
        return {
            className: 'experience-section',
            downloadIconSrc: `${srcURL}img/home/icons/white/cloud-download.png`,
            downloadFileSrc: `${srcURL}files/home/resume.pdf`,
            experiences: [
              { // Software Application Intern
                title: 'Software Application Intern',
                icon: `${srcURL}img/home/icons/exprience/programmer.png`,
                content: 'Contributed to process optimization and reinforcement learning applications. Developed intelligent image recognition for wafer testing and auto online data analysis.',
                detail: {
                    period: { start: 'Jan. 2023', end: 'Dec. 2023' },
                    organization: { name: 'NXP Semiconductors', url: 'https://www.nxp.com/' },
                    location: { city: 'Kaohsiung, TW.', map: 'https://maps.app.goo.gl/wq3Zo1vTfQdAb62i9' }
                },
              },
              { // Computer Science Student
                title: 'Computer Science Student',
                icon: `${srcURL}img/home/icons/exprience/database.png`,
                content: 'Specialized in AI and Machine Learning. Completed a senior project on deep reinforcement learning in financial markets, increasing trading returns using LSTM for advanced analysis.',
                detail: {
                    period: { start: 'Sep. 2020', end: 'Jun. 2024' },
                    organization: { name: 'NSYSU', url: 'https://www.nsysu.edu.tw/' },
                    location: { city: 'Kaohsiung, TW.', map: 'https://maps.app.goo.gl/bp1ku3nkEJKXud639' }
                },
              },
              { // APCS Test Prep Instructor
                title: 'APCS Test Prep Instructor',
                icon: `${srcURL}img/home/icons/exprience/consulting.png`,
                content: 'Instructed students in C, C++, and Python for AP Computer Science, focusing on core CS concepts, data structures, and algorithms to improve problem-solving skills and exam readiness.',
                detail: {
                    period: { start: 'July. 2024', end: 'Present' },
                    organization: { name: 'Jason Tutoring Institute', url: 'https://www.facebook.com/jsonfirst' },
                    location: { city: 'Kaohsiung, TW.', map: 'https://maps.app.goo.gl/tpfgysAySEW2EUDXA' }
                },
              },
              { // High School Math Tutor
                title: 'High School Math Tutor',
                icon: `${srcURL}img/home/icons/exprience/case-study.png`,
                content: 'Provided dadicated math tutoring, emphasizing critical thinking and problem-solving for high school students, fostering a deeper understanding of key mathematical concepts.',
                detail: {
                    period: { start: 'Sep. 2020', end: 'Dec. 2021' },
                    organization: { name: 'Jason Seniors', url: 'https://www.jason520.com.tw/' },
                    location: { city: 'Kaohsiung, TW.', map: 'https://maps.app.goo.gl/Mk8gdQUgP3Jigh32A' }
                },
              },
            ],
        };
    },
    methods: {
        openFile(src) { window.open(src, '_blank'); }
    },
    template: `
    <section :class="className + '-container'">
      <div :class="className + '-content'">
        <div :class="className + '-header'">
          <p>See My Career Journey</p>
          <h2>Relevant&nbsp;&nbsp;Experience</h2>
        </div>

        <div :class="className + '-button-wrapper'">
          <button :class="className + '-download-button'" @click="openFile(downloadFileSrc)">
            <img :src="downloadIconSrc" alt="Download Icon"/>
            <motion-div animation="typing">
                <div style="margin-right: 8px;">Download Full Resume</div>
            </motion-div>
            <span></span>
          </button>
        </div>

        <div :class="className + '-cards-wrapper'">
          <glow-card 
            v-for="(card, index) in experiences" 
            :key="index" 
            :title="card.title" 
            :icon="card.icon" 
            :alt="card.title" 
            :content="card.content"
            :detail="card.detail"
            :animation-identifier="index % 4 + 1"
          />
        </div>
      </div>
    </section>
    `,
});


const homePage = {
    template: `
      <hero-section id="hero"></hero-section>
      <intro-section id="intro"></intro-section>
      <skill-section id="skills"></skill-section>
      <experience-section id="experience"></experience-section>
    `,
};

const blogPage = {
    data() {
        return {
            className: 'blog-page',
        };
    },
    template: `
    <div :class="className + '-container'">
      <h2>This is Blog Page</h2>
    </div>
    `,
};

const contactPage = {
    data() {
        return {
            className: 'contact-page',
        };
    },
    template: `
      <div :class="className + '-container'">
        <h2>This is Contact Page</h2>
      </div>
    `,
};

const routes = [
    { path: '/', component: homePage },
    { path: '/blog', component: blogPage },
    { path: '/contact', component: contactPage }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

app.use(router);
app.mount('#app');

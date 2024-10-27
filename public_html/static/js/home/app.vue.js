/* https://weiyinghuang.com/static/js */
import { motionDiv } from '../components/motion-div.vue.js'
import { menuBar } from '../components/menubar.vue.js'
import { sideBar } from '../components/sidebar.vue.js'
import { hero } from '../components/hero.vue.js'
import { tiltCard } from '../components/tilt-card.vue.js'
import { stereoscopicCanvas } from '../components/stereoscopic-canvas.vue.js'
import { clap } from './app.js'

const { ref, computed  } = Vue;
const{ createRouter, createWebHistory} = VueRouter;
const app = Vue.createApp({});
app.component('motion-div', motionDiv);
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('hero', hero);
app.component('tilt-card', tiltCard);
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
            imagePath: `${srcURL}img/home/hero-bg.png`,
            modelPath: `${srcURL}models/desktop-computer/scene.gltf`,
        };
    },
    template: `
    <hero
      title="Welcome to"
      highlight-title="CodeYing"
      sub-title="Building Seamless Solutions<br/>Engaging User Interfaces and Software Applications"
      intro-title="Know Me More"
      :background-image="imagePath"
      :modelSrc="modelPath"
    ></hero>
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

        <motion-div animation="fade-slide-up">
          <p :class="className + '-description'">
            Hi, I'm <span style='color: #9C5FCA; font-weight: bold;'>Wei-Ying Huang (William)</span>, a passionate developer with a deep interest in technology.
            Building on a strong foundation in software development, I am currently planning to pursue a master's in Computer Science to further deepen my expertise.
            Through this platform, I aim to share my journey, explore new concepts, and continue growing as a developer.
          </p>
        </motion-div>

        <motion-div animation="fade">
          <div :class="className + '-cards-wrapper'">
            <tilt-card v-for="(info, index) in infomations" :key="index"
              :title="info.title"
              :icon="info.icon"
              :content="info.content"
            ></tilt-card>
          </div>
        </motion-div>
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
        technologies: [
            { // Python
                name: 'Python',
                texturePath: `${this.textureFolder}/Python-Texture.png`,
                tag: ['Data Science', 'Game Development', 'Machine Learning', 'Miscellaneous'],
                content: [
                    { title: 'Matplotlib', descrip: 'Library for data visualization.' },
                    { title: 'OpenCV', descrip: 'Computer vision library for image processing.' },
                    { title: 'Pygame', descrip: 'Library for game development.' },
                    { title: 'PyTorch', descrip: 'Deep learning framework for dynamic computation.' },
                ],
            },
            { // Java
                name: 'Java',
                texturePath: `${this.textureFolder}/Java-Texture.png`,
                tag: ['Object-Oriented Programming', 'Basic Syntax', 'Core Libraries'],
                content: [
                    { title: 'Java SE', descrip: 'Standard Edition for developing general applications.' },
                    { title: 'Basic OOP Concepts', descrip: 'Understanding classes, objects, inheritance, and polymorphism.' },
                    { title: 'Java Collections', descrip: 'Utilizing collections framework for data manipulation.' }
                ],
            },
            { // JavaScript
                name: 'JavaScript',
                texturePath: `${this.textureFolder}/JavaScript-Texture.png`,
                tag: ['Web Development', 'Front-End Development', 'React', 'VueJs', 'ThreeJs', 'NodeJs'],
                content: [
                    { title: 'jQuery', descrip: 'Library for simplifying DOM manipulation.' },
                    { title: 'React', descrip: 'Library for building user interfaces.' },
                    { title: 'Node.js', descrip: 'Runtime for executing JavaScript server-side.' },
                ]
            },
            { // HTML5
                name: 'HTML5',
                texturePath: `${this.textureFolder}/HTML5-Texture.png`,
                tag: ['Web Development', 'Front-End Development'],
                content: [
                    { title: 'Canvas', descrip: 'Element for drawing graphics via JavaScript.' },
                    { title: 'Web APIs', descrip: 'APIs for web applications like local storage and geolocation.' }
                ],
            },
            { // CSS
                name: 'CSS',
                texturePath: `${this.textureFolder}/CSS-Texture.png`,
                tag: ['Web Design', 'Styling'],
                content: [
                    { title: 'Flexbox', descrip: 'Layout model for responsive designs.' },
                    { title: 'Grid', descrip: 'CSS layout system for complex layouts.' }
                ],
            },
            { // PHP
                name: 'PHP',
                texturePath: `${this.textureFolder}/PHP-Texture.png`,
                tag: ['Web Development', 'Back-End Development', 'Laravel'],
                content: [
                    { title: 'Laravel', descrip: 'Popular PHP framework for web applications.' },
                    { title: 'Symfony', descrip: 'Framework for building robust applications.' }
                ],
            },
            { // C
                name: 'C',
                texturePath: `${this.textureFolder}/C-Texture.png`,
                tag: ['Systems Programming', 'Embedded Systems'],
                content: [
                    { title: 'Embedded Systems', descrip: 'Programming for microcontrollers and hardware.' }
                ]
            },
            { // C++
                name: 'C++',
                texturePath: `${this.textureFolder}/CPP-Texture.png`,
                tag: ['Game Development', 'Systems Design'],
                content: [
                    { title: 'Unreal Engine', descrip: 'Game engine using C++ for game development.' },
                    { title: 'Qt', descrip: 'Framework for building cross-platform applications.' }
                ],
            },
            { // Csharp
                name: 'Csharp',
                texturePath: `${this.textureFolder}/CS-Texture.png`,
                tag: ['Game Development'],
                content: [
                    { title: 'Unity', descrip: 'Popular game engine for creating 2D and 3D games.' }
                ],
            },
            { // MySQL
                name: 'MySQL',
                texturePath: `${this.textureFolder}/MySQL-Texture.png`,
                tag: ['Database Management', 'SQL'],
                content: [
                    { title: 'Relational Database', descrip: 'Structured data storage with SQL support.' }
                ]
            },
            { // Git
                name: 'Git',
                texturePath: `${this.textureFolder}/Git-Texture.png`,
                tag: ['Version Control', 'Collaboration', 'GitHub'],
                content: [
                    { title: 'GitHub', descrip: 'Platform for hosting Git repositories and collaboration.' },
                    { title: 'GitLab', descrip: 'DevOps lifecycle tool that provides a Git repository manager.' }
                ]
            },
            { // Docker
                name: 'Docker',
                texturePath: `${this.textureFolder}/Docker-Texture.png`,
                tag: ['Containerization', 'DevOps'],
                content: [
                    { title: 'Docker Compose', descrip: 'Tool for defining and running multi-container Docker applications.' },
                    { title: 'Kubernetes', descrip: 'Orchestrator for managing containerized applications.' }
                ],
            },
            // { name: 'Autodesk Inventor' }, // 
        ]
      };
    },
    mounted() {

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
              <h3>{{ tech.name }}</h3>
              <div :class="className + '-item-description-tag-wrapper'">
                <span v-for="(tag, index) in tech.tag" :key="index" :class="className + '-item-description-item-tag'">{{ tag }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    `
});

app.mount('#app');
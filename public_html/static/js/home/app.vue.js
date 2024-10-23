/* https://weiyinghuang.com/static/js */
import { motionDiv } from '../components/motion-div.vue.js'
import { menuBar } from '../components/menubar.vue.js'
import { sideBar } from '../components/sidebar.vue.js'
import { hero } from '../components/hero.vue.js'
import { tiltCard } from '../components/tilt-card.vue.js'
import { cubeCanvas } from '../components/cube-canvas.vue.js'
import { clap } from './app.js'

const { ref, computed  } = Vue;
const{ createRouter, createWebHistory} = VueRouter;
const app = Vue.createApp({});
app.component('motion-div', motionDiv);
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('hero', hero);
app.component('tilt-card', tiltCard);
app.component('cube-canvas', cubeCanvas);

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

        <motion-div animation="scale-up">
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
    data() {
      return {
        className: 'skill-section',
        technologies: [
          { name: 'Python' }, // 
          { name: 'Java' }, // 
          { name: 'JavaScript' }, // Node, Vue, React, Three
          { name: 'HTML5' }, // 
          { name: 'CSS' }, // 
          { name: 'HTML5' }, // 
          { name: 'PHP' }, // 
          { name: 'C' }, // 
          { name: 'C#' }, // 
          { name: 'C++' }, // 
          { name: 'SQL' }, // 
          { name: 'Git' }, // 
          { name: 'Docker' }, // 
          { name: 'Autodesk Inventor' }, // 
        ]
      };
    },
    mounted() {

    },
    template: `
    <div :class="className + '-container'">
      <div :class="className + '-content'">
        <div v-for="(tech, index) in technologies" :key="tech.name" :class="className + '-item-wrapper'">
          <canvas width="100" height="100"></canvas>
          <p>{{ tech.name }}</p>
        </div>
      </div>
    </div>
    `
  });

app.mount('#app');
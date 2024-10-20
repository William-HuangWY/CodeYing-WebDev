/* https://weiyinghuang.com/static/js */
import { menuBar } from '../components/menubar.vue.js'
import { sideBar } from '../components/sidebar.vue.js'
import { hero } from '../components/hero.vue.js'
import { clap } from './app.js'

const { ref, computed  } = Vue;
const{ createRouter, createWebHistory} = VueRouter;
const app = Vue.createApp({});
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('hero', hero);

app.component('navs', {
    template: `
    <menubar></menubar>
    <sidebar></sidebar>
    `,
});

app.component('herosection', {
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
    `, // intro-content="Hi, I'm <span style='color: #9C5FCA; font-weight: bold; text-decoration: underline;'>Wei-Ying Huang (William)</span>, a passionate developer with a deep interest in technology. Through this platform, I aim to share my journey, explore new concepts, and continue growing as a developer."
});

app.mount('#app');
const { createApp, ref, computed  } = Vue;
const{ createRouter, createWebHistory} = VueRouter;
const app = createApp({});

import { menuBar, sideBar, hero } from '../global-components.js';
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('hero', hero);

import { navs, heroSection } from './app.js';
app.component('navs', navs);
app.component('herosection', heroSection);
app.mount('#app');
const { createApp, ref, computed  } = Vue;
const{ createRouter, createWebHistory} = VueRouter;

const app = createApp({});
app.component('menubar', menuBar);
app.component('sidebar', sideBar);
app.component('navbars', navBars);
app.component('herosection', heroSection);
app.mount('#app');
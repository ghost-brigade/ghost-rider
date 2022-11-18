import {createApp} from "vue";
import App from "./App.vue";
import {createRouter, createWebHistory} from 'vue-router';

import Home from './shop/views/Home.vue';
import Contact from './shop/views/Contact.vue';

import "./assets/main.scss";

const routes = [
    {path: "/", component: Home},
    {path: "/contact", component: Contact},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App)
    .use(router)
    .mount("#app");

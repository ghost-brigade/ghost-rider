import {createApp} from "vue";
import App from "./App.vue";
import {createRouter, createWebHistory} from 'vue-router';

import Home from './views/Home.vue';
import Discussions from './views/Discussions.vue';
import Discussion from './views/Discussion.vue';
import Login from './views/Login.vue';
import Contact from './views/Contact.vue';

import "./assets/main.scss";

const routes = [
    {path: "/", component: Home},
    {path: "/discussions", component: Discussions},
    {path: "/discussion/:id", component: Discussion},
    {path: "/login", component: Login},
    {path: "/contact", component: Contact},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App)
    .use(router)
    .mount("#app");

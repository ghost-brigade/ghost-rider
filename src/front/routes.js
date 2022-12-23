import {createRouter, createWebHistory} from 'vue-router';
import {SECURITY_current} from './api/security';

const routes = [
    // MENU
    {path: "/", component: () => import("./views/Home.vue"), meta: {
        title: "Accueil",
        menu: true,
        icon: "home",
        allowAnonymous: true,
    }},
    {path: "/shop", component: () => import("./views/Shop.vue"), meta: {
        title: "Boutique",
        menu: true,
        icon: "motorcycle",
        allowAnonymous: true,
    }},
    {path: "/discussions", component: () => import("./views/Discussions.vue"), meta: {
        title: "Discussions",
        menu: true,
        icon: "message",
    }},
    {path: "/profile", component: () => import("./views/Profile.vue"), meta: {
        title: "Profil",
        menu: true,
        icon: "user",
    }},

    {path: "/moto/:id", component: () => import("./views/Moto.vue"), meta: {
        title: "Moto",
        menu: false,
        icon: "motorcycle",
        allowAnonymous: true,
    }},
    {path: "/discussion/:id", component: () => import("./views/Discussion.vue"), meta: {
        title: "Discussion",
        menu: false,
        icon: "flag",
    }},
    {path: "/unauthorized", component: () => import("./views/errors/Unauthorized.vue"), meta: {
        title: "Unauthorized",
        menu: false,
        icon: "user",
        allowAnonymous: true,
    }},
    {path: "/login", component: () => import("./views/Login.vue"), meta: {
        title: "Connexion",
        menu: false,
        icon: "user",
        allowAnonymous: true,
    }},
];

const FRONT_router = createRouter({
    history: createWebHistory(),
    routes
});
FRONT_router.beforeEach(async (to, from, next) => {
    let currentUser = null;
    const token = localStorage.getItem('token');
    if (token) {
        currentUser = await SECURITY_current();
    }

    if (to.meta?.roles) {
        if (!currentUser) {
            next('/login');
        }
        const matchingRoles = to.meta.roles.filter(role => currentUser.roles.includes(role));
        if (!matchingRoles.length) {
            next('/unauthorized');
        }
    }

    if (!to.meta.allowAnonymous && (!token || !currentUser)) {
        next('/login');
    } else {
        next();
    }
});

export const getRoutes = () => {
    return routes;
};

export default FRONT_router;
import {createRouter, createWebHistory} from 'vue-router';

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
    {path: "/conseiller/:id", component: () => import("./views/Conseiller.vue"), meta: {
        title: "Conseiller",
        menu: false,
        icon: "user",
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
    {path: "/register", component: () => import("./views/Register.vue"), meta: {
      title: "Inscription",
      menu: false,
      icon: "user",
      allowAnonymous: true,
    }},
    {path: "/confirm-account/:token", component: () => import("./views/ConfirmAccount.vue"), meta: {
      title: "Confirmation de compte",
      menu: false,
      icon: "user",
      allowAnonymous: true,
    }},
    {path: "/forgot-password", component: () => import("./views/ForgotPassword.vue"), meta: {
        title: "Mot de passe oublié",
        menu: false,
        icon: "user",
        allowAnonymous: true,
      }},
    {path: "/reset-password/:token", component: () => import("./views/ResetPassword.vue"), meta: {
        title: "Réinitialisation de mot de passe",
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
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => !record.meta.allowAnonymous)) {
    if (!token) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export const getRoutes = () => {
    return routes;
};

export default FRONT_router;

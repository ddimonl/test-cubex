import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { CHECK_AUTH } from "../store/actions.type";

Vue.use(Router);

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {   name: "Home",
            path: "/",
            component: () => import("../views/Home.vue")
        },
        {
            name: "Login",
            path: "/login",
            component: () => import("../views/Login.vue")
        },
        {
            name: "Register",
            path: "/register",
            component: () => import("../views/Register.vue")
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
});

router.beforeEach((to, from, next) => {
    store.dispatch(CHECK_AUTH);
    if (to.fullPath === '/') {
        if (!store.getters.isAuthenticated) {
            next('/login')
        }
    }
    if (to.fullPath === '/login') {
        if (store.getters.isAuthenticated) {
            next('/')
        }
    }
    next();
});

export default router;
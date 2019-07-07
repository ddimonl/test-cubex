import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
        }
    ]
});
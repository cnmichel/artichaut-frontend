import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import AdminAuth from "../views/admin/AdminAuthView.vue";
import AdminHome from "../views/admin/AdminHomeView.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/admin/login",
        name: "Login",
        component: AdminAuth
    },
    {
        path: "/admin",
        name: "Admin",
        component: AdminHome
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
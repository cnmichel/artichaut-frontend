import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";

// Import Admin
import AdminHome from "../views/admin/AdminHomeView.vue";
import AdminLogin from "../views/admin/AdminLoginView.vue";
import AdminProfile from "../views/admin/AdminProfileView.vue";
import {checkAdmin} from "../services/auth";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminLogin
    },
    {
        path: "/admin",
        name: "Admin",
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (!token) {
                next('/admin/login');
            } else {
                checkAdmin(token)
                    .then(isAdmin => {
                        if (isAdmin) {
                            next();
                        } else {
                            next('/');
                        }
                    })
                    .catch(() => next('/admin/login'));
            }
        },
        component: AdminHome,
        children: [
            {
                path: "profile",
                name: "AdminProfile",
                component: AdminProfile
            },
        ]

    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/admin/AdminHomeView.vue";
import Article from "@/views/admin/AdminArticleView.vue";
import Feature from "@/views/admin/AdminFeatureView.vue";
import Product from "@/views/admin/AdminProductView.vue";
import Promo from "@/views/admin/AdminPromoView.vue";
import Video from "@/views/admin/AdminVideoView.vue";
import Hero from "@/views/admin/AdminHeroView.vue";

// Import Admin
import AdminHome from "../views/admin/AdminHomeView.vue";
import AdminLogin from "../views/admin/AdminLoginView.vue";
import AdminProfile from "../views/admin/AdminProfileView.vue";
import {checkAdmin} from "../services/auth";


const routes = [
    {
        path: "/admin/home",
        name: "Accueil",
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
    {
        path: "/admin/articles",
        name: "Actualités",
        component: Article,
    },
    {
        path: "/admin/features",
        name: "Avantages",
        component: Feature,
    },
    {
        path: "/admin/products",
        name: "Produits",
        component: Product,
    },
    {
        path: "/admin/promos",
        name: "Promotions",
        component: Promo,
    },
    {
        path: "/admin/videos",
        name: "Vidéos",
        component: Video,
    },
    {
        path: "/admin/heroes",
        name: "Hero",
        component: Hero,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
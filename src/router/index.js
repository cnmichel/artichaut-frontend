import { createWebHistory, createRouter } from "vue-router";

// Import Homepage
import Home from "@/views/HomeView.vue";

// Import Admin
import AdminLogin from "@/views/admin/AdminLoginView.vue";
import AdminHome from "@/views/admin/AdminHomeView.vue";
import AdminArticle from "@/views/admin/AdminArticleView.vue";
import AdminFeature from "@/views/admin/AdminFeatureView.vue";
import AdminProduct from "@/views/admin/AdminProductView.vue";
import AdminPromo from "@/views/admin/AdminPromoView.vue";
import AdminVideo from "@/views/admin/AdminVideoView.vue";
import AdminHero from "@/views/admin/AdminHeroView.vue";
import { checkAdmin } from "@/services/auth";
import Reservation from "@/views/reservation/ReservationView.vue";
import Checkout from "@/views/reservation/CheckoutView.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/reservation",
        name: "Reservation",
        component: Reservation
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout
    },
    {
        path: "/admin",
        name: "AdminLogin",
        component: AdminLogin
    },
    {
        path: "/admin/home",
        name: "Accueil",
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (!token) {
                next('/admin');
            } else {
                checkAdmin(token)
                    .then((isAdmin) => isAdmin ? next() : next('/admin'))
                    .catch(() => next('/admin'));
            }
        },
        component: AdminHome,
        children: [
            {
                path: "/admin/articles",
                name: "Actualités",
                component: AdminArticle
            },
            {
                path: "/admin/features",
                name: "Avantages",
                component: AdminFeature,
            },
            {
                path: "/admin/products",
                name: "Produits",
                component: AdminProduct,
            },
            {
                path: "/admin/promos",
                name: "Promotions",
                component: AdminPromo,
            },
            {
                path: "/admin/videos",
                name: "Vidéos",
                component: AdminVideo,
            },
            {
                path: "/admin/heroes",
                name: "Hero",
                component: AdminHero,
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
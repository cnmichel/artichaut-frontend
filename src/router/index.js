import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/admin/AdminHomeView.vue";
import Article from "@/views/admin/AdminArticleView.vue";
import Feature from "@/views/admin/AdminFeatureView.vue";
import Product from "@/views/admin/AdminProductView.vue";
import Promo from "@/views/admin/AdminPromoView.vue";
import Video from "@/views/admin/AdminVideoView.vue";
import Hero from "@/views/admin/AdminHeroView.vue";

const routes = [
    {
        path: "/admin/home",
        name: "Accueil",
        component: Home,
        
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
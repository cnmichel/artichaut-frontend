import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Article from "@/views/ArticleView.vue";
import Feature from "@/views/FeatureView.vue";
import Product from "@/views/ProductView.vue";
import Promo from "@/views/PromoView.vue";
import Video from "@/views/VideoView.vue";
import Hero from "@/views/HeroView.vue";

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
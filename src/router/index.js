import { createWebHistory, createRouter } from "vue-router";
import AdminHome from "@/views/admin/AdminHomeView.vue";
import AdminArticle from "@/views/admin/AdminArticleView.vue";
import AdminFeature from "@/views/admin/AdminFeatureView.vue";
import AdminProduct from "@/views/admin/AdminProductView.vue";
import AdminPromo from "@/views/admin/AdminPromoView.vue";
import AdminVideo from "@/views/admin/AdminVideoView.vue";
import AdminHero from "@/views/admin/AdminHeroView.vue";

const routes = [
    {
        path: "/admin/home",
        name: "Accueil",
        component: AdminHome,
        
    },
    {
        path: "/admin/articles",
        name: "Actualités",
        component: AdminArticle,
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
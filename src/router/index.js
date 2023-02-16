import { createWebHistory, createRouter } from "vue-router";
import AdminHome from "@/views/admin/AdminHomeView.vue";
import AdminArticle from "@/views/admin/AdminArticleView.vue";
import AdminFeature from "@/views/admin/AdminFeatureView.vue";
import AdminProduct from "@/views/admin/AdminProductView.vue";
import AdminPromo from "@/views/admin/AdminPromoView.vue";
import AdminVideo from "@/views/admin/AdminVideoView.vue";
import AdminHero from "@/views/admin/AdminHeroView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
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

// navigation guards
router.beforeEach(async (to, from, next) => {
    const paramsLocale = to.params.locale

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
        return next(`/${locale}`)
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
        await loadLocaleMessages(i18n, paramsLocale)
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale)

    return next()
})


export default router;
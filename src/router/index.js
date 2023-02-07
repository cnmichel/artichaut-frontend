import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomeView.vue";
import Article from "@/views/ArticleView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        
    },
    {
        path: "/admin/article",
        name: "Article",
        component: Article
    } 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
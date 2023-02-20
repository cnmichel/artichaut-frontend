<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import {
  HomeFilled,
  Document,
  Menu as IconMenu,
  Goods,
  Discount,
  VideoCamera,
  PictureFilled
} from '@element-plus/icons-vue';

const router = useRouter()
const active = computed(() => router.currentRoute.value.path)

const pages = shallowRef([
  { path: "/admin/home", name: "Accueil", icon: HomeFilled },
  { path: "/admin/articles", name: "Actualités", icon: Document },
  { path: "/admin/features", name: "Avantages", icon: IconMenu },
  { path: "/admin/products", name: "Produits", icon: Goods },
  { path: "/admin/promos", name: "Promotions", icon: Discount },
  { path: "/admin/videos", name: "Vidéos", icon: VideoCamera },
  { path: "/admin/heroes", name: "Hero", icon: PictureFilled }
]);
</script>

<template>
  <el-menu router :default-active="active" active-text-color="#00B561">
    <div class="artichaut-logo">
      <el-image :src="'/src/assets/artichaut-logoless.png'" :fit="'contain'"/>
    </div>
    <el-menu-item v-for="({ path, name, icon }, index) in pages" :key="index" :index="path">
      <el-icon><Component :is="icon"/></el-icon>
      <span>{{name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.artichaut-logo {
  width: fit-content;
  height: 100px;
  display: flex;
  place-items: center;
}
.el-image {
  width: 70%;
  display: flex;
  margin: auto;
}
.el-menu {
  height: 100vh;
  position: fixed;
  width: inherit;
  --el-menu-hover-bg-color: var(--el-color-success-light-9);
}
.el-menu-item span {
  font-weight: bold;
}
.el-menu-item.is-active {
  border-right: solid;
  border-right-width: 2px;
}
</style>
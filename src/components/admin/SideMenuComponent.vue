<script setup lang="ts">
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Goods,
  Discount,
  VideoCamera,
  PictureFilled
} from '@element-plus/icons-vue';

const router = useRouter()
const pages = shallowRef([
  { name: "Actualités", icon: Document },
  { name: "Avantages", icon: IconMenu },
  { name: "Produits", icon: Goods },
  { name: "Promotions", icon: Discount },
  { name: "Vidéos", icon: VideoCamera },
  { name: "Hero", icon: PictureFilled }
]);

const handleClick = ({ index }: any) => {
  router.push({name: index});
}
</script>

<template>
  <el-menu active-text-color="#00B561" style="height: 100vh; position: fixed; width: inherit">
    <div class="artichaut-logo">
      <el-image :src="'/src/assets/artichaut-logo.png'" :fit="fit" />
    </div>
    <el-menu-item v-for="({ name, icon }, index) in pages"
                  :key="index"
                  :index="name"
                  @click="handleClick">
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
  margin-bottom: 20px;
}
.el-image {
  width: 80%;
  display: flex;
  margin: auto;
}
.el-menu-item span {
  font-weight: bold;
}
</style>
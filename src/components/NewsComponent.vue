<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import { getArticles } from '@/services/api.js';
import { ElCarousel, ElCarouselItem } from 'element-plus';

interface Article {
  title: string,
  content: string,
  image: string
}

const articles = reactive({ items: <Article[]>[] })

onBeforeMount(() => {
  getArticles().then((data:any) => {
    articles.items = data;
  });
})
</script>

<template>
  <a id="news"></a>
  <div v-if="articles.items !== []">
    <h1 class="text-5xl font-bold text-center mt-0 mb-6">{{ $t('titles.news') }}</h1>
    <el-carousel :interval="7000" height="70vh" trigger="click">
      <el-carousel-item v-for="article in articles.items" :key="article.title">
        <div class="bg-no-repeat bg-cover h-full" :style="{ backgroundImage: `url(${article.image})`}">
          <div class="text-center text-white px-6 md:px-12 grid items-center h-full backdrop-opacity-20 backdrop-invert bg-black/30">
            <div class="background text-5xl font-bold mt-0 mb-6">{{ article.title}}</div>
            <div class="background text-3xl font-bold mb-8">{{ article.content }}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.el-carousel {
  border-radius: 15px;
  margin: 24px;
}
</style>
<script setup lang="ts">
import { ElCarousel, ElCarouselItem} from 'element-plus';
import {getArticles} from '@/services/api.js';
import {reactive, onMounted} from 'vue';

interface Articles {
  title: string,
  content: string,
  image: string
}

const articles = reactive({ items: <Articles[]>[] });

onMounted(async() => {
  getArticles()
      .then((data:any) => {
        articles.items = data;
      });
});

</script>

<template>
  <a id="news"></a>
  <h1>{{ $t('fields.newsTitle') }}</h1>
  <el-carousel :interval="7000" height="80vh" style=" border-radius: 15px; margin:0 24px" trigger="click" indicator-position="inside" >
    <el-carousel-item v-for="article in articles.items" :key="article.title">
      <div class="bg-no-repeat bg-cover h-full"
           :style="{ backgroundImage: `url(${article.image})`}">
        <div class="text-center text-white px-6 md:px-12 grid items-center h-full backdrop-opacity-20 backdrop-invert bg-black/30">
            <div class="background text-5xl font-bold mt-0 mb-6">{{ article.title}}</div>
            <div class="background text-3xl font-bold mb-8">{{ article.content }}</div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>

h1{
  font-size: xxx-large;
  text-align: center;
  font-weight: bolder;
}

</style>
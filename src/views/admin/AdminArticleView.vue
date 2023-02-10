<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { slice } from 'lodash';
import { getArticles } from '@/services/api.js'

interface Articles {
    title: string,
    content: string,
    image: string
}

const articles = reactive({ items: <Articles[]>[] })
const totalArticle = computed(() => articles.items.length);
const paginateArticles = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(articles.items, start, end);
});
const pageSize = ref(5);
let current = reactive({ page: 1 });

onMounted(async() => {
        getArticles()
        .then((data) => { 
        articles.items = data;
    });
});

const handleCurrentChange = (val: number) => {
    if (val !== current.page) {
        current.page = val;
        getPagination(articles.items, current.page);
    }
};

const getPagination = (articles: Articles[], page: number) => {
    const start = (page -1) * pageSize.value;
    const end = start + pageSize.value;       
};

</script>

<template>
<el-card class="box-card">
    <div class="">
        <div id="divprincipale" ref="articles" v-for="article in paginateArticles" class="shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4">
            <div class="row-span-3" id="img"><img class="object-cover" v-bind:src="article.image" alt="image"/></div>
            <div class="col-span-2 underline">{{ article.title}}</div>
            <div class="row-span-2 col-span-2">{{ article.content }}</div>
        </div>
   <el-pagination 
   :page-size="pageSize" 
   background layout="prev, pager, next" 
   :total="totalArticle" 
   v-model="current" 
   @current-change="handleCurrentChange"
   id="pagination"/>
    </div>
</el-card>
</template>

<style scoped>
.box-card {
  height: 100%;
}

img{
  width: 250px;
  height: 150px;
}

#pagination{
  justify-content: center;
  margin-top: 10px;
}

#divprincipale{
   margin-left: 150px;
   margin-right: 150px;

}

</style>
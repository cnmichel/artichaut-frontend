<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { slice } from 'lodash';
import { getArticles,deleteArticle } from '@/services/api.js'
import { ElMessageBox } from 'element-plus';

interface Articles {
    title: string,
    content: string,
    image: string
}

const selectedArticle = reactive({item: {}});
const articles = reactive({ items: <Articles[]>[] })
const totalArticle = computed(() => articles.items.length);
const paginateArticles = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(articles.items, start, end);
});

const pageSize = ref(5);
let current = reactive({ page: 1 });

const handleDelete = () => {
    //message are you sure
    ElMessageBox({
        title: 'Alerte' ,
        message: 'êtes-vous sür de vouloir supprimer cet élément?',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonText:'valider',
        beforeClose: (action, instance, done) => {
            if(action === 'confirm'){
                deleteArticle(selectedArticle.item);
                done();
            }
            else {
                done();
            }
        }
        
    })
    
}

const handleSelect = (article) => {
    selectedArticle.item = article;
}

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
        <div id="divprincipale"  class="grid grid-cols-12 flex items-center" v-for="article in paginateArticles">
            <button @click="handleSelect(article)" ref="articles" class="col-span-11 shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4
            hover:border-2 border-green-600 focus:outline-none focus:ring focus:ring-green-700">
            <div class="row-span-3" ><img class="object-cover" id="imagesContent" v-bind:src="article.image" alt="image"/></div>
            <div class="col-span-2 underline">{{ article.title}}</div>
            <div class="row-span-2 col-span-2">{{ article.content }}</div>
            </button>

            <div v-if="selectedArticle">
                <div v-if="article === selectedArticle.item" class="col-span-1 flex flex-col buttons-container" style="display: flex;">
                    <button class="transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-150 duration-300 choice">
                        <img class="fill" src="/src/assets/edit.png"/>
                    </button>
                    <button @click="handleDelete" class="transition ease-in-out delay-50 hover:translate-y-2 hover:scale-150 duration-300 choice">
                        <img class="fill" src="/src/assets/delete.png"/>
                    </button>
                </div>
            </div>
            
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

#pagination{
  justify-content: center;
  margin-top: 10px;
}

#divprincipale{
   margin-left: 150px;
   margin-right: 150px;

}

.fill{
    object-fit: scale-down;
}
.choice{
    height: 50px;
    width: 50px;
    margin: auto;
}

#imagesContent{
  width: 250px;
  height: 150px;
}
</style>
<script setup lang="ts">
import {ref, reactive, computed, onMounted, shallowRef} from 'vue';
import { slice } from 'lodash';
import {getArticles, createArticle, deleteArticle, updateArticle} from '@/services/api.js'
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n'
import FormComponent from "@/components/admin/FormComponent.vue";

interface Articles {
    title: string,
    content: string,
    image: string
}

const { t } = useI18n();

const fields = shallowRef([
  { name: 'title', type: 'input', label: t('fields.title')},
  { name: 'content', type: 'input', label: t('fields.content')},
  { name: 'image', type: 'url', label: t('fields.image')},
])

const openForm = ref(false);
const modeForm = ref('create')

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

onMounted(async() => {
  getArticles()
      .then((data:any) => {
        articles.items = data;
      });
});

const handleCreate = () => {
  modeForm.value = 'create';
  selectedArticle.item = {};
  openForm.value = true;
}

const handleEdit = () => {
  modeForm.value = 'edit';
  openForm.value = true;
}

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
                deleteArticle(selectedArticle.item.id).then(() => {
                  getArticles()
                      .then((data:any) => {
                        articles.items = data;
                      });
                });
                done();
            }
            else {
                done();
            }
        }  
    })  
}

const handleSelect = (article:any) => {
    selectedArticle.item = article;
}

const handleCurrentChange = (val: number) => {
    if (val !== current.page) {
        current.page = val;
        getPagination(articles.items, current.page);
    }
};

const handleSubmit = async (data: any, lang: number) => {
  openForm.value = false;
  console.log(data, lang);
  if (modeForm.value === "create") {
    await createArticle({...data, user_id: 11, lang_id: lang}).then(() => {
      getArticles()
          .then((data:any) => {
            articles.items = data;
          });
    })
  } else {
    await updateArticle(selectedArticle.item.id, data).then(() => {
      getArticles()
          .then((data:any) => {
            articles.items = data;
          });
    })
  }
}

const handleClose = () => {
  openForm.value = false;
}

const getPagination = (articles: Articles[], page: number) => {
    const start = (page -1) * pageSize.value;
    const end = start + pageSize.value;       
};

</script>

<template>

  <FormComponent :mode="modeForm"
                 :on-submit="handleSubmit"
                 :on-close="handleClose"
                 :open-form="openForm"
                 :fields="fields"
                 :data="selectedArticle.item"
                 :lang="selectedArticle.item.lang_id"/>

<el-card class="box-card">
    <div class="">
        <button title="Ajouter un article" @click="handleCreate" class="transition ease-in-out delay-50 hover:translate-y-2 hover:scale-125 duration-300 choice" >
            <img class="" src="/src/assets/icons/add.png"/>
        </button>
            <div id="divprincipale"  class="grid grid-cols-12 flex items-center" v-for="article in paginateArticles">
            <button @click="handleSelect(article)" ref="articles" class="col-span-11 shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4
            hover:border-2 border-green-600 focus:outline-none focus:ring focus:ring-green-700">
            <div class="row-span-3" ><img class="object-cover" id="imagesContent" v-bind:src="article.image" alt="image"/></div>
            <div class="col-span-2 underline">{{ article.title}}</div>
            <div class="row-span-2 col-span-2">{{ article.content }}</div>
            </button>
            
            <div v-if="selectedArticle">
                <div v-if="article === selectedArticle.item" class="col-span-1 flex flex-col buttons-container" style="display: flex;">
                    <button title="Modifier l'article" @click="handleEdit" class="transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-125 duration-300 choice">
                        <img class="fill" src="/src/assets/icons/edit.png"/>
                    </button>
                    <button title="Supprimer l'article" @click="handleDelete" class="transition ease-in-out delay-50 hover:translate-y-2 hover:scale-125 duration-300 choice">
                        <img class="fill" src="/src/assets/icons/delete.png"/>
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

.dialog-update button:first-child {
  margin-right: 10px;
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
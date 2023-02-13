<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { getVideos , deleteVideo} from '@/services/api.js'
import { slice } from 'lodash';
import { ElMessageBox } from 'element-plus';

interface Videos {
    title: string,
    content: string,
    url: string
}

const dialogueVisible = ref(false);
const handleClose = (done: () =>void) =>{
    ElMessageBox.confirm('êtes-vous sûr de vouloir fermer cette fenêtre?')
    .then(()=>{
        done();
    })
    .catch(() =>{

    })
}

const addVideo = ref(false);
const selectedVideo = reactive({item: {}});
const videos = reactive({ items: <Videos[]>[] })
const totalVideo = computed(() => videos.items.length);
const paginateVideos = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(videos.items, start, end);
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
                deleteVideo(selectedVideo.item);
                done();
            }
            else {
                done();
            }
        }
        
    })
    
}

const handleSelect = (video:any) => {
    selectedVideo.item = video;
}

onMounted(async() => {
        getVideos()
        .then((data:any) => { 
        videos.items = data;
    });
});

const handleCurrentChange = (val: number) => {
    if (val !== current.page) {
        current.page = val;
        getPagination(videos.items, current.page);
    }
};

const getPagination = (videos: Videos[], page: number) => {
    const start = (page -1) * pageSize.value;
    const end = start + pageSize.value;       
};

</script>

<template>
<el-dialog
    v-model="addVideo"
    title="Création d'une vidéo"
    width="50%"
    :before-close="handleClose"
>
    <span>Insert form here</span>
    <template #update>
        <span class="dialog-update">
            <el-button @click = "addVideo = false">Annuler</el-button>
            <el-button type="primary" @click="addVideo = false">Enregistrer</el-button> 
        </span>
    </template>
</el-dialog>

<el-dialog 
    v-model="dialogueVisible"
    title="Titre de la fenêtre"
    width="30%"
    :before-close ="handleClose"
>
    <span>insert form ici</span>
    <template #update>
        <span class="dialog-update">
            <el-button @click = "dialogueVisible = false">Annuler</el-button>
            <el-button type="primary" @click="dialogueVisible = false">Valider</el-button> 
        </span>
    </template>
</el-dialog>

<el-card class="box-card">
    <div class="">
        <button @click="addVideo = true" class="transition ease-in-out delay-50 hover:translate-y-2 hover:scale-125 duration-300 choice" >
            <img class="" src="/src/assets/add.png"/>
        </button>
        <div id="divprincipale"  class="grid grid-cols-12 flex items-center" v-for="video in paginateVideos">
            <button @click="handleSelect(video)" ref="videos" class="col-span-11 shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4
            hover:border-2 border-green-600 focus:outline-none focus:ring focus:ring-green-700">
            <div class="row-span-3" id="imagesContent">
              <iframe width="250" height="150" v-bind:src="video.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="col-span-2 underline">{{ video.title}}</div>
            <div class="row-span-2 col-span-2">{{ video.content }}</div>
            </button>

            <div v-if="selectedVideo">
                <div v-if="video === selectedVideo.item" class="col-span-1 flex flex-col buttons-container" style="display: flex;">
                    <button @click="dialogueVisible=true" class="transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-150 duration-300 choice">
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
   :total="totalVideo" 
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

.dialog-update button:first-child {
  margin-right: 10px;
}

#pagination{
  justify-content: center;
  margin-top: 10px;
}

#divprincipale{
   margin-left: 150px;
   margin-right: 150px;

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
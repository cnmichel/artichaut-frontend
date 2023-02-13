<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { slice } from 'lodash';
import { getFeatures, deleteFeature} from '@/services/api.js'
import { ElMessageBox } from 'element-plus';

interface Features {
    name: string,
    content: string,
    icon: string
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

const addFeature = ref(false);
const selectedFeature = reactive({item: {}});
const features = reactive({ items: <Features[]>[] })
const totalFeature = computed(() => features.items.length);
const paginateFeatures = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(features.items, start, end);
});

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
                deleteFeature(selectedFeature.item);
                done();
            }
            else {
                done();
            }
        }
        
    })
    
}

const handleSelect = (feature:any) => {
    selectedFeature.item = feature;
}

const pageSize = ref(5);
let current = reactive({ page: 1 });

onMounted(async() => {
    getFeatures()
        .then((data:any) => { 
        features.items = data;
    });
});

const handleCurrentChange = (val: number) => {
    if (val !== current.page) {
        current.page = val;
        getPagination(features.items, current.page);
    }
};

const getPagination = (features: Features[], page: number) => {
    const start = (page -1) * pageSize.value;
    const end = start + pageSize.value;       
};

</script>

<template>
<el-dialog
    v-model="addFeature"
    title="Création d'un avantage "
    width="50%"
    :before-close="handleClose"
>
    <span>Insert form here</span>
    <template #update>
        <span class="dialog-update">
            <el-button @click = "addFeature = false">Annuler</el-button>
            <el-button type="primary" @click="addFeature = false">Enregistrer</el-button> 
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
        <button @click="addFeature = true" class="transition ease-in-out delay-50 hover:translate-y-2 hover:scale-125 duration-300 choice" >
            <img class="" src="/src/assets/add.png"/>
        </button>
        <div class="grid grid-cols-12 flex items-center" id="divprincipale" ref="features" v-for="feature in paginateFeatures">
            <button @click="handleSelect(feature)" 
            class="col-span-11 shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4
            hover:border-2 border-green-600 focus:outline-none focus:ring focus:ring-green-700">
                <div class="row-span-3" id="img"><img class="object-cover" id="imagesContent" v-bind:src="feature.icon" alt="image"/></div>
                <div class="col-span-2 underline">{{ feature.name}}</div>
                <div class="row-span-2 col-span-2">{{ feature.content }}</div>
            </button> 

        <div v-if="selectedFeature">
              <div v-if="feature === selectedFeature.item" class="col-span-1 flex flex-col buttons-container" style="display: flex;">
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
   :total="totalFeature" 
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

.dialog-update button:first-child {
  margin-right: 10px;
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
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { getHeroes, deleteHero } from '@/services/api.js'
import { slice } from 'lodash';
import { ElMessageBox } from 'element-plus';

interface Heroes {
    title: string,
    subtitle: string,
    image: string
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

const selectedHero = reactive({item: {}});
const heroes = reactive({ items: <Heroes[]>[] })
const totalHero = computed(() => heroes.items.length);
const paginateHeroes = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(heroes.items, start, end);
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
                deleteHero(selectedHero.item);
                done();
            }
            else {
                done();
            }
        }
        
    })
    
}

const handleSelect = (hero) => {
    selectedHero.item = hero;
}

onMounted(async() => {
    getHeroes()
        .then((data) => { 
        heroes.items = data;
    });
});

const handleCurrentChange = (val: number) => {
    if (val !== current.page) {
        current.page = val;
        getPagination(heroes.items, current.page);
    }
};

const getPagination = (heroes: Heroes[], page: number) => {
    const start = (page -1) * pageSize.value;
    const end = start + pageSize.value;       
};

</script>

<template>
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
        <div id="divprincipale"   class="grid grid-cols-12 flex items-center" v-for="hero in paginateHeroes">
            <button @click="handleSelect(hero)" ref="heroes" class="col-span-11 shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4
            hover:border-2 border-green-600 focus:outline-none focus:ring focus:ring-green-700">
            <div class="row-span-3" id="img"><img class="object-cover" id="imagesContent" v-bind:src="hero.image" alt="image"/></div>
            <div class="col-span-2 underline">{{ hero.title}}</div>
            <div class="row-span-2 col-span-2">{{ hero.subtitle }}</div>
            </button>
            <div v-if="selectedHero">
                <div v-if="hero === selectedHero.item" class="col-span-1 flex flex-col buttons-container" style="display: flex;">
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
   :total="totalHero" 
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
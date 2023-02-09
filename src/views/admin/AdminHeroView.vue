<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import { slice } from 'lodash';

interface Heroes {
    title: string,
    subtitle: string,
    image: string
}

const heroes = reactive({ items: <Heroes[]>[] })
const totalHero = computed(() => heroes.items.length);
const paginateHeroes = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(heroes.items, start, end);
});
const pageSize = ref(5);
let current = reactive({ page: 1 });

onMounted(async() => {
    await axios.get('/heroes')
        .then((response) => { 
        heroes.items = response.data;
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
<el-card class="box-card">
    <div class="">
        <div id="divprincipale" ref="heroes" v-for="hero in paginateHeroes" class="shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4">
            <div class="row-span-3" id="img"><img class="object-cover" v-bind:src="hero.image" alt="image"/></div>
            <div class="col-span-2 underline">{{ hero.title}}</div>
            <div class="row-span-2 col-span-2">{{ hero.subtitle }}</div>
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
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { slice } from 'lodash';
import { getFeatures } from '@/services/api.js'

interface Features {
    name: string,
    content: string,
    icon: string
}

const features = reactive({ items: <Features[]>[] })
const totalFeature = computed(() => features.items.length);
const paginateFeatures = computed(() => {
    const start = (current.page -1) * pageSize.value;
    const end = start + pageSize.value;
    return slice(features.items, start, end);
});
const pageSize = ref(5);
let current = reactive({ page: 1 });

onMounted(async() => {
    getFeatures()
        .then((data) => { 
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
<el-card class="box-card">
    <div class="">
        <div id="divprincipale" ref="features" v-for="feature in paginateFeatures" class="shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4">
            <div class="row-span-3" id="img"><img class="object-cover" id="imagesContent" v-bind:src="feature.icon" alt="image"/></div>
            <div class="col-span-2 underline">{{ feature.name}}</div>
            <div class="row-span-2 col-span-2">{{ feature.content }}</div>
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

#divprincipale{
   margin-left: 150px;
   margin-right: 150px;

}

#imagesContent{
  width: 250px;
  height: 150px;
}

</style>
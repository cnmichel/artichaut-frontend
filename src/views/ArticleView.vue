<script lang="ts">
import * as Vue from 'vue'
import axios from 'axios';
import { string } from 'vue-types';
import { Pagination } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        APagination: Pagination
    },
    setup() {
        return {
            current: ref()
        }
    },
    data() {
        return {
        articles: null
        }
    },
    mounted(): void {
        axios.get('/articles')
            .then(response => { 
        
        this.articles = response.data
        console.log(this.articles)
        })
    }
    
})

</script>

<template>

<h1>Coucou</h1>
<div class="">
    <div ref="articles" v-for="article in articles" class="shadow-lg rounder-lg p-8 grid grid-cols-3 grid-flow-col gap-4">
        <div class="col-span-2 underline">{{ article.title}}</div>
        <div class="row-span-2 col-span-2">{{ article.content }}</div>
        <div class="row-span-3">{{ article.image }}</div>
    </div>
    <a-pagination v-model:current="current" :total="50" show-less-items /> 
</div>
</template>
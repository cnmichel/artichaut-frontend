<script lang="ts">
import * as Vue from 'vue'
import axios from 'axios';
import { string } from 'vue-types';

export default {
    el: '#app',
    data () {
        return {
        info: null
        }
    },
    mounted(): void {
        axios.get('/articles') // axios.get('url') ==> responseObject
            .then(response => { // res = ^
        
        this.info = response.data
        console.log(this.info)
        })
    }   
}
</script>

<template>
    
<h1>Coucou</h1>

<div v-for="infos in info" class="m-5 shadow-lg rounder-lg container p-8 grid grid-cols-3 grid-flow-col gap-4">
    <div class="col-span-2 underline">{{ infos.title}}</div>
    <div class="row-span-2 col-span-2 ...">{{ infos.content }}</div>
    <div class="row-span-3 ...">{{ infos.image }}</div>
</div>

    
</template>
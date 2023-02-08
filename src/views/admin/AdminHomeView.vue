<template>
  <h1>ADMIN</h1>
</template>

<script setup>
import { checkAdmin} from "@/services/auth";
import {onBeforeMount} from "vue";
import router from "@/router";

onBeforeMount( async() => {
  if(localStorage.getItem('token')){
    const token = localStorage.getItem('token');
    if ( await !checkAdmin(token)){
      router.push('/')
    }
  } else {
    router.push('/admin/login')
  }
})

</script>

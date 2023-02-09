<template>
  <h1>ADMINHOME</h1>
  <router-view />
</template>

<script setup>
import { checkAdmin} from "@/services/auth";
import {onBeforeMount} from "vue";
import router from "@/router";


</script>

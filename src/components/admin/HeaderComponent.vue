<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue';
import { revokeToken } from "@/services/auth";

defineProps<{
  title?: any
}>()

const logout = (() =>{
  const token = localStorage.getItem('token');
  revokeToken(token)
  localStorage.removeItem('token');
  router.push('/')
})

const router = useRouter();

const goBack = () => {
  router.push("/admin/home");
}
</script>

<template>
  <el-page-header :icon="ArrowLeft" @back="goBack" style="position: relative">
    <template #title>
      Retour
    </template>
    <template #content>
      <span class="text-large font-bold mr-3">{{title}}</span>
    </template>
    <template #extra>
      <div @click="logout" class="flex items-center">
        <el-button>Se deconnecter</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
.el-page-header {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
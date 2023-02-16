<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, HomeFilled } from '@element-plus/icons-vue';
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
const current = computed(() => router.currentRoute.value.path);
const goBack = () => {
  router.push("/admin/home");
}
</script>

<template>
  <el-page-header v-if="current !== '/admin/home'" :icon="ArrowLeft" @back="goBack" style="position: relative">
    <template #title>
      Retour
    </template>
    <template #content>
      <span class="text-large font-bold mr-3">{{title}}</span>
    </template>
  </el-page-header>
  <el-page-header v-else :icon="null" style="position: relative">
    <template #title>
      <el-icon :size="19" style="vertical-align: sub" >
        <HomeFilled />
      </el-icon>
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
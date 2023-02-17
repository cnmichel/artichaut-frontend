<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, HomeFilled } from '@element-plus/icons-vue';
import { revokeToken } from "@/services/auth";

defineProps<{
  title?: any
}>()

const router = useRouter();
const current = computed(() => router.currentRoute.value.path);

const goBack = () => {
  router.push("/admin/home");
}

const logout = () => {
  const token = localStorage.getItem('token');
  revokeToken(token)
  localStorage.removeItem('token');
  router.push('/admin')
}
</script>

<template>
  <el-page-header v-if="current !== '/admin/home'" :icon="ArrowLeft" @back="goBack" style="position: relative">
    <template #title>{{ $t('buttons.back') }}</template>
    <template #content>
      <span class="text-large font-bold mr-3">{{ title }}</span>
    </template>
    <template #extra>
      <div @click="logout" class="flex items-center">
        <el-button plain>{{ $t('buttons.logout') }}</el-button>
      </div>
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
        <el-button plain>{{ $t('buttons.logout') }}</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
.el-page-header {
  display: grid;
  align-items: center;
  height: 100%;
}
.el-button.is-plain {
  --el-button-hover-text-color: #00B561 !important;
  --el-button-hover-border-color: #00B561 !important;
}
</style>
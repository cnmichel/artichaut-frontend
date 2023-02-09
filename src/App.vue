<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from 'vue-router';
import Header from "@/components/admin/HeaderComponent.vue";
import SideMenu from "@/components/admin/SideMenuComponent.vue";

const router = useRouter()
const page = computed(() => router.currentRoute.value.name)
</script>

<template class="light">
    <el-container class="container-layout">

      <el-aside width="200px">
        <SideMenu/>
      </el-aside>

      <el-container>
        <el-header>
          <Header :title="page"/>
        </el-header>
        <el-main>
          <el-scrollbar>
            <router-view/>
          </el-scrollbar>
        </el-main>
      </el-container>

    </el-container>
</template>

<style scoped>
.container-layout .el-header {
  width: 100%;
  position: relative;
}
.container-layout .el-main {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background-color: #d8d8d8;
}
</style>

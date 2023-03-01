<script setup lang="ts">
import {onBeforeMount, ref, shallowRef} from "vue";
import { useI18n } from "vue-i18n";
import { getActivePromo } from '@/services/api.js'
import { Expand, Fold, UserFilled } from "@element-plus/icons-vue";
import { isEmpty } from 'lodash';

const { t } = useI18n();

const promo = ref('')
const showMenu = ref(false)

const pages = shallowRef([
  { path: "/", name: t('menus.home')},
  { path: "/news", name: t('menus.news')},
  { path: "/rooms", name: t('menus.rooms')},
  { path: "/deals", name: t('menus.deals')},
]);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
}

onBeforeMount(() => {
  getActivePromo().then((data: any) => {
    promo.value = isEmpty(data) ? '' : data[0].content;
  })
})
</script>

<template>
  <div v-if="promo !== ''" class="container-fluid w-full flex justify-center bg-tonic">
    <p class="p-2 text-white text-center" >{{ promo }}</p>
  </div>

  <nav class="sticky top-0 z-20 bg-white/90 dark:bg-white-100/80 backdrop-blur navbar shadow-2xl shadow-gray-100/5 border-gray-100 dark:border-gray-800 peer-checked:navbar-active dark:shadow-none">
    <div class="flex flex-wrap items-center justify-between py-2.5 px-6 md:px-12 lg:py-0 lg:px-6">
      <div class="w-full relative flex items-center justify-between gap-6 md:gap-0">

        <div class="lg:hidden">
          <el-button v-if="!showMenu" size="large" color="#253343" plain link @click="toggleMenu">
            <template v-slot:icon>
              <el-icon :size="28">
                <Expand style="width: 2em; height: 2em"/>
              </el-icon>
            </template>
          </el-button>
          <el-button v-if="showMenu" size="large" color="#253343" plain link @click="toggleMenu">
            <template v-slot:icon>
              <el-icon :size="28">
                <Fold style="width: 2em; height: 2em"/>
              </el-icon>
            </template>
          </el-button>
        </div>

        <a class="relative" href="#" aria-label="logo">
          <img src="@/assets/artichaut-logo.png" class="h-12" alt="Logo Artichaut Hotel" loading="lazy" />
        </a>

        <div class="nav-horizontal items-center xs:max-lg:hidden">
          <el-menu mode="horizontal" :ellipsis="false" text-color="#253343" active-text-color="#00B561">
            <el-menu-item v-for="({ path, name }, index) in pages" :key="index" :index="path">
              <span>{{name}}</span>
            </el-menu-item>
          </el-menu>
        </div>

        <router-link to="/login" class="xs:max-lg:hidden">
          <el-button size="large" round color="#253343" data-te-ripple-init data-te-ripple-color="light"
                     class="ml-4 leading-normal transition duration-150 ease-in-out">
            <template v-slot:icon>
              <el-icon :size="28" class="no-inherit">
                <UserFilled style="width: 2em; height: 2em; margin-right: 4px"/>
              </el-icon>
            </template>
            {{ $t('buttons.my-account') }}
          </el-button>
        </router-link>
        <router-link to="/login" class="lg:hidden">
          <el-button size="large" circle color="#253343" data-te-ripple-init data-te-ripple-color="light"
                     class="ml-4 leading-normal transition duration-150 ease-in-out">
            <template v-slot:icon>
              <el-icon :size="24" class="no-inherit">
                <UserFilled style="width: 2em; height: 2em"/>
              </el-icon>
            </template>
          </el-button>
        </router-link>

      </div>
    </div>
    <div class="nav-vertical">
      <el-menu v-if="showMenu" text-color="white" active-text-color="#00B561">
        <el-menu-item v-for="({ path, name }, index) in pages" :key="index" :index="path">
          <span>{{name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<style scoped>
.el-menu span {
  font-weight: 600;
}
.nav-horizontal .el-menu {
  background-color: transparent;
  width: 100%;
  height: 70px;
  border: 0;
  --el-menu-hover-bg-color: transparent;
}
.nav-horizontal .el-menu-item.is-active {
  border-bottom-width: 3px;
}
.nav-vertical .el-menu {
  background-color: rgba(37, 51, 67, .99);
  width: 100%;
  border: 0;
  --el-menu-hover-bg-color: transparent;
  position: absolute;
}
</style>
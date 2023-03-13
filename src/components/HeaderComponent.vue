<script setup lang="ts">
import { inject, onBeforeMount, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { revokeToken } from '@/services/auth.js';
import { getActivePromo } from '@/services/api.js';
import { Expand, Fold, UserFilled } from "@element-plus/icons-vue";
import { isEmpty } from 'lodash';

const router = useRouter()
const { t } = useI18n()

const isLogged = computed(() => !!localStorage.getItem('token'))
const userName = computed(() => {
  const email = localStorage.getItem('user_email');
  const name = localStorage.getItem('user_name');
  return name ? name : email
})

const promo = ref('')
const showMenu = ref(false)
const availableLangs = inject('langs')
const selectedLang = ref(localStorage.getItem('language') || navigator.language)
const accDropdown = ref()

const pages = computed(() => [
  { path: "/", name: t('menus.home'), anchor: "home"},
  { path: "/services", name: t('menus.services'), anchor: "services"},
  { path: "/news", name: t('menus.news'), anchor: "news"},
  { path: "/ourhotel", name: t('menus.ourHotel'), anchor:"ourHotel"},
  { path: "/reviews", name: t('menus.reviews'), anchor:"reviews"}
])

const toggleMenu = () => {
  // Show or hide menu
  showMenu.value = !showMenu.value;
}

const handleLangSelect = (code: string) => {
  // Set the lang in the local storage
  localStorage.setItem('language', code);
  // Reload the page
  location.reload();
}

const handleAccount = () => {
  // Close the dropdown menu
  accDropdown.value.handleClose();
  // Redirect to account page
  router.push('/account');
}

const handleLogout = () => {
  // Fetch the user token from the local storage
  const token = localStorage.getItem('token');
  // Revoking the user token via API
  revokeToken(token).then(() => {
    // Delete user related entries from the local storage
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('token');
    // Close the dropdown menu
    accDropdown.value.handleClose();
    // Redirect to home page
    router.push('/').then(() => location.reload());
  })
}

onBeforeMount(() => {
  // Fetch the active promotion to display if any
  getActivePromo().then((data: any) => {
    promo.value = isEmpty(data) ? '' : data[0].content;
  });
})
</script>

<template>
  <!-- Promo banner -->
  <a id="home">
    <div v-if="promo !== ''" class="container-fluid w-full flex justify-center bg-tonic">
      <p class="p-2 text-white text-center" >{{ promo }}</p>
    </div>
  </a>
  <!-- Navbar -->
  <nav class="sticky top-0 z-20 bg-white/90 backdrop-blur navbar shadow-2xl shadow-gray-600/5 peer-checked:navbar-active dark:shadow-none">
    <div class="flex flex-wrap items-center justify-between py-2.5 px-6 md:px-12 lg:py-0 lg:px-6">
      <div class="w-full relative flex items-center justify-between gap-6 md:gap-0">

        <!-- Navbar burger-->
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
        <!-- Main logo -->
        <router-link to="/" class="relative">
          <img src="@/assets/logos/artichaut-logo-v2.png" class="h-14 lg:h-16" alt="Logo Artichaut Hotel" loading="lazy" />
        </router-link>
        <!-- Navbar horizontal web -->
        <div class="nav-horizontal items-center xs:max-lg:hidden">
          <el-menu mode="horizontal" :ellipsis="false" text-color="#253343" active-text-color="#00B561">
            <el-menu-item v-for="({ path, name, anchor }, index) in pages" :id="name" :key="index" :index="path"
                          class="transition duration-300 ease-in-out">
              <a :href="'#' + anchor">
                <span>{{ name }}</span>
              </a>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- Navbar extra -->
        <div class="navbar-end flex items-center">
          <!-- Lang buttons -->
          <div class="xs:max-lg:hidden">
            <el-dropdown trigger="click" @command="handleLangSelect">
              <el-button size="large" style="padding: 0" circle text>
                <el-image style="width: 44px; height: 44px" :src="`src/assets/langs/${selectedLang}.png`" fit="cover"/>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="({ code, label }, index) in availableLangs"
                                    :key="index"
                                    :index="code"
                                    :command="code">
                    <h4>{{ label }}</h4>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Account buttons -->
          <el-dropdown ref="accDropdown" trigger="click">
            <div>
              <div class="xs:max-lg:hidden">
                <el-button size="large" round color="#253343" data-te-ripple-init data-te-ripple-color="light"
                           class="ml-4 leading-normal transition duration-150 ease-in-out">
                  <template v-slot:icon>
                    <el-icon :size="28" class="no-inherit">
                      <UserFilled style="width: 2em; height: 2em; margin-right: 4px"/>
                    </el-icon>
                  </template>
                  {{ $t('buttons.my-account') }}
                </el-button>
              </div>
              <div class="lg:hidden">
                <el-button size="large" circle color="#253343" data-te-ripple-init data-te-ripple-color="light"
                           class="ml-4 leading-normal transition duration-150 ease-in-out">
                  <template v-slot:icon>
                    <el-icon :size="24" class="no-inherit">
                      <UserFilled style="width: 2em; height: 2em"/>
                    </el-icon>
                  </template>
                </el-button>
              </div>
            </div>

            <!-- Account panel -->
            <template v-slot:dropdown>
              <div v-if="isLogged" class="flex flex-col account-panel p-4 w-60">
                <h4>{{ $t('messages.welcome') }}</h4>
                <p class="text-lg">{{ userName }}</p>
                <el-divider />
                <div class="panel-button pb-2">
                  <el-button size="large" link @click="handleAccount">{{ $t('buttons.my-account') }}</el-button>
                </div>
                <div class="panel-button">
                  <el-button size="large" link @click="handleLogout">{{ $t('buttons.logout') }}</el-button>
                </div>
              </div>
              <div v-if="!isLogged" class="p-4 w-60">
                <router-link to="/login">
                  <el-button class="w-full" size="large" round plain>{{ $t('buttons.login') }}</el-button>
                </router-link>
              </div>
            </template>
          </el-dropdown>
        </div>

      </div>
    </div>

    <!-- Navbar vertical mobile -->
    <div class="nav-vertical">
      <el-menu v-if="showMenu" text-color="white" active-text-color="#00B561">
        <el-menu-item v-for="({ path, name, anchor }, index) in pages" :id="name" :key="index" :index="path" @click="toggleMenu">
          <a :href="'#' + anchor">
            <span>{{name}}</span>
          </a>
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<style scoped>
.el-menu span {
  font-weight: 600;
}
.el-button.is-plain {
  --el-button-hover-text-color: white !important;
  --el-button-border-color: #253343 !important;
  --el-button-hover-border-color: #253343 !important;
  --el-button-hover-bg-color: #253343 !important;
}
.nav-horizontal .el-menu {
  background-color: transparent;
  width: 100%;
  height: 70px;
  border: 0;
  --el-menu-hover-bg-color: rgba(37, 51, 67, .9);
  --el-menu-hover-text-color: white !important;
}
.nav-horizontal .el-menu-item.is-active {
  border-bottom-width: 3px;
  --el-menu-hover-bg-color: transparent;
}
.nav-vertical .el-menu {
  position: absolute;
  background-color: rgba(37, 51, 67, .99);
  width: 100%;
  border: 0;
  --el-menu-hover-bg-color: transparent;
}
.panel-button .el-button {
  --el-button-hover-link-text-color: #00B561;
}
</style>
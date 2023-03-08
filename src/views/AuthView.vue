<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useRouter } from 'vue-router';
import Login from "@/components/auth/LoginComponent.vue";
import Signup from "@/components/auth/SignupComponent.vue";

const router = useRouter()
const current = computed(() => router.currentRoute.value.path)

const isLogged = (value: boolean) => {
  if (value) {
    // Redirect to homepage if login success
    router.push('/');
  }
}

const isRegistered = (value: boolean) => {
  if (value) {
    // Redirect to login page if register success
    router.push('/login');
  }
}

onBeforeMount(() => {
  // Redirect user to homepage if already logged in
  if (localStorage.getItem('user_token')) {
    router.push('/');
  }
})
</script>

<template>
  <div class="login-bg relative overflow-auto bg-scroll bg-cover bg-top">
    <div class="flex flex-wrap items-center justify-center lg:grid lg:grid-cols-3 h-max min-h-full bg-slate-700/50 p-6">
      <Login v-if="current === '/login'" @login="isLogged"/>
      <Signup v-if="current === '/signup'" @register="isRegistered"/>
      <div class="col-span-2 w-4/6 lg:w-6/12 justify-self-center xs:max-lg:order-first mb-4">
        <router-link to="/">
          <img src="@/assets/artichaut-logoless-white.png" alt="Logo Artichaut Hotel blanc">
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  background-image: url("@/assets/backgrounds/login-background.jpeg");
  height: 100vh;
}
.box-card {
  border-radius: 12px;
}
:deep(.el-form-item label) {
  color: #00B561;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 2px !important;
}
:deep(.el-button.is-plain) {
  border-color: #00B561;
  background-color: transparent;
}
:deep(.el-button.is-link span) {
  color: #64748B;
  font-size: 12px;
  text-decoration-line: underline;
}
:deep(.el-divider__text.is-center p) {
  color: #253343;
  font-size: 12px;
}
</style>
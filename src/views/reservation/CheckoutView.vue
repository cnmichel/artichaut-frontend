<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';
import Recapitulatif from '@/components/checkout/RecapitulatifComponent.vue';
import Login from "@/components/auth/LoginComponent.vue";
import Payment from "@/components/checkout/PaymentComponent.vue";
import Confirm from "@/components/checkout/ConfirmComponent.vue";

const { t } = useI18n();

const route = useRoute()
const router = useRouter()
const current = ref(router.currentRoute.value.path)

const data = reactive({
  items: '',
});

const cart = reactive({
  HT: 0,
  TTC: 0,
  TVA: 0
})

onBeforeMount(() => {
  if (route.query.checkoutInfos) {
    data.items = JSON.parse(decodeURIComponent(route.query.checkoutInfos));
    console.log(data.items);
  }
  if (router.currentRoute.value.path === '/checkout/login' && localStorage.getItem('user_email')) {
    current.value = '/checkout/cart';
    router.push('/checkout/cart');
  }
});

const active = computed(() => {
  switch (current.value) {
    case "/checkout/login":
      return 0;
    case "/checkout/cart":
      return 1;
    case "/checkout/payment":
      return 2;
    case "/checkout/confirm":
      return 3;
    default:
      return 0;
  }
});

const totalCart = (value) => {
  cart.HT = value.HT;
  cart.TTC = value.TTC;
  cart.TVA = parseFloat(value.TTC - value.HT).toFixed(2)
}

const next = (value) => {
  current.value = value;
  router.push(value);
}
</script>

<template>
  <!-- Steps horizontal -->
  <div class="sticky top-0 z-10 w-full bg-slate-800 pt-12 pb-2 px-12 max-md:hidden">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step :title="t('titles.login')" />
      <el-step :title="t('titles.cart')" />
      <el-step :title="t('titles.payment')" />
      <el-step :title="t('titles.confirm')" />
    </el-steps>
  </div>
  <!-- Steps vertical -->
  <div class="w-full bg-slate-800 pt-4 pb-1 px-12 md:hidden lg:hidden">
    <el-steps :active="active" finish-status="success" :space="35" direction="vertical" align-center>
      <el-step :title="t('titles.login')" />
      <el-step :title="t('titles.cart')" />
      <el-step :title="t('titles.payment')" />
      <el-step :title="t('titles.confirm')" />
    </el-steps>
  </div>

  <!-- Login section -->
  <section v-if="current === '/checkout/login'">
    <div class="flex lg:grid grid-cols-3 lg:py-12">
      <el-card class="flex lg:grid box-card w-full h-auto lg:col-start-2 xs:max-lg:justify-center lg:h-full lg:py-12 lg:px-16 py-3 px-3">
        <Login @login="next('/checkout/cart')"/>
      </el-card>
    </div>
  </section>

  <!-- Cart section -->
  <section v-if="current === '/checkout/cart'">
    <Recapitulatif :data="data" :active="active" @cart="totalCart" @next="next" />
  </section>

  <!-- Payment section -->
  <section v-if="current === '/checkout/payment'">
    <Payment :cart="cart" @next="next" />
  </section>

  <!-- Confirm section -->
  <section v-if="current === '/checkout/confirm'">
    <Confirm />
  </section>
</template>


<style scoped>
:deep(.el-step__head.is-process) {
  color: #FFFFFF;
  border-color: #FFFFFF;
}
:deep(.el-step__title.is-process) {
  color: #FFFFFF;
}
:deep(.el-step__icon) {
  background: #253343;
}
</style>
<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import { useRoute } from 'vue-router';
import Header from '@/components/HeaderComponent.vue';
import Recapitulatif from '@/components/checkout/RecapitulatifComponent.vue';

const route = useRoute();
const data = reactive({
  items: '',
});

onBeforeMount(() => {
  if (route.query.checkoutInfos) {
    data.items = JSON.parse(decodeURIComponent(route.query.checkoutInfos));
    console.log(data.items);
  }
});

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>

<template>
  <Header />
  <el-steps :active="active" finish-status="success" align-center>
    <el-step title="Récapitulatif" />
    <el-step title="Connexion" />
    <el-step title="Facturation/Paiement" />
    <el-step title="Confirmation" />
  </el-steps>
  <section v-if="active === 0">
    <Recapitulatif  :data="data" :active="active" @active="next"/>
  </section>
  <section v-if="active === 1">
    <h2 class="text-center mt-12 mb-12">Connexion</h2>

    {{ data.items }}
  </section>
  <section v-if="active === 2">
    <h2 class="text-center mt-12 mb-12">Facturation</h2>

    {{ data.items }}
  </section>
  <section v-if="active === 3">
    <h2 class="text-center mt-12 mb-12">Confirmation</h2>

    {{ data.items }}
  </section>
</template>


<style scoped>

</style>
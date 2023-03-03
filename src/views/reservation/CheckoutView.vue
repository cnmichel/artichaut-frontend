<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import { useRoute } from 'vue-router';
import router from "@/router";
import Header from '@/components/HeaderComponent.vue';

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
    <h2 class="text-center mt-12 mb-12">Récapitulatif</h2>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>

    {{ data.items }}
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
  <el-button class="text-center" style="margin-top: 12px" @click="next">Next step</el-button>
</template>


<style scoped>

</style>
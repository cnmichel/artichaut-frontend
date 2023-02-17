<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";

const router = useRouter()
</script>

<template class="light">
  <HeaderComponent/>
  <router-view/>
</template>

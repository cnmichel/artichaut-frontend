<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template class="light">
  <router-view/>
</template>

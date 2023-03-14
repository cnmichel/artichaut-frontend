<script setup lang="ts">
import { onBeforeMount, provide, ref } from "vue";
import { getLangs } from '@/services/api.js'

const langs = ref([])
provide('langs', langs)

onBeforeMount(() => {
  getLangs().then((data: any) => langs.value = data)
})
</script>

<template>
  <router-view/>
</template>

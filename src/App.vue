<script setup lang="ts">

import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
</script>

<template>
  <header class="fixed top-0 left-0 right-0">
    <Header />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer class="fixed bottom-0 left-0 right-0">
    <Footer />
  </footer>
</template>

<style scoped>

</style>

<script setup lang="ts">

import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
</script>

<template>
  <header>
    <Header />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style scoped>

</style>

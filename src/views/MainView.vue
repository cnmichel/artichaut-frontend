<script setup lang="ts">
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
</script>

<template>
  <Header/>
  <main>
    <router-view/>
  </main>
  <Footer/>
</template>

<script setup lang="ts">
import Hero from "@/components/HeroComponent.vue";
import Features from "@/components/FeaturesComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from '@/components/FooterComponent.vue';
</script>

<template>
  <header>
    <Header/>
  </header>
  <main>
    <Hero/>
    <Features/>
  </main>
  <footer>
    <Footer/>
  </footer>
</template>
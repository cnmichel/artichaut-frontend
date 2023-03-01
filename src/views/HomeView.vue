<script setup lang="ts">
import Header from "@/components/HeaderComponent.vue";
import Footer from '@/components/FooterComponent.vue';
import Hero from "@/components/HeroComponent.vue";
import Features from "@/components/FeaturesComponent.vue";
</script>

<template>
    <Header/>
  <main>
    <Hero/>
    <Features/>
    <section class=" flex items-center justify-center h-80 mb-12 bg-fixed bg-center bg-cover background-parralax-one">
    </section>
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

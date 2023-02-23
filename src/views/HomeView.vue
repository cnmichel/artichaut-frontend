
<script setup lang="ts">
import Hero from "@/components/HeroComponent.vue";
import Features from "@/components/FeaturesComponent.vue";
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import Review from '@/components/ReviewComponent.vue';

</script>

<template>
  <header>
    <Header/>
  </header>
  <main>
    <Hero/>
    <Features/>
    <section class=" flex items-center justify-center h-80 mb-12 bg-fixed bg-center bg-cover background-parralax-one">
    </section>
    <Discover/>
  </main>
  <Review/>
  <footer>
    <Footer/>
  </footer>
</template>

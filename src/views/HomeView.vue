<script setup lang="ts">
import Hero from "@/components/HeroComponent.vue";
import Features from "@/components/FeaturesComponent.vue";
import News from '@/components/NewsComponent.vue';
import Review from '@/components/ReviewComponent.vue';
import Video from '@/components/VideoComponent.vue';
</script>

<template>
  <Hero/>
  <Features/>
  <section class=" flex items-center justify-center h-80 mb-12 bg-fixed bg-center bg-cover background-parralax-one">
  </section>
  <News/>
  <section class=" flex items-center justify-center h-80 mb-12 bg-fixed bg-center bg-cover background-parralax-one">
  </section>
  <Video/>
  <section class=" flex items-center justify-center h-80 mb-12 bg-fixed bg-center bg-cover background-parralax-one">
  </section>
  <Review/>
</template>

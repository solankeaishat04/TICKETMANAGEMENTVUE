<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <div class="flex flex-col">
      <Navbar />
      <Hero />
    </div>
    <Features />
    <Footer />
  </div>
</template>



<script setup>
import Navbar from "@/components/layout/TheNavbar.vue";
import Hero from "@/components/layout/TheHero.vue";
import Features from "@/components/layout/TheFeatures.vue";
import Footer from "@/components/layout/TheFooter.vue";
</script>

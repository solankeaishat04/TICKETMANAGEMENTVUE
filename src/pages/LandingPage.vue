<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <div class="flex flex-col">
      <TheNavbar />
      <TheHero />
    </div>
    <TheFeatures />
    <TheFooter />
  </div>
</template>



<script setup>
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheHero from "@/components/layout/TheHero.vue";
import TheFeatures from "@/components/layout/TheFeatures.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
</script>

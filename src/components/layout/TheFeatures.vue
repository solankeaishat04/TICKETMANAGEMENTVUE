<template>
  <section
    id="features"
    class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12"
    ref="containerRef"
  >
    <h2
      class="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-b-2 border-emerald-500 pb-2 inline-block"
    >
      Core Application Modules
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
      <div
        v-for="(module, idx) in featureModules"
        :key="module.moduleNum"
        class="flex flex-col feature-module transform transition-all duration-700"
        :class="{
          'opacity-100 translate-y-0': visibleModules[idx],
          'opacity-0 translate-y-16': !visibleModules[idx],
        }"
      >
        <ModuleBlock :module="module" />
        <div class="md:hidden w-full h-px bg-emerald-300 my-4"></div>
        <FeatureList :module="module" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ModuleBlock from "/src/components/ModuleBlock.vue";
import FeatureList from "/src/components/FeaturesList.vue";
import { featureModules } from "/src/data/FeaturesModules.js";

const containerRef = ref(null);
const visibleModules = ref(featureModules.map(() => false));

let observers = [];

onMounted(() => {
  if (containerRef.value) {
    const moduleElements = containerRef.value.querySelectorAll(".feature-module");

    moduleElements.forEach((el, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleModules.value[idx] = true;
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      observers.push(observer);
    });
  }
});

onBeforeUnmount(() => {
  observers.forEach((o) => o.disconnect());
});
</script>

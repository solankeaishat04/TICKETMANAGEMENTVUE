<template>
  <div class="flex flex-col items-center">
    <!-- Key Features -->
    <div class="w-full bg-emerald-50 rounded-lg shadow-lg mb-4 p-4 md:h-48 border border-emerald-200">
      <div class="flex items-center text-emerald-800 mb-2">
        <ArrowRightIcon class="w-5 h-5 mr-2 -rotate-90" />
        <span class="text-sm font-semibold uppercase tracking-wider">Key Features</span>
      </div>
      <ul class="list-disc ml-4 space-y-1 text-sm text-gray-700">
        <li
          v-for="(feature, idx) in module.keyFeatures"
          :key="idx"
          class="leading-tight"
        >
          {{ feature.text }}
        </li>
      </ul>
    </div>

    <!-- Main Module Card -->
    <div class="relative w-full">
      <div
        class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border-2 border-emerald-600"
      >
        <span class="text-xs font-bold text-emerald-800">Module {{ module.moduleNum }}</span>
      </div>

      <div class="bg-emerald-700 text-white p-4 rounded-lg shadow-xl text-center">
        <component :is="module.Icon" class="text-2xl mx-auto mb-1 opacity-80" />
        <h3 class="font-extrabold text-lg tracking-wide">{{ module.sectionTitle }}</h3>
        <p class="text-sm opacity-90 font-light">{{ module.title }}</p>
      </div>
    </div>

    <div class="hidden md:block w-0.5 h-8 bg-emerald-700 opacity-50"></div>
  </div>
</template>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

defineProps({
  module: {
    type: Object,
    required: true,
  },
});
</script>

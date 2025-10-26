<template>
  <div class="w-full space-y-1 mt-4 md:mt-0">
    <div
      v-for="feature in module.detailedFeatures"
      :key="feature.id"
      class="flex items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-emerald-500"
    >
      <div class="text-xs font-bold text-emerald-700 w-8 flex-shrink-0 pt-0.5">
        {{ feature.id }}
      </div>
      <p class="text-sm text-gray-800 ml-2">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  module: {
    type: Object,
    required: true,
  },
});
</script>

<!-- eslint-disable no-unused-vars -->
<template>
  <nav class="w-full bg-white md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow">
    <button @click="$emit('openSidebar')" class="text-black p-2 rounded">
      <Bars3Icon class="w-5 h-5" />
    </button>
  </nav>
</template>

<script setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["openSidebar"]);

</script>

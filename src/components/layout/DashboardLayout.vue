<template>
  <div class="flex overflow-hidden max-w-[1440px] mx-auto   min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar 
      :showSidebar="showSidebar" 
      @close="showSidebar = false"
    />

    <div class="flex-1 flex flex-col">
      <!-- Top Navigation -->
      <TopNav 
        @openSidebar="showSidebar = true"
      />

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto">
            <RouterView/><!-- Child pages (Dashboard, Tickets, etc.) render here -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "@/components/layout/TheSidebar.vue";
import TopNav from "@/components/layout/TopNav.vue";
import { RouterView } from "vue-router";

const showSidebar = ref(false); // Mobile sidebar state
</script>

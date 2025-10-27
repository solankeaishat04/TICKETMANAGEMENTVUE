<template>
  <header class="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md">
    <div class="max-w-[1440px] mx-auto px-4">
      <nav class="flex items-center justify-between py-2 md:py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 md:space-x-3">
          <img
            src="/src/assets/ticket_management_app_logo_triangular_tickets-removebg-preview.svg"
            alt="TicketWeb logo"
            class="h-10 w-10 md:h-16 md:w-16"
          />
          <span class="text-xl md:text-2xl font-semibold hidden md:inline">TicketMaster</span>
        </router-link>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center space-x-3">
          <router-link
            to="/login"
            class="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-green-600 transition"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="px-4 py-2 rounded-lg bg-white text-green-600 font-medium hover:bg-green-100 transition"
          >
            Sign Up
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isOpen = !isOpen" class="focus:outline-none">
            <component :is="isOpen ? FaTimesIcon : FaBarsIcon" class="w-7 h-7" />
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="md:hidden mt-2 bg-green-600 rounded-lg shadow-lg p-3 flex flex-col space-y-2"
        >
          <router-link
            to="/login"
            @click="isOpen = false"
            class="px-4 py-2 rounded-lg border border-white text-white font-medium hover:bg-white hover:text-green-600 transition"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            @click="isOpen = false"
            class="px-4 py-2 rounded-lg bg-white text-green-600 font-medium hover:bg-green-100 transition"
          >
            Sign Up
          </router-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Bars3Icon as FaBarsIcon, XMarkIcon as FaTimesIcon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

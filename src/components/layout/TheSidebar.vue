<template>
  <!-- Mobile overlay -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="$emit('close')"
  ></div>

   <aside
    :class="[
      'fixed top-0 left-0 z-50 w-64 min-h-screen bg-gray-300 px-5 pb-3 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 md:static md:flex',
      showSidebar ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Logo -->
    <div class="mb-5 flex items-center space-x-2">
      <img
        src="/src/assets/ticket_management_app_logo_triangular_tickets-removebg-preview.svg"
        alt="TicketMaster logo"
        class="h-16 w-16 md:h-16"
      />
      <span class="text-lg md:text-2xl font-semibold text-black">TicketMaster</span>
    </div>

    <!-- Links -->
    <div class="space-y-5">
      <RouterLink
        to="/dashboard"
        class="flex items-center space-x-3 p-3 rounded-xl bg-green-500 hover:bg-green-800 text-white font-semibold shadow gap-4"
        @click="$emit('close')"
      >
        <HomeIcon class="w-5 h-5" />
        Dashboard
      </RouterLink>

      <RouterLink
        to="/dashboard/tickets"
        class="flex items-center space-x-3 p-3 rounded-xl bg-green-500 hover:bg-green-800 text-white font-semibold shadow gap-4"
        @click="$emit('close')"
      >
        <TicketIcon class="w-5 h-5" />
        Ticket Management
      </RouterLink>
    </div>

    <!-- Back + Logout -->
    <div class="mt-auto mb-5 space-y-3">
      <button
        @click="backHome"
        class="w-full flex items-center justify-start space-x-2 p-3 text-green-700 font-semibold hover:text-green-900 gap-2"
      >
        <ArrowLeftIcon class="w-5 h-5" /> Back to Home
      </button>

      <button
        @click="showLogoutModal = true"
        class="w-full flex items-center justify-start space-x-2 p-3 text-red-700 gap-2"
      >
        <ArrowRightStartOnRectangleIcon class="w-5 h-5" /> Logout
      </button>
    </div>

    <!-- Close button -->
    <button class="absolute top-3 right-4 md:hidden p-2 text-black" @click="$emit('close')">
      <XMarkIcon class="w-5 h-5" />
    </button>

    <!-- Logout Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p class="mb-4 text-lg font-semibold">Are you sure you want to logout?</p>
        <div class="flex justify-center gap-4">
          <button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
          <button @click="showLogoutModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeftIcon,
  ArrowRightStartOnRectangleIcon,
  TicketIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";


// eslint-disable-next-line no-unused-vars
const props = defineProps({ showSidebar: Boolean });
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["close"]);

const router = useRouter();
const showLogoutModal = ref(false);

const backHome = () => router.push("/");
const logout = () => {
  localStorage.removeItem("ticketapp_session");
  localStorage.removeItem("user");
  showLogoutModal.value = false;
  router.push("/login");
};
</script>

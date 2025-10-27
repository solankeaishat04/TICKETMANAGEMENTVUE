<template>
  <div class="overflow-hidden max-w-[1440px] ">
    
    

   

      <!-- Main content -->
      
    <main class="flex-1 p-6 max-w-[1440px] mx-auto overflow-y-auto">
      <div v-if="toast" class="mb-4 p-2 bg-red-200 text-red-800 rounded">
        {{ toast }}
      </div>

      <header class="mb-10">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Welcome, {{ firstName }}
        </h1>
        <p class="text-gray-600 mt-1">Here is a summary of your tickets</p>
      </header>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <StatCard title="Total Tickets" :value="stats.total" />
        <StatCard title="Open Tickets" :value="stats.open" />
        <StatCard title="In Progress" :value="stats.inProgress" />
        <StatCard title="Resolved Tickets" :value="stats.closed" />
      </section>
    </main>
    <TheFooter/>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";

import StatCard from "@/components/card/StatCard.vue";
import ticketService from "@/services/TicketService.js";
import TheFooter from '@/components/layout/TheFooter.vue';

const stats = ref({ total: 0, open: 0, closed: 0, inProgress: 0 });
const toast = ref(null);

const user = JSON.parse(localStorage.getItem("user") || "{}");
const firstName = user?.firstName || "User";

const fetchStats = async () => {
  try {
    const tickets = await ticketService.getTickets();
    stats.value = {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      closed: tickets.filter((t) => t.status === "closed").length,
      inProgress: tickets.filter((t) => t.status === "in_progress").length,
    };
  } catch {
    toast.value = "Failed to fetch ticket statistics.";
  }
};

onMounted(fetchStats);
</script>

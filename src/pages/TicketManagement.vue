<template>
  <div class="flex flex-col min-h-screen max-w-[1440px] mx-auto bg-gray-50">
    <main class="flex-1 p-6 overflow-y-auto">
      <ToastComponent />

      <header
        class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
      >
        <h1 class="text-2xl sm:text-3xl font-bold">Ticket Management</h1>
        <div>
          <button
            @click="openNewForm"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
          >
            New Ticket
          </button>
        </div>
      </header>

      <div v-if="loading">Loading tickets...</div>
      <div v-else-if="tickets.length === 0" class="text-gray-500">
        No tickets yet. Create one!
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="editTicketFn"
          @delete="ticketToDelete = ticket"
        />
      </div>

      <!-- Ticket Form Modal -->
      <div
        v-if="showForm"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            @click="showForm = false"
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <TicketForm
            :existing="editTicket || undefined"
            @save="handleSave"
            @close="showForm = false"
          />
        </div>
      </div>

      
      <div
        v-if="ticketToDelete"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
          <p class="mb-4 text-lg font-semibold">
            Are you sure you want to delete this ticket?
          </p>
          <div class="flex justify-center gap-2">
            <button
              @click="confirmDelete"
              class="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
            <button
              @click="ticketToDelete = null"
              class="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
    <TheFooter/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TicketCard from "@/components/layout/TicketCard.vue";
import TicketForm from "@/components/layout/TicketForm.vue";
import ticketService from "@/services/TicketService.js";
import { useToast } from "@/composables/useToast.js";
import TheFooter from '@/components/layout/TheFooter.vue';

const { showToast, ToastComponent } = useToast();

const tickets = ref([]);
const showForm = ref(false);
const editTicket = ref(null);
const loading = ref(true);
const ticketToDelete = ref(null);

const fetchTickets = async () => {
  try {
    tickets.value = await ticketService.getTickets();
  } catch {
    showToast({ message: "Failed to load tickets.", type: "error" });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTickets);

const openNewForm = () => {
  showForm.value = true;
  editTicket.value = null;
};

const editTicketFn = (ticket) => {
  editTicket.value = ticket;
  showForm.value = true;
};

const handleSave = (ticket) => {
  const index = tickets.value.findIndex((t) => t.id === ticket.id);
  if (index !== -1) {
    tickets.value[index] = ticket;
    showToast({ message: "Ticket updated successfully!", type: "success" });
  } else {
    tickets.value.unshift(ticket);
    showToast({ message: "Ticket created successfully!", type: "success" });
  }
  showForm.value = false;
};

const confirmDelete = async () => {
  try {
    await ticketService.deleteTicket(ticketToDelete.value.id);
    tickets.value = tickets.value.filter((t) => t.id !== ticketToDelete.value.id);
    showToast({ message: "Ticket deleted successfully.", type: "success" });
  } catch {
    showToast({ message: "Failed to delete ticket.", type: "error" });
  } finally {
    ticketToDelete.value = null;
  }
};
</script>

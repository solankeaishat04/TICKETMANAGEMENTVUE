<template>
  <article class="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between">
    <div>
      <h3 class="font-bold text-lg">{{ ticket.title }}</h3>
      <p v-if="ticket.description" class="text-gray-600 text-sm mt-2">{{ ticket.description }}</p>
      <p v-else class="text-gray-400 italic text-sm mt-2">No description</p>
    </div>

    <div class="mt-3 flex items-center justify-between">
      <span :class="statusClass">{{ statusLabel }}</span>

      <div class="flex items-center gap-3">
        <button @click="$emit('edit', ticket)" class="text-indigo-600 hover:underline">Edit</button>
        <button @click="$emit('delete', ticket)" class="text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    ticket: Object,
  },
  computed: {
    statusLabel() {
      const map = { open: 'Open', in_progress: 'In Progress', closed: 'Closed' };
      return map[this.ticket.status] || 'Open';
    },
    statusClass() {
      const map = {
        open: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs',
        in_progress: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs',
        closed: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs',
      };
      return map[this.ticket.status] || map.open;
    },
  },
};
</script>

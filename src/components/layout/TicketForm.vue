<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
      <h2 class="text-xl font-semibold mb-2">{{ existing ? 'Edit Ticket' : 'Create Ticket' }}</h2>

      <div>
        <label class="block mb-1 font-medium">Title *</label>
        <input v-model="title" class="w-full border rounded px-3 py-2" :class="errors.title ? 'border-red-500' : 'border-gray-300'" />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block mb-1 font-medium">Description</label>
        <textarea v-model="description" class="w-full border rounded px-3 py-2 border-gray-300"></textarea>
      </div>

      <div>
        <label class="block mb-1 font-medium">Status *</label>
        <select v-model="status" class="w-full border rounded px-3 py-2" :class="errors.status ? 'border-red-500' : 'border-gray-300'">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button type="button" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" @click="onClose" :disabled="isSubmitting">Cancel</button>
        <button type="submit" class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700" :disabled="isSubmitting">
          {{ isSubmitting ? "Saving..." : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    existing: Object,
    onSave: Function,
    onClose: Function,
  },
  data() {
    return {
      title: this.existing?.title || '',
      description: this.existing?.description || '',
      status: this.existing?.status || 'open',
      errors: {},
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.errors = {};
      if (!this.title.trim()) this.errors.title = 'Title is required';
      if (!['open', 'in_progress', 'closed'].includes(this.status)) this.errors.status = 'Invalid status';
      if (Object.keys(this.errors).length) return;

      this.isSubmitting = true;

      const ticket = {
        title: this.title,
        description: this.description,
        status: this.status,
        id: this.existing?.id || Date.now(),
      };

      this.onSave(ticket);
      this.onClose();
      this.isSubmitting = false;
    },
  },
};
</script>

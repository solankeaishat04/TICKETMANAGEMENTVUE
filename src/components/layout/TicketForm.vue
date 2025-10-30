<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto"
    >
      <h2 class="text-xl font-semibold mb-2">
        {{ existing ? 'Edit Ticket' : 'Create Ticket' }}
      </h2>

      <!-- Title -->
      <div>
        <label class="block mb-1 font-medium">Title *</label>
        <input
          v-model="title"
          class="w-full border rounded px-3 py-2"
          :class="errors.title ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">
          {{ errors.title }}
        </p>
      </div>

      <!-- Description -->
      <div>
        <label class="block mb-1 font-medium">Description</label>
        <textarea
          v-model="description"
          class="w-full border rounded px-3 py-2 border-gray-300"
        ></textarea>
      </div>

      <!-- Status -->
      <div>
        <label class="block mb-1 font-medium">Status *</label>
        <select
          v-model="status"
          class="w-full border rounded px-3 py-2"
          :class="errors.status ? 'border-red-500' : 'border-gray-300'"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm mt-1">
          {{ errors.status }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          @click="onClose"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ticketService from "@/services/TicketService.js"

const props = defineProps({
  existing: Object,
  onClose: Function,
})

const title = ref(props.existing?.title || "")
const description = ref(props.existing?.description || "")
const status = ref(props.existing?.status || "open")
const errors = ref({})
const isSubmitting = ref(false)

async function handleSubmit() {
  errors.value = {}

  // Validation
  if (!title.value.trim()) errors.value.title = "Title is required"
  if (!["open", "in_progress", "closed"].includes(status.value))
    errors.value.status = "Invalid status"
  if (Object.keys(errors.value).length) return

  isSubmitting.value = true

  const ticketData = {
    title: title.value,
    description: description.value,
    status: status.value,
  }

  try {
    if (props.existing?.id) {
      await ticketService.updateTicket(props.existing.id, ticketData)
    } else {
      await ticketService.createTicket(ticketData)
    }

    // Optional: emit event or reload page if needed
    props.onClose()
  } catch (err) {
    console.error("Error saving ticket:", err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

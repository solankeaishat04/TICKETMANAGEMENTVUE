<template>
  <section :class="['rounded-2xl border p-4 shadow-sm bg-white h-full flex flex-col justify-between', className]">
    <div>
      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>{{ title }}</span>
        <slot name="icon"></slot>
      </div>

      <div class="mt-2 text-2xl font-bold text-gray-900">{{ value }}</div>

      <div v-if="change" :class="['mt-1 flex items-center gap-1 text-sm', change.type === 'up' ? 'text-green-600' : 'text-red-600']">
        <i :class="change.type === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
        <span>{{ change.value }}</span>
        <span v-if="change.label">{{ change.label }}</span>
      </div>

      <div v-if="note" class="mt-2 text-sm text-gray-500">
        <slot name="note">{{ note }}</slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    change: { type: Object, default: null },
    note: { type: String, default: '' },
    className: { type: String, default: '' },
  },
};
</script>

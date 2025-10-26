<template>
  <slot />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) {
    router.replace("/login"); // redirect if not logged in
  }
});
</script>

<template>
  <slot />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");

  // Only redirect if user is logged in AND trying to access login/signup
  if (
    session &&
    (route.path === "/login" || route.path === "/signup")
  ) {
    router.replace("/dashboard");
  }
});
</script>

<template>
  <footer class="bg-gray-800 max-w-[1440px]  text-white pt-10 pb-6 mt-12  shadow-inner">
    <div class="px-4 sm:px-6 lg:px-8">
      <!-- Newsletter Section -->
      <div class="mb-8 border-b border-gray-700 pb-8">
        <h3 class="text-2xl font-bold mb-2 flex items-center">
          <PaperAirplaneIcon class="text-emerald-400 mr-3 w-6 h-6" />
          Stay Updated
        </h3>
        <p class="text-gray-400 mb-4 max-w-lg">
          Subscribe to our newsletter for product updates and exclusive tips.
        </p>

        <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row max-w-md space-y-3 sm:space-y-0 sm:space-x-3">
          <input
            type="email"
            placeholder="Enter your email address"
            v-model="newsletterEmail"
            class="w-full sm:flex-1 p-3 rounded-lg text-gray-800 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors shadow-inner"
            required
          />
          <button
            type="submit"
            class="bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-emerald-600 transition-colors transform hover:scale-[1.02] active:scale-100"
          >
            Subscribe
          </button>
        </form>

        <p v-if="subscriptionMessage" :class="[
            'mt-3 text-sm font-medium p-2 rounded-lg',
            subscriptionMessage.startsWith('Thank you')
              ? 'bg-emerald-700 text-emerald-100'
              : 'bg-red-700 text-red-100'
          ]">
          {{ subscriptionMessage }}
        </p>
      </div>

      <!-- Copyright -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
        <p class="text-gray-400 flex items-center">
          <span class="mr-1">©</span>{{ new Date().getFullYear() }} <strong>Ticket Management App</strong>. All rights reserved.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-emerald-400 transition-colors">Terms of Use</a>
          <a href="#" class="hover:text-emerald-400 transition-colors">Support</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

const newsletterEmail = ref("");
const subscriptionMessage = ref(null);

const handleSubscribe = () => {
  if (!newsletterEmail.value.includes("@")) {
    subscriptionMessage.value = "Please enter a valid email address.";
    setTimeout(() => (subscriptionMessage.value = null), 3000);
    return;
  }

  subscriptionMessage.value = `Thank you for subscribing, ${newsletterEmail.value}!`;
  newsletterEmail.value = "";
  setTimeout(() => (subscriptionMessage.value = null), 5000);
};
</script>

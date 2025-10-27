<template>
  <div class="flex flex-col min-h-screen max-w-[1440px] items-center justify-center mx-auto bg-gray-50 p-4 relative">
    <!-- Toast -->
    <div
      v-if="toast"
      :class="[
        'fixed top-5 right-5 px-6 py-3 rounded shadow text-white font-medium text-sm',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="w-full max-w-md bg-white p-8 mx-auto rounded-xl shadow-md relative">
      <!-- Close Button -->
      <button
        @click="goHome"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      <Logo />
      <h2 class="text-2xl font-semibold text-green-600 mt-4 mb-6">Welcome Back</h2>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            autocomplete="username"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block mb-1">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
              autocomplete="current-password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-3 text-gray-500 hover:text-green-600"
              aria-label="Toggle password visibility"
            >
              <component
                :is="showPassword ? EyeSlashIcon : EyeIcon"
                class="w-5 h-5"
              />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          {{ submitting ? "Signing in..." : "Login" }}
        </button>
      </form>

      <p class="text-sm text-center mt-4">
        Don’t have an account?
        <router-link to="/signup" class="text-green-600 font-medium">Sign up</router-link>
      </p>
    </div>
    <TheFooter/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import Logo from '@/components/layout/TheLogo.vue';
import { mockAuthAPI } from '@/services/MockAuth.js';
import TheFooter from '@/components/layout/TheFooter.vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errors = ref({});
const toast = ref(null);
const submitting = ref(false);

function goHome() {
  router.push('/');
}

async function handleLogin() {
  errors.value = {};
  toast.value = null;

  if (!email.value) errors.value.email = 'Email is required';
  if (!password.value) errors.value.password = 'Password is required';
  if (Object.keys(errors.value).length) return;

  submitting.value = true;
  try {
    const res = await mockAuthAPI.login(email.value, password.value);
    localStorage.setItem('ticketapp_session', res.token);
    localStorage.setItem(
      'user',
      JSON.stringify({ ...res.user, firstName: res.user.name?.split(' ')[0] })
    );

    toast.value = { message: 'User Login successful!', type: 'success' };
    setTimeout(() => router.push('/dashboard'), 900);
  } catch (err) {
    toast.value = { message: err?.message || 'Invalid email or password', type: 'error' };
    setTimeout(() => (toast.value = null), 3000);
  } finally {
    submitting.value = false;
  }
}
</script>

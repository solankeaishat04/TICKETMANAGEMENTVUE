<template>
  <div class="min-h-screen  max-w-[1440px]  items-center justify-center bg-gray-50 p-4 relative">
    <!-- Toast -->
    <div v-if="toast" class="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow">
      {{ toast }}
    </div>

    <div class="w-full max-w-md bg-white mx-auto p-8 rounded-xl shadow-md relative">
      <!-- Close Button -->
      <button
        @click="goHome"
        class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      <Logo />
      <h2 class="text-2xl font-semibold text-green-600 mt-4 mb-6">Create Your Account</h2>

      <form @submit.prevent="handleSignup" class="flex flex-col gap-4">
        <div>
          <label class="block mb-1">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            class="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            autocomplete="name"
          />
          <p v-if="errors.fullName" class="text-red-500 text-sm mt-1">{{ errors.fullName }}</p>
        </div>

        <div>
          <label class="block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
            autocomplete="email"
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
              autocomplete="new-password"
            />
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-3 text-gray-500 hover:text-green-600">
              <component
                :is="showPassword ? EyeSlashIcon : EyeIcon"
                class="w-5 h-5"
              />
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label class="block mb-1">Confirm Password</label>
          <div class="relative">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="confirm"
              class="w-full border rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500"
              autocomplete="new-password"
            />
            <button type="button" @click="showConfirm = !showConfirm" class="absolute right-3 top-3 text-gray-500 hover:text-green-600">
              <component
                :is="showConfirm ? EyeSlashIcon : EyeIcon"
                class="w-5 h-5"
              />
            </button>
          </div>
          <p v-if="errors.confirm" class="text-red-500 text-sm mt-1">{{ errors.confirm }}</p>
        </div>

        <button
          type="submit"
          class="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          {{ submitting ? 'Creating...' : 'Create Account' }}
        </button>
      </form>

      <p class="text-sm text-center mt-4">
        Already have an account?
        <router-link to="/login" class="text-green-600 font-medium">Login</router-link>
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

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const showPassword = ref(false);
const showConfirm = ref(false);
const errors = ref({});
const toast = ref(null);
const submitting = ref(false);

function goHome() {
  router.push('/');
}

async function handleSignup() {
  errors.value = {};
  toast.value = null;

  if (!fullName.value) errors.value.fullName = 'Full name is required';
  if (!email.value) errors.value.email = 'Email is required';
  if (!password.value) errors.value.password = 'Password is required';
  if (password.value !== confirm.value) errors.value.confirm = 'Passwords do not match';
  if (Object.keys(errors.value).length) return;

  submitting.value = true;
  try {
    const res = await mockAuthAPI.signup(email.value, password.value, fullName.value);
    localStorage.setItem('ticketapp_session', res.token);
    localStorage.setItem('user', JSON.stringify({ ...res.user, firstName: res.user.name?.split(' ')[0] }));

    toast.value = 'Account created successfully! Redirecting to dashboard...';
    setTimeout(() => router.push('/login'), 1200);
  } catch (err) {
    toast.value = err?.message || 'Signup failed';
    setTimeout(() => (toast.value = null), 3000);
  } finally {
    submitting.value = false;
  }
}
</script>

import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/LandingPage.vue";
import Login from "@/pages/auth/UserLogin.vue";
import SignUp from "@/pages/auth/UserSignUp.vue";
import DashboardLayout from "@/components/layout/DashboardLayout.vue";
import Dashboard from "@/pages/DashboardPage.vue";
import Tickets from "@/pages/TicketManagement.vue";

const routes = [
  { path: "/", name: "Landing", component: Landing },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "SignUp", component: SignUp },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "tickets", name: "Tickets", component: Tickets },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🛡 GLOBAL AUTH GUARD
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("ticketapp_session");

  // 1️⃣ Not logged in & trying to access a protected page
  if (to.meta.requiresAuth && !session) {
    next("/login");
  }
  // 2️⃣ Logged in & trying to access login/signup again
  else if ((to.path === "/login" || to.path === "/signup") && session) {
    next("/dashboard");
  }
  // 3️⃣ Otherwise, free to go
  else {
    next();
  }
});

export default router;

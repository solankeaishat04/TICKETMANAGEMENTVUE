import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/LandingPage.vue";
import Login from "@/pages/auth/UserLogin.vue";
import SignUp from "@/pages/auth/UserSignUp.vue";
import DashboardLayout from "@/components/layout/DashboardLayout.vue";
import Dashboard from "@/pages/DashboardPage.vue";
import Tickets from "@/pages/TicketManagement.vue";

const routes = [
  // Public routes
  { path: "/", name: "Landing", component: Landing, meta: { public: true } },
  { path: "/login", name: "Login", component: Login, meta: { public: true } },
  { path: "/signup", name: "SignUp", component: SignUp, meta: { public: true } },

  // Protected routes (with layout)
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "", name: "Dashboard", component: Dashboard },
      { path: "tickets", name: "Tickets", component: Tickets },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("ticketapp_session");

  if (to.meta.public) {
    if (isAuthenticated && (to.name === "Login" || to.name === "SignUp")) {
      return next({ name: "Dashboard" });
    }
    return next();
  }

  // Protected pages
  if (!isAuthenticated) {
    return next({ name: "Login" });
  }

  next();
});

export default router;

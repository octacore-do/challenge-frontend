import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "../store/modules/user";
import Home from "../../src/views/dashboard/jobScreen.vue";
import Login from "../../src/views/auth/login.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Dashboard",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  // Ruta para 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.getToken;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "Login" };
  }

  if (to.name === "Login" && isAuthenticated) {
    return { name: "Dashboard" };
  }
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

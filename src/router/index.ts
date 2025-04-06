import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "../store/modules/user";
import routes from "./routes";
import type { UserInfo } from "../store/types/store";

export const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const token = userStore.getToken;
  const user: Nullable<UserInfo> = userStore.getUserInfo;

  if (token && to.fullPath === "/login") return "/";
  if (to.fullPath === "/login") return true;
  if (!token || token === null || token === undefined || token === "")
    return "/login";

  if (!user) await userStore.loadMe();
  if (!user || user === null) return "/login";
  return false;
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

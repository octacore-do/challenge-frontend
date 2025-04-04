import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useUserStore } from "~/store/modules/user";

import routes from "./routes";
import { UserTypeEnum } from "~/enums/userTypeEnum";
import type { UserInfo } from "#/store";

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

  if (user.user_type === UserTypeEnum.NOTHING) {
    userStore.logout();
    return "/login";
  }
  if (user.user_type === UserTypeEnum.SUPER_ADMIN) return true;
  if (
    to.meta.allowed?.length === 0 ||
    to.meta.allowed?.includes(user.user_type)
  )
    return true;

  return false;
});

router.afterEach(() => {
  // HACK: Cerrar el modal tras navegar
  let target = document.getElementById("drawer-navigation");
  const hidden = target?.getAttribute("aria-hidden");
  const model = target?.getAttribute("aria-modal");
  if (hidden === null && model === "true") {
    const btn = document.querySelector(
      "[data-drawer-target='drawer-navigation']"
    ) as HTMLButtonElement | null;
    if (btn !== null) {
      btn.click();
    }
  }
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

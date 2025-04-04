import layout from "~/router/routes/layout";
import ExternalLayout from "~/layouts/external/ExternalLayout.vue";
import Login from "~/views/auth/login.vue";

const auth = {
  path: "/",
  component: ExternalLayout,
  meta: {
    requiredAuth: false,
    allowed: [],
  },
  children: [
    {
      path: "/login",
      component: Login,
      meta: {
        requiredAuth: false,
        allowed: [],
      },
    },
  ],
};

export default [auth, layout];

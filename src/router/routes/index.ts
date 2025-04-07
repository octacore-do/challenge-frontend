import Login from "../../views/auth/login.vue";

const auth = {
  path: "/",
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

export default [auth];

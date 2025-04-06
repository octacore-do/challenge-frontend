import Home from "../../views/dashboard/jobScreen.vue";

const modules = import.meta.glob<{ default: any }>("./modules/**/*.ts", {
  eager: true,
});
const routeModuleList: any = [];

// Añadir a la colección de rutas
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

const home = {
  path: "/home",
  component: Home,
  meta: {
    title: "Tablero",
    allowed: [],
  },
};

const layout = {
  path: "",
  name: "Layout",
  redirect: "/home",
  meta: {
    title: "Layout",
    allowed: [],
  },
  children: [home, ...routeModuleList],
};

export default layout;

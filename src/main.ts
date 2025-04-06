import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import { ToastService, DialogService, ConfirmationService } from "primevue";
import AppState from "./plugins/appState.ts";
import Noir from "./presets/Noir.ts";
import "primeicons/primeicons.css";
import { setupStore } from "../src/store/index.ts";
import { router, setupRouter } from "../src/router/index.ts";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: "p",
      darkModeSelector: ".p-dark",
      cssLayer: false,
    },
  },
});

app.use(AppState);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);

setupStore(app);
setupRouter(app);

try {
  await router.isReady();

  app.mount("#app");
} catch (err) {
  console.error(err);
}

import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import AppState from "./plugins/appState.ts";
import Noir from "./presets/Noir.ts";

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

app.mount("#app");

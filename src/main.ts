import "@/styles/style.scss";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { createApp } from "vue";
import App from "./view/App.vue";
import { router } from "./router";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Aura from "@primeuix/themes/aura";

const app = createApp(App);
app.use(router);

app.use(PrimeVue, { theme: { preset: Aura } });
app.component("PButton", Button);

app.mount("#app");

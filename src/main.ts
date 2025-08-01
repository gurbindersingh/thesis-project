import "@/styles/style.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { createApp } from "vue";
import { router } from "./router";
import App from "./view/App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import Card from "primevue/card";
import Menu from "primevue/menu";
import AutoComplete from "primevue/autocomplete";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";

const app = createApp(App);
app.use(router);

app.use(PrimeVue, { theme: { preset: Aura } });
app.component("PButton", Button);
app.component("PSelectButton", SelectButton);
app.component("PCard", Card);
app.component("PMenu", Menu);
app.component("PAutoComplete", AutoComplete);
app.component("PInputNumber", InputNumber);
app.component("PInputText", InputText);

app.mount("#app");

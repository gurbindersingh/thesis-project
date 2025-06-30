import { createRouter, createWebHashHistory } from "vue-router";

import CheckIn from "./view/pages/CheckIn.vue";
import GripStrengthTest from "./view/pages/GripStrengthTest.vue";

const routes = [
  { path: "/", component: CheckIn },
  { path: "/grip-strength", component: GripStrengthTest },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

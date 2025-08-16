import { createRouter, createWebHashHistory } from "vue-router";

import CheckIn from "./view/pages/CheckIn.vue";
import GripStrengthTest from "./view/pages/GripStrengthTest.vue";
import DiagnosticPacing from "./view/pages/DiagnosticPacing.vue";
import RetrospectivPacing from "./view/pages/RetrospectivPacing.vue";
import NotFound from "./view/pages/NotFound.vue";

const routes = [
  { path: "/", redirect: "/check-in" },
  { path: "/check-in", component: CheckIn },
  { path: "/grip-strength", component: GripStrengthTest },
  { path: "/diagnostic", component: DiagnosticPacing },
  { path: "/retrospective", component: RetrospectivPacing },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

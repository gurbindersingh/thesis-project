import { createRouter, createWebHashHistory } from "vue-router";

import CheckIn from "./view/pages/CheckIn.vue";
import GripStrengthTest from "./view/pages/GripStrengthTest.vue";
import DiagnosticPacing from "./view/pages/DiagnosticPacing.vue";
import RetrospectivPacing from "./view/pages/RetrospectivPacing.vue";
import NotFound from "./view/pages/NotFound.vue";
import NavigationPage from "./view/pages/NavigationPage.vue";

const routes = [
  { path: "/", component: NavigationPage },
  { path: "/check-in", component: CheckIn },
  { path: "/grip-strength", component: GripStrengthTest },
  { path: "/diagnostic", component: DiagnosticPacing },
  { path: "/realtime", component: DiagnosticPacing },
  { path: "/retrospective", component: RetrospectivPacing },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

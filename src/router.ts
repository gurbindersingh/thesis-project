import { createRouter, createWebHashHistory } from "vue-router";

import CheckIn from "./view/pages/CheckIn.vue";
import GripStrengthTest from "./view/pages/GripStrengthTest.vue";
import DiagnosticPacing from "./view/pages/DiagnosticPacing.vue";
import RetrospectivPacing from "./view/pages/RetrospectivPacing.vue";
import NotFound from "./view/pages/NotFound.vue";
import NavigationPage from "./view/pages/NavigationPage.vue";

const routes = [
  { path: "/", component: NavigationPage },
  // Define mode to empty, or have either the value of 'morning' or 'evening'.
  {
    path: "/check-in",
    component: CheckIn,
    name: "check-in",
  },
  { path: "/grip-strength", component: GripStrengthTest },
  { path: "/diagnostic", component: DiagnosticPacing },
  { path: "/realtime", component: DiagnosticPacing },
  { path: "/retrospective", component: RetrospectivPacing },
  // Define any other path to show NotFound page.
  // The name of the parameter `:param` here is unimportent as we don't use it.
  // It is only relevant if want to access the params using the router in our
  // components.
  { path: "/:anyOther(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import NavigationView from "../views/NavigationView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/results",
  },
  {
    path: "/",
    component: NavigationView,
    children: [
      {
        path: "results",
        component: () => import("@/views/ResultsView.vue"),
      },
      {
        path: "schedules",
        component: () => import("@/views/SchedulesView.vue"),
      },
      {
        path: "users",
        component: () => import("@/views/UsersView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

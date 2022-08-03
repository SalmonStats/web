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
        path: "login",
        component: () => import("../views/SignInView.vue"),
      },
      {
        path: "users/:player_id/results",
        component: () => import("../views/ResultsView.vue"),
      },
      {
        path: "results",
        component: () => import("../views/ResultsView.vue"),
      },
      {
        path: "results/:salmon_id",
        component: () => import("../views/ResultView.vue"),
      },
      {
        path: "schedules",
        component: () => import("../views/SchedulesView.vue"),
      },
      {
        path: "schedules/:schedule_id",
        component: () => import("../views/StatsView.vue"),
      },
      {
        path: "users/:player_id",
        component: () => import("../views/PlayersView.vue"),
      },
      {
        path: "users",
        component: () => import("../views/UserView.vue"),
      },
      // {
      //   path: "charts",
      //   component: () => import("../views/PlayersView.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

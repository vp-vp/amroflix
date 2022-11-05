import { createRouter, createWebHistory } from "vue-router";
import TelevisionView from "@/views/TelevisionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      redirect: "/tv", // TODO: Create a home page
    },
    {
      path: "/tv",
      name: "tv",
      component: TelevisionView,
    },
    {
      path: "/show/:id",
      name: "show",
      component: () => import("../views/ShowView.vue"),
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/ComingSoonView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/ComingSoonView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "homeIndex",
    component: () => import("@/views/index/homeIndex.vue"),
    meta: {
      title: "首页",
      tabBar: false,
    },
  },
  {
    path: "/chat",
    name: "chatIndex",
    component: () => import("@/views/chat/chartIndex.vue"),
    meta: {
      title: "聊天",
      tabBar: false,
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

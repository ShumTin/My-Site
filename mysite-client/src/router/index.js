import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleControler } from "@/utils";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  // 配置
  routes: routes,
  mode: "history",
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleControler.setRouteTitle(to.meta.title);
  }
});

export default router;

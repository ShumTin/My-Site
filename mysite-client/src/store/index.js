// 数据仓库模块
import { Store, install } from "vuex";
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
  install(Vue);
}

const store = new Store({
  // 仓库配置对象
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
});

export default store;

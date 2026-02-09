import { getSetting } from "@/api/setting";
import { titleControler } from "@/utils";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },

  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
      if (resp.favicon) {
        // 删除所有旧的 favicon
        document
          .querySelectorAll("link[rel*='icon']")
          .forEach((l) => l.remove());

        // 创建新的 favicon
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = resp.favicon;
        document.head.appendChild(link);
      }
      if (resp.siteTitle) {
        titleControler.setSiteTitle(resp.siteTitle);
      }
    },
  },
};

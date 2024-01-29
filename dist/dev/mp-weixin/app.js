"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
require("./stores/modules/userInfoStore.js");
require("./utils/http.js");
if (!Math) {
  "./pages/find/index.js";
  "./pages/competition/index.js";
  "./pages/community/index.js";
  "./pages/mine/index.js";
  "./pages/mine/personPage/index.js";
  "./pages/community/chatRoom/index.js";
  "./pages/competition/searchPage/index.js";
  "./subpackage/notification_detail/index.js";
  "./subpackage/personal_data/index.js";
  "./subpackage/posts/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: "1"
      });
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/frontend/project/Competition-center/competition-Center/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

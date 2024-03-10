"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
const stores_modules_chatHistoryStore = require("./stores/modules/chatHistoryStore.js");
const stores_modules_userInfoStore = require("./stores/modules/userInfoStore.js");
require("./utils/http.js");
if (!Math) {
  "./pages/find/index.js";
  "./pages/competition/index.js";
  "./pages/community/index.js";
  "./pages/mine/index.js";
  "./pages/mine/personPage/index.js";
  "./pages/community/chatRoom/index.js";
  "./pages/competition/searchPage/index.js";
  "./pages/test/index.js";
  "./subpackage/notification_detail/index.js";
  "./subpackage/personal_data/index.js";
  "./subpackage/posts/index.js";
  "./subpackage/myFriends/index.js";
  "./subpackage/myCollection/index.js";
  "./subpackage/PostWriting/index.js";
  "./subpackage/subscribe/index.js";
  "./subpackage/postDetail/index.js";
  "./subpackage/myFollowers/index.js";
  "./subpackage/myMedal/index.js";
  "./subpackage/myTeam/index.js";
  "./subpackage/myExperience/index.js";
  "./subpackage/signUpCom/index.js";
  "./subpackage/aboutUs/index.js";
  "./subpackage/moreSetting/index.js";
  "./subpackage/customerService/index.js";
  "./subpackage/postManage/index.js";
  "./subpackage/comDetail/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const chatHistoryStore = stores_modules_chatHistoryStore.useChatHistoryStore();
    const userInfoStore = stores_modules_userInfoStore.useUserInfoStore();
    const { userInfo } = common_vendor.storeToRefs(userInfoStore);
    common_vendor.onLaunch(() => {
      console.log("小程序启动");
      if (userInfo.value.token) {
        chatHistoryStore.websocketInit();
      }
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

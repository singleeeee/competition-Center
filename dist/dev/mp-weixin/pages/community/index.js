"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (topic + friends + message)();
}
const topic = () => "./components/topic.js";
const friends = () => "./components/friends.js";
const message = () => "./components/message.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let windowHeight = 0;
    (() => {
      const deviceInfo = common_vendor.index.getWindowInfo();
      windowHeight = (deviceInfo == null ? void 0 : deviceInfo.windowHeight) - 40;
      console.log(windowHeight);
    })();
    let currentPage = common_vendor.ref(0);
    const swiperChange = (e) => {
      currentPage.value = e.detail.current;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(currentPage) === 0 ? 1 : "",
        b: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 0 : currentPage = 0),
        c: common_vendor.unref(currentPage) === 1 ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 1 : currentPage = 1),
        e: common_vendor.unref(currentPage) === 2 ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 2 : currentPage = 2),
        g: common_vendor.p({
          title: "热门比赛",
          type: true
        }),
        h: common_vendor.p({
          title: "热门帖子",
          type: false
        }),
        i: common_vendor.unref(windowHeight) * 2 - 40 + "rpx",
        j: common_vendor.unref(windowHeight) * 2 - 40 + "rpx",
        k: common_vendor.o(swiperChange),
        l: common_vendor.unref(currentPage),
        m: common_vendor.s(`height:${common_vendor.unref(windowHeight)}*2 + 'rpx'`)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-485a05f3"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/community/index.vue"]]);
wx.createPage(MiniProgramPage);

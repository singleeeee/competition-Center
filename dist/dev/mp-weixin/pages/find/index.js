"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (_easycom_uni_notice_bar + news)();
}
const news = () => "./components/news.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let marginTop = common_vendor.ref(80);
    const closeNoticebar = () => {
      marginTop.value = 0;
      console.log(marginTop.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(closeNoticebar),
        b: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          showClose: true,
          text: "为了备战2024年的蓝桥杯与团体程序设计天梯赛，我们特别组织了这次算法集训队！ 这是一个绝佳的机会，让我们共同努力，为即将到来的挑战做好准备，提升我们的编程和算法技能！"
        }),
        c: common_vendor.unref(marginTop) + "rpx"
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b8b30bc"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/find/index.vue"]]);
wx.createPage(MiniProgramPage);

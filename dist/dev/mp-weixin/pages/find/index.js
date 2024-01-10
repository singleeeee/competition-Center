"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/前端/项目/竞赛中心助手/competition-Center/src/pages/find/index.vue"]]);
wx.createPage(MiniProgramPage);

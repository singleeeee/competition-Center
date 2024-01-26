"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_section2 + _easycom_uni_card2)();
}
const _easycom_uni_section = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-section/uni-section.js";
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      title: "A类竞赛",
      ["sub-title"]: "一等奖：200 二等奖： 180 三等奖：160"
    }),
    b: common_vendor.p({
      title: "互联网+",
      ["sub-title"]: "中国国际“互联网+”大学生创新创业大赛",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    c: common_vendor.p({
      title: "挑战杯",
      ["sub-title"]: "“挑战杯”全国大学生课外学术科技作品竞赛",
      extra: "大挑",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    d: common_vendor.p({
      title: "挑战杯",
      ["sub-title"]: "“挑战杯”中国大学生创业大赛",
      extra: "小挑",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    e: common_vendor.p({
      title: "B类竞赛",
      ["sub-title"]: "一等奖：160 二等奖： 140 三等奖：120"
    }),
    f: common_vendor.p({
      title: "国际大学生程序设计竞赛",
      ["sub-title"]: "算法比赛",
      extra: "ICPC",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    g: common_vendor.p({
      title: "蓝桥杯全国软件和信息技术专业人才大赛",
      ["sub-title"]: "算法比赛",
      extra: "篮球杯",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    h: common_vendor.p({
      title: "全国大学生数学建模竞赛",
      ["sub-title"]: "数学建模",
      extra: "数学建模比赛",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    i: common_vendor.p({
      title: "C类竞赛",
      ["sub-title"]: "一等奖：160 二等奖： 140 三等奖：120"
    }),
    j: common_vendor.p({
      title: "广东省大学生计算机设计大赛",
      ["sub-title"]: "计算机设计大赛",
      thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e564a22"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/competition/index.vue"]]);
wx.createPage(MiniProgramPage);

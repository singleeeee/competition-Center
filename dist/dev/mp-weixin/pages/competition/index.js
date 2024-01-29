"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card + _easycom_uni_popup)();
}
<<<<<<< HEAD
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
=======
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const navigateToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/competition/searchPage/index"
      });
    };
    const currentTab = common_vendor.ref(0);
    const tabList = [
      {
        text: "算法比赛"
      },
      {
        text: "开发比赛"
      },
      {
        text: "创新创业比赛"
      },
      {
        text: "设计比赛"
      },
      {
        text: "文学类比赛"
      },
      {
        text: "学科竞赛"
      },
      {
        text: "体育竞赛"
      }
    ];
    const tabTap = (e) => {
      currentTab.value = e.currentTarget.dataset.id;
    };
    const tagList = [
      {
        text: "近期"
      },
      {
        text: "往期"
      },
      {
        text: "热门"
      }
    ];
    const currentTag = common_vendor.ref(0);
    const tagTap = (e) => {
      currentTag.value = e.currentTarget.dataset.id;
    };
    const comPopup = common_vendor.ref();
    const comArray = [
      "全部比赛",
      "算法比赛",
      "开发比赛",
      "创新创业比赛",
      "设计比赛",
      "文学类比赛",
      "学科竞赛",
      "体育竞赛"
    ];
    const comValue = common_vendor.ref([0]);
    const comSelectd = common_vendor.ref(comArray[0]);
    const comChange = (e) => {
      const val = e.detail.value;
      comSelectd.value = comArray[val[0]];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          color: "#888",
          size: "20"
        }),
        b: common_vendor.o(navigateToSearch),
        c: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index,
            c: currentTab.value === index ? 1 : "",
            d: index,
            e: common_vendor.o(tabTap, index)
          };
        }),
        d: common_vendor.f(tagList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: index,
            c: currentTag.value === index ? 1 : "",
            d: index,
            e: common_vendor.o(tagTap, index)
          };
        }),
        e: common_vendor.t(comSelectd.value),
        f: common_vendor.p({
          type: "right",
          color: "",
          size: "12"
        }),
        g: common_vendor.o(($event) => comPopup.value.open("bottom")),
        h: common_vendor.p({
          title: "互联网+",
          ["sub-title"]: "中国国际“互联网+”大学生创新创业大赛",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        i: common_vendor.p({
          title: "挑战杯",
          ["sub-title"]: "“挑战杯”全国大学生课外学术科技作品竞赛",
          extra: "大挑",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        j: common_vendor.p({
          title: "挑战杯",
          ["sub-title"]: "“挑战杯”中国大学生创业大赛",
          extra: "小挑",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        k: common_vendor.p({
          title: "国际大学生程序设计竞赛",
          ["sub-title"]: "算法比赛",
          extra: "ICPC",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        l: common_vendor.p({
          title: "蓝桥杯全国软件和信息技术专业人才大赛",
          ["sub-title"]: "算法比赛",
          extra: "篮球杯",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        m: common_vendor.p({
          title: "全国大学生数学建模竞赛",
          ["sub-title"]: "数学建模",
          extra: "数学建模比赛",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        n: common_vendor.p({
          title: "广东省大学生计算机设计大赛",
          ["sub-title"]: "计算机设计大赛",
          thumbnail: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        o: common_vendor.f(comArray, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        p: comValue.value,
        q: common_vendor.o(comChange),
        r: common_vendor.sr(comPopup, "3e564a22-9", {
          "k": "comPopup"
        }),
        s: common_vendor.p({
          ["background-color"]: "#fff"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e564a22"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/competition/index.vue"]]);
>>>>>>> 779574a9ca85c970ff9ea3991066701a7d87eabe
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  (_easycom_uni_notice_bar2 + _easycom_uni_swiper_dot2)();
}
const _easycom_uni_notice_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_swiper_dot = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_swiper_dot + news)();
}
const news = () => "./components/news.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const swiperDataList = common_vendor.ref([
      {
        url: "https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-02-02/InternetFight.jpg",
        content: "360数科攻防演练"
      },
      {
        url: "https://5b0988e595225.cdn.sohucs.com/images/20190523/eae348313a854e0a8c3e4afec86975f9.jpeg",
        content: "挑战杯"
      },
      {
        url: "https://math.lcu.edu.cn/images/content/2022-09/20220915231221799458.png",
        content: "全国大学生数学建模比赛"
      }
    ]);
    const swiperChange = (e) => {
      currentImg.value = e.detail.current;
    };
    const currentImg = common_vendor.ref(0);
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
        c: common_vendor.f(swiperDataList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: index
          };
        }),
        d: common_vendor.unref(marginTop) + "rpx",
        e: common_vendor.o(swiperChange),
        f: common_vendor.p({
          info: swiperDataList.value,
          current: currentImg.value,
          mode: "nav",
          field: "content"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b8b30bc"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/find/index.vue"]]);
wx.createPage(MiniProgramPage);

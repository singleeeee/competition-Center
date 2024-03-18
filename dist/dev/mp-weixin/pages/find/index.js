"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/userInfoStore.js");
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
    common_vendor.onLoad(() => {
      getSwiperData();
    });
    const newsRef = common_vendor.ref();
    common_vendor.onPullDownRefresh(async () => {
      newsRef.value.notificationListInit();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    common_vendor.onReachBottom(() => {
      newsRef.value.getNotificationList();
    });
    const getSwiperData = async () => {
      const {
        data: { list }
      } = await utils_http.http({
        url: "/app/manager/getHomePictureList"
      });
      for (let i = 0; i < list.length; i++) {
        swiperDataList.value.push({
          content: list[i].disInfo.disTitle.slice(0, 22) + "...",
          disId: list[i].disId,
          url: list[i].pictureUrl
        });
      }
    };
    const handleSwiperTap = (disId) => {
      common_vendor.index.navigateTo({
        url: `/subpackage/postDetail/index?disId=${disId}`
      });
    };
    const swiperDataList = common_vendor.ref([]);
    const swiperChange = (e) => {
      currentImg.value = e.detail.current;
    };
    const currentImg = common_vendor.ref(0);
    const clickItem = (e) => {
      currentImg.value = e;
    };
    let marginTop = common_vendor.ref(80);
    const closeNoticebar = () => {
      marginTop.value = 0;
      console.log(marginTop.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(closeNoticebar),
        b: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          showClose: true,
          text: "为了备战2024年的蓝桥杯与团体程序设计天梯赛，我们特别组织了这次算法集训队！ 这是一个绝佳的机会，让我们共同努力，为即将到来的挑战做好准备，提升我们的编程和算法技能！"
        }),
        c: swiperDataList.value.length > 0
      }, swiperDataList.value.length > 0 ? {
        d: common_vendor.f(swiperDataList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: index,
            c: common_vendor.o(($event) => handleSwiperTap(item.disId), index)
          };
        }),
        e: common_vendor.unref(marginTop) + "rpx",
        f: common_vendor.o(swiperChange),
        g: common_vendor.o(clickItem),
        h: common_vendor.p({
          info: swiperDataList.value,
          current: currentImg.value,
          mode: "nav",
          field: "content"
        })
      } : {}, {
        i: common_vendor.sr(newsRef, "1b8b30bc-2", {
          "k": "newsRef"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b8b30bc"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/find/index.vue"]]);
wx.createPage(MiniProgramPage);

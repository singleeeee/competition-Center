"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/userInfoStore.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      getCompetitionList();
    });
    const currentComPage = 0;
    const comPageSize = 20;
    const comList = common_vendor.ref([]);
    const getCompetitionList = async () => {
      const res = await utils_http.http({
        url: "/app/com/getComInfoList",
        data: {
          page: currentComPage,
          pageSize: comPageSize
        }
      });
      const resData = res.data.list;
      for (let i = 0; i < resData.length; i++) {
        comList.value.push(resData[i]);
      }
    };
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
        h: common_vendor.f(comList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.comIntroduction),
            b: "3e564a22-2-" + i0,
            c: common_vendor.p({
              title: item.comTitle,
              ["sub-title"]: item.comSubTitle,
              thumbnail: item.comPicture
            }),
            d: index
          };
        }),
        i: common_vendor.f(comArray, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        j: comValue.value,
        k: common_vendor.o(comChange),
        l: common_vendor.sr(comPopup, "3e564a22-3", {
          "k": "comPopup"
        }),
        m: common_vendor.p({
          ["background-color"]: "#fff"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e564a22"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/competition/index.vue"]]);
wx.createPage(MiniProgramPage);

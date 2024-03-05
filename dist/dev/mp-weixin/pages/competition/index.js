"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/userInfoStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_load_more2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card + _easycom_uni_load_more + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(async () => {
      await getComType();
      await getAllCom();
    });
    const navigateToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/competition/searchPage/index"
      });
    };
    const getComType = async () => {
      comTypeList.value = [];
      const res = await utils_http.http({
        url: "http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic",
        data: {
          page: 1,
          pageSize: 100,
          sysDictionaryID: 9
        }
      });
      comTypeList.value.push({
        ID: 1,
        label: "全部比赛"
      });
      comArray.value.push({
        ID: 1,
        label: "全部比赛"
      });
      for (let i = 0; i < res.data.list.length; i++) {
        comTypeList.value.push(res.data.list[i]);
        comArray.value.push(res.data.list[i]);
      }
    };
    const getAllCom = async () => {
      const res = await utils_http.http({
        url: "/app/com/getComInfoList",
        data: {
          sort: "com_hot",
          order: "descending"
        }
      });
      comList.value = [];
      const resData = res.data.list;
      if (res.data.total <= currentComPage * comPageSize) {
        comListStatus.value = "noMore";
      }
      for (let i = 0; i < resData.length; i++) {
        comList.value.push(resData[i]);
      }
    };
    let currentComPage = 1;
    const comPageSize = 5;
    const comList = common_vendor.ref([]);
    const getCompetitionList = async (comType) => {
      if (currentComPage === 1) {
        comList.value = [];
      }
      const res = await utils_http.http({
        url: "/app/com/getComInfoList",
        data: {
          comType,
          page: currentComPage,
          pageSize: comPageSize,
          sort: "com_hot",
          order: "descending"
        }
      });
      const resData = res.data.list;
      if (res.data.total <= currentComPage * comPageSize) {
        comListStatus.value = "noMore";
      }
      if (resData.length === 0) {
        loadingStatus.value = "noMore";
        return;
      }
      currentComPage++;
      for (let i = 0; i < resData.length; i++) {
        comList.value.push(resData[i]);
      }
    };
    const currentTab = common_vendor.ref(0);
    const comTypeList = common_vendor.ref([
      {
        ID: 0,
        label: "暂无数据"
      }
    ]);
    let loadingStatus = common_vendor.ref("loading");
    const tabTap = (e) => {
      currentComPage = 1;
      currentTab.value = e.currentTarget.dataset.id;
      const index = currentTab.value;
      if (index !== 0) {
        getCompetitionList(comTypeList.value[index].value);
      } else {
        getAllCom();
      }
    };
    let comListStatus = common_vendor.ref("more");
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
    const comArray = common_vendor.ref([]);
    const comValue = common_vendor.ref([0]);
    const comSelectd = common_vendor.ref(comArray.value[0]);
    const comChange = (e) => {
      const val = e.detail.value;
      comSelectd.value = comArray.value[val[0]].label;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "search",
          color: "#888",
          size: "20"
        }),
        b: common_vendor.o(navigateToSearch),
        c: common_vendor.f(comTypeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.ID,
            c: currentTab.value === index ? 1 : "",
            d: index,
            e: common_vendor.o(tabTap, item.ID)
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
        h: comList.value.length > 0
      }, comList.value.length > 0 ? {
        i: common_vendor.f(comList.value, (item, index, i0) => {
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
        j: common_vendor.p({
          status: common_vendor.unref(comListStatus),
          contentText: {
            contentrefresh: "比赛信息加载中...",
            contentnomore: "没有更多比赛信息了"
          }
        })
      } : {
        k: common_vendor.p({
          iconType: "circle",
          status: common_vendor.unref(loadingStatus),
          contentText: {
            contentrefresh: " ",
            contentnomore: "暂无比赛数据"
          }
        })
      }, {
        l: common_vendor.f(comArray.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index
          };
        }),
        m: comValue.value,
        n: common_vendor.o(comChange),
        o: common_vendor.sr(comPopup, "3e564a22-5", {
          "k": "comPopup"
        }),
        p: common_vendor.p({
          ["background-color"]: "#fff"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e564a22"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/competition/index.vue"]]);
wx.createPage(MiniProgramPage);

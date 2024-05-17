"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
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
const comPageSize = 5;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(async () => {
      await getComType();
      await getSelectCom();
      await getComStatus();
      await getCompetitionList();
    });
    const navigateToComDetail = (comID) => {
      console.log(comID);
      common_vendor.index.navigateTo({
        url: "/subpackage/comDetail/index?comID=" + comID
      });
    };
    const navigateToSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/competition/searchPage/index"
      });
    };
    const getComType = async () => {
      comTypeList.value = [];
      const res = await utils_http.http({
        url: "/app/manager/getSysDictionaryDetailListPublic",
        data: {
          sysDictionaryID: 9
        }
      });
      for (let i = 0; i < res.data.length; i++) {
        comTypeList.value.push(res.data[i]);
      }
    };
    const getComStatus = async () => {
      comStatusList.value = [];
      const res = await utils_http.http({
        url: "/app/manager/getSysDictionaryDetailListPublic",
        data: {
          sysDictionaryID: 12
        }
      });
      for (let i = 0; i < res.data.length; i++) {
        comStatusList.value.push(res.data[i]);
      }
      console.log(comStatusList.value, "比赛进行状态");
    };
    let currentComPage = 1;
    const comList = common_vendor.ref([]);
    let currentComType = 0, currentComModel = 0, currentComStatus = 0;
    let loadingStatus = common_vendor.ref("loading");
    const getCompetitionList = async () => {
      if (currentComPage === 1) {
        comList.value = [];
      }
      const res = await utils_http.http({
        url: "/app/com/getComInfoList",
        data: {
          comType: currentComType,
          // 筛选的比赛类别
          comModel: currentComModel,
          // 筛选的比赛等级
          comStatus: currentComStatus,
          // 筛选的比赛状态
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
    const comTypeChange = (e) => {
      currentComPage = 1;
      currentTab.value = e.currentTarget.dataset.id;
      currentComType = comTypeList.value[currentTab.value].value;
      const index = currentTab.value;
      getCompetitionList(comTypeList.value[index].value);
    };
    let comListStatus = common_vendor.ref("more");
    const comStatusList = common_vendor.ref([]);
    const currentTag = common_vendor.ref(0);
    const comStatusChange = (e) => {
      currentComPage = 1;
      currentTag.value = e.currentTarget.dataset.id;
      currentComStatus = comStatusList.value[currentTag.value].value;
      getCompetitionList();
    };
    const comPopup = common_vendor.ref();
    const comSelectArray = common_vendor.ref([
      {
        ID: 1,
        label: "比赛等级",
        value: 0
      }
    ]);
    common_vendor.ref([]);
    common_vendor.ref(0);
    const comValue = common_vendor.ref([0]);
    const comSelected = common_vendor.ref(comSelectArray.value[0].label);
    const getSelectCom = async () => {
      comSelectArray.value = [];
      const res = await utils_http.http({
        url: "/app/manager/getSysDictionaryDetailListPublic",
        data: {
          sysDictionaryID: 8
        }
      });
      for (let i = 0; i < res.data.length; i++) {
        comSelectArray.value.push(res.data[i]);
      }
    };
    const comChange = (e) => {
      currentComPage = 1;
      const index = e.detail.value;
      comSelected.value = comSelectArray.value[index[0]].label;
      currentComModel = comSelectArray.value[index[0]].value;
      getCompetitionList();
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
            e: common_vendor.o(comTypeChange, item.ID)
          };
        }),
        d: common_vendor.f(comStatusList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.ID,
            c: currentTag.value === index ? 1 : "",
            d: index,
            e: common_vendor.o(comStatusChange, item.ID)
          };
        }),
        e: common_vendor.t(comSelected.value),
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
            d: index,
            e: common_vendor.o(($event) => navigateToComDetail(item.ID), index)
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
        l: common_vendor.f(comSelectArray.value, (item, index, i0) => {
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

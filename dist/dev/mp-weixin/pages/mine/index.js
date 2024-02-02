"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../stores/index.js");
const stores_modules_userInfoStore = require("../../stores/modules/userInfoStore.js");
require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_tag2 + _easycom_uni_icons2)();
}
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_icons + UnLog)();
}
const UnLog = () => "./components/UnLog.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      let userInfo2 = common_vendor.index.getStorageSync("UserInfo");
      if (userInfo2) {
        userInfo2 = JSON.parse(userInfo2);
        userInfo2 = userInfo2.userInfo;
        stores_modules_userInfoStore.useUserInfoStore().updateUserInfo(userInfo2);
        isHeadShow.value = true;
      } else {
        isHeadShow.value = false;
      }
    });
    common_vendor.onShow(() => {
      let userInfo2 = common_vendor.index.getStorageSync("UserInfo");
      if (userInfo2) {
        isHeadShow.value = true;
      } else {
        isHeadShow.value = false;
      }
    });
    const userInfoStore = stores_modules_userInfoStore.useUserInfoStore();
    const { userInfo } = common_vendor.storeToRefs(userInfoStore);
    const navigatetoPerson = () => {
      common_vendor.index.navigateTo({
        url: "/subpackage/personal_data/index"
      });
    };
    const navigatetoPersonPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/personPage/index"
      });
    };
    const configItems = [
      {
        id: 1,
        title: "我的奖项",
        icon: "medal"
      },
      {
        id: 2,
        title: "我的队伍",
        icon: "flag"
      },
      {
        id: 3,
        title: "参赛报名",
        icon: "paperplane"
      },
      {
        id: 4,
        title: "我的经历",
        icon: "person"
      },
      {
        id: 5,
        title: "联系客服",
        icon: "headphones"
      },
      {
        id: 6,
        title: "更多设置",
        icon: "gear"
      },
      {
        id: 7,
        title: "关于",
        icon: "redo"
      }
    ];
    let isHeadShow = common_vendor.ref(false);
    const changeIsLog = (val) => {
      isHeadShow.value = val;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isHeadShow)
      }, common_vendor.unref(isHeadShow) ? {
        b: common_vendor.unref(userInfo).userAvatarUrl,
        c: common_vendor.t(common_vendor.unref(userInfo).userNickname),
        d: common_vendor.p({
          text: "大二",
          circle: true,
          type: "primary",
          size: "small"
        }),
        e: common_vendor.p({
          text: "厨子",
          circle: true,
          type: "primary",
          size: "small"
        }),
        f: common_vendor.p({
          text: "铜牌",
          circle: true,
          type: "primary",
          size: "small"
        }),
        g: common_vendor.o(navigatetoPersonPage),
        h: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "20"
        }),
        i: common_vendor.o(navigatetoPerson)
      } : {
        j: common_vendor.o(changeIsLog)
      }, {
        k: common_vendor.t(common_vendor.unref(userInfo).loveNumber || 0),
        l: common_assets._imports_0,
        m: common_assets._imports_1,
        n: common_assets._imports_2,
        o: common_assets._imports_3,
        p: common_assets._imports_4,
        q: common_assets._imports_5,
        r: common_assets._imports_6,
        s: common_assets._imports_7,
        t: common_vendor.f(configItems, (item, k0, i0) => {
          return {
            a: "9023ef44-5-" + i0,
            b: common_vendor.p({
              type: item.icon,
              color: "",
              size: "24"
            }),
            c: common_vendor.t(item.title),
            d: "9023ef44-6-" + i0,
            e: item.id
          };
        }),
        v: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "18"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);

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
    const userInfoStore = stores_modules_userInfoStore.useUserInfoStore();
    const { userInfo } = common_vendor.storeToRefs(userInfoStore);
    let tagList = common_vendor.ref([]);
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
        userInfo2 = JSON.parse(userInfo2);
        userInfo2 = userInfo2.userInfo;
        for (let i = 0; i < tagList.value.length; i++)
          tagList.value.pop();
        if (userInfo2.userLabel.includes("-")) {
          tagList.value = userInfo2.userLabel.split("-");
        } else if (userInfo2.userLabel !== "")
          tagList.value.push(userInfo2.userLabel);
        isHeadShow.value = true;
      } else {
        stores_modules_userInfoStore.useUserInfoStore();
        for (let i = 0; i < tagList.value.length; i++)
          tagList.value.pop();
        isHeadShow.value = false;
      }
    });
    common_vendor.onPullDownRefresh(() => {
      console.log("刷新");
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
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
    const navigateTo = (target) => {
      common_vendor.index.navigateTo({
        url: `/subpackage/${target}/index`
      });
    };
    const switchTab = (target) => {
      common_vendor.index.navigateTo({ url: `/pages/mine/${target}/index` });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isHeadShow)
      }, common_vendor.unref(isHeadShow) ? common_vendor.e({
        b: common_vendor.unref(userInfo).userAvatarUrl,
        c: common_vendor.t(common_vendor.unref(userInfo).userNickname),
        d: common_vendor.unref(tagList).length > 0
      }, common_vendor.unref(tagList).length > 0 ? {
        e: common_vendor.f(common_vendor.unref(tagList), (item, index, i0) => {
          return {
            a: index,
            b: "9023ef44-0-" + i0,
            c: common_vendor.p({
              text: item,
              circle: true,
              type: "primary",
              size: "small"
            })
          };
        })
      } : {
        f: common_vendor.p({
          text: "暂无标签",
          circle: true,
          type: "primary",
          size: "small"
        })
      }, {
        g: common_vendor.o(navigatetoPersonPage),
        h: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "20"
        }),
        i: common_vendor.o(navigatetoPerson)
      }) : {
        j: common_vendor.o(changeIsLog)
      }, {
        k: common_vendor.t(common_vendor.unref(userInfo).loveNumber || 0),
        l: common_vendor.t(common_vendor.unref(userInfo).followerNumber || 0),
        m: common_vendor.t(common_vendor.unref(userInfo).fansNumber || 0),
        n: common_assets._imports_0,
        o: common_vendor.o(($event) => navigateTo("myCollection")),
        p: common_assets._imports_1,
        q: common_vendor.o(($event) => navigateTo("subscribe")),
        r: common_assets._imports_2,
        s: common_vendor.o(($event) => navigateTo("fans_friends")),
        t: common_assets._imports_3,
        v: common_vendor.o(($event) => navigateTo("fans_friends")),
        w: common_assets._imports_4,
        x: common_assets._imports_5,
        y: common_vendor.o(($event) => navigateTo("PostWriting")),
        z: common_assets._imports_6,
        A: common_vendor.o(($event) => switchTab("personPage")),
        B: common_assets._imports_7,
        C: common_vendor.f(configItems, (item, k0, i0) => {
          return {
            a: "9023ef44-4-" + i0,
            b: common_vendor.p({
              type: item.icon,
              color: "",
              size: "24"
            }),
            c: common_vendor.t(item.title),
            d: "9023ef44-5-" + i0,
            e: item.id
          };
        }),
        D: common_vendor.p({
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

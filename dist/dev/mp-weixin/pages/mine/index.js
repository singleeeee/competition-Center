"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../stores/index.js");
const utils_http = require("../../utils/http.js");
const stores_modules_userInfoStore = require("../../stores/modules/userInfoStore.js");
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
    let isHeadShow = common_vendor.ref(true);
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
      formatLabel();
      if (userInfo.value.token) {
        isHeadShow.value = true;
      } else {
        isHeadShow.value = false;
      }
    });
    const formatLabel = () => {
      if (userInfo.value) {
        for (let i = 0; i < tagList.value.length; i++)
          tagList.value.pop();
        if (userInfo.value.userLabel.includes("-")) {
          tagList.value = userInfo.value.userLabel.split("-");
        } else if (userInfo.value.userLabel !== "") {
          tagList.value.push(userInfo.value.userLabel);
        } else {
          for (let i = 0; i < tagList.value.length; i++)
            tagList.value.pop();
        }
      } else {
        isHeadShow.value = false;
      }
    };
    common_vendor.onPullDownRefresh(async () => {
      console.log("下拉刷新");
      const res = await utils_http.http({
        url: `/app/user/getUserInfoByid?ID=${userInfo.value.ID}`
      });
      console.log("刷新返回的数据", res.data.reuserData);
      userInfoStore.updateUserInfo(res.data.reuserData);
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    const navigatetoPerson = () => {
      common_vendor.index.navigateTo({
        url: "/subpackage/personal_data/index"
      });
    };
    const configItems = [
      {
        id: 1,
        title: "我的奖项",
        icon: "medal",
        url: "myMedal"
      },
      {
        id: 2,
        title: "我的队伍",
        icon: "flag",
        url: "myTeam"
      },
      {
        id: 3,
        title: "参赛报名",
        icon: "paperplane",
        url: "myTeam"
      },
      {
        id: 4,
        title: "我的经历",
        icon: "person",
        url: "myExperience"
      },
      {
        id: 5,
        title: "联系客服",
        icon: "headphones",
        url: "customerService"
      },
      {
        id: 6,
        title: "更多设置",
        icon: "gear",
        url: "moreSetting"
      },
      {
        id: 7,
        title: "关于我们",
        icon: "redo",
        url: "aboutUs"
      }
    ];
    const changeIsLog = (val) => {
      formatLabel();
      isHeadShow.value = val;
    };
    const navigateTo = (target) => {
      if (target === "customerService" || target === "moreSetting") {
        common_vendor.index.showToast({
          title: "暂未开放",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/subpackage/${target}/index`
      });
    };
    const switchTab = (target) => {
      common_vendor.index.navigateTo({ url: `/pages/mine/${target}/index?userID=${userInfo.value.ID}` });
    };
    const onClickImg = (tempFilePaths) => {
      let fileUrlArray = [tempFilePaths];
      common_vendor.index.previewImage({
        urls: fileUrlArray,
        success: (result) => {
        },
        fail: (error) => {
          console.log(error);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isHeadShow)
      }, common_vendor.unref(isHeadShow) ? common_vendor.e({
        b: common_vendor.o(($event) => onClickImg(common_vendor.unref(userInfo).userAvatarUrl)),
        c: common_vendor.unref(userInfo).userAvatarUrl,
        d: common_vendor.t(common_vendor.unref(userInfo).userNickname),
        e: common_vendor.unref(tagList).length > 0
      }, common_vendor.unref(tagList).length > 0 ? {
        f: common_vendor.f(common_vendor.unref(tagList), (item, index, i0) => {
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
        g: common_vendor.p({
          text: "暂无标签",
          circle: true,
          type: "primary",
          size: "small"
        })
      }, {
        h: common_vendor.o(navigatetoPerson),
        i: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "20"
        })
      }) : {
        j: common_vendor.o(changeIsLog)
      }, {
        k: common_vendor.t(common_vendor.unref(userInfo).loveNumber || 0),
        l: common_vendor.t(common_vendor.unref(userInfo).followerNumber || 0),
        m: common_vendor.o(($event) => navigateTo("myFollowers")),
        n: common_vendor.t(common_vendor.unref(userInfo).fansNumber || 0),
        o: common_vendor.o(($event) => navigateTo("myFriends")),
        p: common_assets._imports_0,
        q: common_vendor.o(($event) => navigateTo("myCollection")),
        r: common_assets._imports_1,
        s: common_vendor.o(($event) => navigateTo("subscribe")),
        t: common_assets._imports_2,
        v: common_vendor.o(($event) => navigateTo("myFollowers")),
        w: common_assets._imports_3,
        x: common_vendor.o(($event) => navigateTo("myFriends")),
        y: common_assets._imports_4,
        z: common_assets._imports_5,
        A: common_vendor.o(($event) => navigateTo("PostWriting")),
        B: common_assets._imports_6,
        C: common_vendor.o(($event) => switchTab("personPage")),
        D: common_assets._imports_7,
        E: common_vendor.o(($event) => navigateTo("postManage")),
        F: common_vendor.f(configItems, (item, k0, i0) => {
          return {
            a: "9023ef44-4-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "24"
            }),
            c: common_vendor.t(item.title),
            d: "9023ef44-5-" + i0,
            e: item.id,
            f: common_vendor.o(($event) => navigateTo(item.url), item.id)
          };
        }),
        G: common_vendor.p({
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

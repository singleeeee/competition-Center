"use strict";
const common_vendor = require("../../common/vendor.js");
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
  (_easycom_uni_tag + UnLog + _easycom_uni_icons)();
}
const UnLog = () => "./components/UnLog.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfoStore = stores_modules_userInfoStore.useUserInfoStore();
    const { userInfo } = common_vendor.storeToRefs(userInfoStore);
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
    let tagList = common_vendor.ref([]);
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
      common_vendor.index.stopPullDownRefresh();
    });
    const navigatetoPerson = () => {
      common_vendor.index.navigateTo({
        url: "/subpackage/personal_data/index"
      });
    };
    let isHeadShow = common_vendor.ref(true);
    const changeIsLog = (val) => {
      formatLabel();
      isHeadShow.value = val;
    };
    const navigateTo = (target) => {
      common_vendor.index.navigateTo({
        url: `/subpackage/${target}/index`
      });
    };
    const switchToPersonPage = () => {
      common_vendor.index.navigateTo({ url: `/pages/mine/personPage/index?userID=${userInfo.value.ID}` });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isHeadShow)
      }, common_vendor.unref(isHeadShow) ? {
        b: common_vendor.o(navigatetoPerson),
        c: common_vendor.unref(userInfo).userAvatarUrl,
        d: common_vendor.t(common_vendor.unref(userInfo).userNickname),
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
        }),
        f: common_vendor.t(common_vendor.unref(userInfo).loveNumber),
        g: common_vendor.t(common_vendor.unref(userInfo).fansNumber),
        h: common_vendor.o(($event) => navigateTo("myFriends")),
        i: common_vendor.t(common_vendor.unref(userInfo).followerNumber),
        j: common_vendor.o(($event) => navigateTo("myFollowers"))
      } : {
        k: common_vendor.o(changeIsLog)
      }, {
        l: common_vendor.p({
          type: "star",
          size: "26"
        }),
        m: common_vendor.o(($event) => navigateTo("myCollection")),
        n: common_vendor.p({
          type: "calendar",
          size: "26"
        }),
        o: common_vendor.o(($event) => navigateTo("subscribe")),
        p: common_vendor.p({
          type: "compose",
          size: "26"
        }),
        q: common_vendor.o(($event) => navigateTo("PostWriting")),
        r: common_vendor.p({
          type: "eye",
          size: "26"
        }),
        s: common_vendor.o(($event) => navigateTo("postManage")),
        t: common_vendor.p({
          type: "person",
          size: "26"
        }),
        v: common_vendor.o(switchToPersonPage),
        w: common_vendor.p({
          type: "flag",
          size: "26"
        }),
        x: common_vendor.o(($event) => navigateTo("myTeam")),
        y: common_vendor.p({
          type: "videocam",
          size: "26"
        }),
        z: common_vendor.o(($event) => navigateTo("myExperience")),
        A: common_vendor.p({
          type: "info",
          size: "26"
        }),
        B: common_vendor.o(($event) => navigateTo("aboutUs")),
        C: common_vendor.p({
          type: "gear",
          size: "26"
        }),
        D: common_vendor.o(($event) => navigateTo("moreSetting"))
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"], ["__file", "E:/frontend/project/Competition-center/competition-Center/competition-Center/src/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);

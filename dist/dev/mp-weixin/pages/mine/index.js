"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_tag2 + _easycom_uni_icons2)();
}
const _easycom_uni_tag = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_icons + MyButton)();
}
const MyButton = () => "../../components/MyButton.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      isLogin: false,
      nickname: "",
      avatarUrl: ""
    });
    common_vendor.onShow(() => {
      const localUserInfo = common_vendor.index.getStorageSync("userInfo");
      if (localUserInfo) {
        userInfo.value = localUserInfo;
      } else {
        userInfo.value = {
          isLogin: false,
          nickname: "",
          avatarUrl: ""
        };
        loginAvatar = "";
      }
    });
    let loginAvatar = "";
    const onChooseavatar = (e) => {
      loginAvatar = "'" + e.detail.avatarUrl + "'";
      userInfo.value.avatarUrl = e.detail.avatarUrl;
    };
    const login = async () => {
      if (loginAvatar && userInfo.value.nickname) {
        await common_vendor.index.showLoading;
        userInfo.value.isLogin = true;
        common_vendor.index.setStorageSync("userInfo", userInfo.value);
      } else {
        console.log(userInfo.value);
        common_vendor.index.showToast({
          icon: "error",
          title: "头像和昵称"
        });
      }
    };
    const blur = (e) => {
      userInfo.value.nickname = e.detail.value;
    };
    const navigatetoPerson = () => {
      common_vendor.index.navigateTo({
        url: "/subpackage/personal_data/index"
      });
    };
    const configItems = [
      {
        id: 1,
        title: "我的奖项"
      },
      {
        id: 2,
        title: "我的队伍"
      },
      {
        id: 3,
        title: "参赛报名"
      },
      {
        id: 4,
        title: "我的经历"
      },
      {
        id: 5,
        title: "联系客服"
      },
      {
        id: 6,
        title: "更多设置"
      },
      {
        id: 7,
        title: "关于"
      }
    ];
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.isLogin
      }, userInfo.value.isLogin ? {
        b: userInfo.value.avatarUrl,
        c: common_vendor.t(userInfo.value.nickname),
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
        g: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "20"
        }),
        h: common_vendor.o(navigatetoPerson),
        i: common_assets._imports_0,
        j: common_assets._imports_1,
        k: common_assets._imports_2,
        l: common_assets._imports_3,
        m: common_assets._imports_4,
        n: common_assets._imports_5,
        o: common_assets._imports_6,
        p: common_assets._imports_7,
        q: common_vendor.f(configItems, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "9023ef44-4-" + i0,
            c: item.id
          };
        }),
        r: common_vendor.p({
          type: "right",
          color: "#ccc",
          size: "18"
        })
      } : common_vendor.e({
        s: !userInfo.value.avatarUrl
      }, !userInfo.value.avatarUrl ? {
        t: common_vendor.p({
          type: "person-filled",
          color: "#AFAFAF",
          size: "100"
        })
      } : {}, {
        v: common_vendor.o(onChooseavatar),
        w: "url(" + common_vendor.unref(loginAvatar) + ")",
        x: common_vendor.o(blur),
        y: userInfo.value.nickname,
        z: common_vendor.o(($event) => userInfo.value.nickname = $event.detail.value),
        A: common_vendor.o(login),
        B: common_vendor.p({
          content: "登录",
          backgroundcolor: "#12a66a"
        })
      }));
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);

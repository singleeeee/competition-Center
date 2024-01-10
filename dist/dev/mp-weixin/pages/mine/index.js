"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/index.js");
const stores_modules_member = require("../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const memberStore = stores_modules_member.useMemberStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(memberStore).setProfile({
          nickname: "用户33033"
        })),
        b: common_vendor.o(($event) => common_vendor.unref(memberStore).clearProfile())
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/前端/项目/竞赛中心助手/competition-Center/src/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);

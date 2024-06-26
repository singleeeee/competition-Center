"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http = require("../../utils/http.js");
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_fab2 + _easycom_uni_load_more2)();
}
const _easycom_uni_fab = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-fab/uni-fab.js";
const _easycom_uni_load_more = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_fab + card + _easycom_uni_load_more + friends + message)();
}
const friends = () => "./components/friends.js";
const message = () => "./components/message.js";
const card = () => "./components/card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad((options) => {
      const current = +(options == null ? void 0 : options.currentTab);
      currentPage.value = current || 0;
    });
    const fab = common_vendor.ref();
    const fabContent = [
      {
        iconPath: "/static/writing.png",
        selectedIconPath: "/static/writingSelected.png",
        text: "发布文章",
        active: false
      },
      {
        iconPath: "/static/manage.png",
        selectedIconPath: "/static/manageSelected.png",
        text: "内容管理",
        active: false
      }
    ];
    const trigger = (e) => {
      if (e.index === 0) {
        fabContent[e.index].active = !fabContent[e.index].active;
        common_vendor.index.navigateTo({ url: "/subpackage/PostWriting/index" });
      } else {
        fabContent[e.index].active = !fabContent[e.index].active;
        common_vendor.index.navigateTo({ url: "/subpackage/postManage/index" });
      }
    };
    const pattern = {
      color: "#7A7E83",
      backgroundColor: "#fff",
      selectedColor: "#007AFF",
      buttonColor: "#007AFF",
      iconColor: "#fff"
    };
    let windowHeight = 0;
    (() => {
      const deviceInfo = common_vendor.index.getWindowInfo();
      windowHeight = deviceInfo == null ? void 0 : deviceInfo.windowHeight;
    })();
    const onReachBottom = () => {
      loadingStatus.value = "loading";
      currentPageNum.value++;
      getPostList();
    };
    let loadingStatus = common_vendor.ref("more");
    let pulldownTriggered = common_vendor.ref(false);
    const pulldownRefresh = async () => {
      pulldownTriggered.value = true;
      postList.value = [];
      currentPageNum.value = 1;
      getPostList();
      setTimeout(function() {
        pulldownTriggered.value = false;
      }, 1e3);
    };
    let postList = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      getPostList();
    });
    const currentPageNum = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    let total = common_vendor.ref(0);
    const getPostList = async () => {
      if (currentPageNum.value === 1)
        postList.value = [];
      const dataList = common_vendor.ref([]);
      const res = await utils_http.http({
        url: `/app/dis/getDisInfoList`,
        data: {
          disStatus: 2,
          page: currentPageNum.value,
          pageSize: pageSize.value
        }
      });
      total.value = res.data.total;
      dataList.value = res.data.list;
      setTimeout(() => {
        for (let i = 0; i < dataList.value.length; i++) {
          const data = new Date(dataList.value[i].CreatedAt);
          const year = data.getFullYear();
          const month = data.getMonth() + 1;
          const day = data.getDate();
          const time = `${year}/${month}/${day}`;
          const obj = {
            ID: dataList.value[i].ID,
            // 帖子ID
            isLiked: dataList.value[i].isLiked,
            // 帖子是否被点赞
            isCollected: dataList.value[i].isCollected,
            // 帖子是否被收藏
            disComId: dataList.value[i].disComId,
            // 关联的比赛ID
            title: dataList.value[i].disTitle,
            // 帖子标题
            content: dataList.value[i].disContent,
            // 帖子内容
            time,
            // 帖子发布时间
            collectedNum: dataList.value[i].disCollectNumber,
            // 帖子被收藏数量
            likedNum: dataList.value[i].disLoveNumber,
            // 帖子被点赞数量
            userInfoID: dataList.value[i].userInfo.ID,
            // 帖子作者的ID
            author: dataList.value[i].userInfo.userNickname,
            // 帖子作者昵称
            avatarUrl: dataList.value[i].userInfo.userAvatarUrl,
            // 帖子作者头像
            imageUrl: dataList.value[i].disPicture || [],
            // 帖子首页展示图片，只展示第一张
            disCommentNum: dataList.value[i].disCommentNumber,
            // 帖子被评论数量
            disLookNum: dataList.value[i].disLookNumber
            // 帖子被浏览数量
          };
          postList.value.push(obj);
        }
        if (currentPageNum.value * pageSize.value >= total.value) {
          loadingStatus.value = "nomore";
          return;
        }
        loadingStatus.value = "more";
      }, 1e3);
    };
    const likedChange = async (val, index) => {
      if (val) {
        utils_http.http({
          url: "/app/dis/userLikeDis",
          data: {
            ID: postList.value[index].ID,
            // 帖子ID
            likeUserID: postList.value[index].userInfoID
            // 帖子作者的ID
          }
        });
        postList.value[index].isLiked = true;
        postList.value[index].likedNum++;
      } else {
        utils_http.http({
          url: `/app/dis/userUnLikeDis?ID=${postList.value[index].ID}&dislikeUserID=${postList.value[index].userInfoID}`,
          method: "DELETE"
        });
        postList.value[index].isLiked = false;
        postList.value[index].likedNum--;
      }
    };
    const collectedChange = async (val, index) => {
      if (val) {
        utils_http.http({
          url: "/app/dis/userCollectDis",
          data: {
            disID: postList.value[index].ID
          }
        });
        postList.value[index].isCollected = true;
        postList.value[index].collectedNum++;
      } else {
        utils_http.http({
          url: `/app/dis/userCancelCollectDis?disID=${postList.value[index].ID}`,
          method: "DELETE"
        });
        postList.value[index].isCollected = false;
        postList.value[index].collectedNum--;
      }
    };
    const switchToDetail = (index) => {
      common_vendor.index.navigateTo({
        url: `/subpackage/postDetail/index?disId=${postList.value[index].ID}`
      });
    };
    let currentPage = common_vendor.ref(0);
    const swiperChange = (e) => {
      currentPage.value = e.detail.current;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr(fab, "485a05f3-0", {
          "k": "fab"
        }),
        b: common_vendor.o(trigger),
        c: common_vendor.p({
          content: fabContent,
          pattern,
          horizontal: "right",
          vertical: "bottom",
          direction: "horizontal"
        }),
        d: common_vendor.unref(currentPage) === 0 ? 1 : "",
        e: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 0 : currentPage = 0),
        f: common_vendor.unref(currentPage) === 1 ? 1 : "",
        g: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 1 : currentPage = 1),
        h: common_vendor.unref(currentPage) === 2 ? 1 : "",
        i: common_vendor.o(($event) => common_vendor.isRef(currentPage) ? currentPage.value = 2 : currentPage = 2),
        j: common_vendor.unref(postList).length > 0
      }, common_vendor.unref(postList).length > 0 ? {
        k: common_vendor.f(common_vendor.unref(postList), (item, index, i0) => {
          return {
            a: index,
            b: index,
            c: common_vendor.o(likedChange, index),
            d: common_vendor.o(collectedChange, index),
            e: common_vendor.o(switchToDetail, index),
            f: "485a05f3-1-" + i0,
            g: common_vendor.p({
              author: item.author,
              title: item.title,
              content: item.content,
              time: item.time,
              ["avatar-url"]: item.avatarUrl,
              imageUrl: item.imageUrl[0],
              ["collected-num"]: item.collectedNum,
              ["comment-num"]: item.disCommentNum,
              ["liked-num"]: item.likedNum,
              isLiked: item.isLiked,
              isCollected: item.isCollected,
              id: index,
              [";"]: true
            })
          };
        }),
        l: common_vendor.p({
          status: common_vendor.unref(loadingStatus),
          iconType: "circle"
        })
      } : {
        m: common_vendor.p({
          status: "loading",
          iconType: "circle"
        })
      }, {
        n: common_vendor.unref(windowHeight) - 50 + "px",
        o: common_vendor.o(pulldownRefresh),
        p: common_vendor.unref(pulldownTriggered),
        q: common_vendor.o(onReachBottom),
        r: common_vendor.unref(windowHeight) - 50 + "px",
        s: common_vendor.o(swiperChange),
        t: common_vendor.unref(currentPage)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-485a05f3"], ["__file", "E:/frontend/project/Competition-center/competition-Center/src/pages/community/index.vue"]]);
wx.createPage(MiniProgramPage);

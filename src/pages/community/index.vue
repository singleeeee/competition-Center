<template>
  <view class="container">
    <!-- tab栏切换 -->
    <view class="topTab">
      <view :class="{ item: true, active: currentPage === 0 }" @tap="currentPage = 0">大厅</view>
      <view :class="{ item: true, active: currentPage === 1 }" @tap="currentPage = 1">好友</view>
      <view :class="{ item: true, active: currentPage === 2 }" @tap="currentPage = 2">信息</view>
    </view>
    <!-- 滑动内容 -->
    <swiper
      :style="{ height: windowHeight - 50 + 'px' }"
      class="swiper"
      @change="swiperChange"
      :current="currentPage"
    >
      <!-- 大厅 -->
      <swiper-item>
        <scroll-view
          :style="{ height: windowHeight - 50 + 'px' }"
          scroll-y
          @refresherrefresh="pulldownRefresh"
          :refresher-triggered="pulldownTriggered"
          :refresher-threshold="50"
          :refresher-enabled="true"
          @scrolltolower="onReachBottom"
        >
          <!-- <view class="hall">
            <topic title="热门帖子" ref="topicRef" @handleSkeletonShow="handleSkeletonShow"></topic>
          </view> -->

          <!-- 帖子列表 -->
          <template v-if="postList.length > 0">
            <card
              v-for="(item, index) in postList"
              :key="index"
              :author="item.author"
              :title="item.title"
              :content="item.content"
              :time="item.time"
              :avatar-url="item.avatarUrl"
              :imageUrl="item.imageUrl[0]"
              :collected-num="item.collectedNum"
              :comment-num="item.disCommentNum"
              :liked-num="item.likedNum"
              :isLiked="item.isLiked"
              :isCollected="item.isCollected"
              :id="index"
              @liked-change="likedChange"
              ;
              @collected-change="collectedChange"
              @switchToDetail="switchToDetail"
            ></card>
            <view style="background-color: #f1f1f3">
              <uni-load-more :status="loadingStatus" iconType="circle" />
            </view>
          </template>
          <template v-else>
            <view style="text-align: center">
              <uni-load-more status="loading" iconType="circle" />
            </view>
          </template>
        </scroll-view>
      </swiper-item>
      <!-- 好友 -->
      <swiper-item>
        <view class="friends">
          <friends></friends>
        </view>
      </swiper-item>
      <!-- 信息 -->
      <swiper-item>
        <view class="information">
          <message></message>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script lang="ts" setup>
// import topic from './components/topic.vue'
// 控制骨架屏显示
// let isSkeletonShow = ref(false)
// 显示骨架屏
// let handleSkeletonShow = (boolean: boolean) => {
//   isSkeletonShow.value = boolean
// }
import friends from './components/friends.vue'
import { ref, onMounted } from 'vue'
import message from './components/message.vue'
import card from './components/card.vue'
import { http } from '@/utils/http'
import type { PostList } from '@/types/global'
import { onLoad } from '@dcloudio/uni-app'
onLoad((options) => {
  const current = +options?.currentTab
  currentPage.value = current || 0
})

// 获取可用屏幕高度
let windowHeight = 0
;(() => {
  const deviceInfo = uni.getWindowInfo()
  windowHeight = deviceInfo?.windowHeight
})()
// 上滑触底
const onReachBottom = () => {
  console.log('触底了')
  loadingStatus.value = 'loading'
  currentPageNum.value++
  getPostList()
}
// 下拉刷新的loading状态
let loadingStatus = ref('more')
// 控制下拉刷新
let pulldownTriggered = ref(false)
// 监听刷新事件
const pulldownRefresh = async () => {
  pulldownTriggered.value = true
  postList.value = []
  currentPageNum.value = 1
  getPostList()
  setTimeout(function () {
    pulldownTriggered.value = false
  }, 1000)
}
// 帖子列表
let postList = ref<PostList[]>([])
// 加载时
onMounted(() => {
  getPostList()
})
// 当前页数
const currentPageNum = ref(1)
// 当前页面大小
const pageSize = ref(5)
// 最大帖子数量
let total = ref(0)

// 获取帖子列表
const getPostList = async () => {
  if (currentPageNum.value === 1) postList.value = []
  // 返回的数据
  const dataList = ref<any>([])
  // 请求数据
  const res = await http({
    url: `/app/dis/getDisInfoList`,
    data: {
      disStatus: 2,
      page: currentPageNum.value,
      pageSize: pageSize.value,
    },
  })
  total.value = res.data.total
  dataList.value = (res.data as any).list
  // 处理需要的数据 用map失效？
  setTimeout(() => {
    for (let i = 0; i < dataList.value.length; i++) {
      // 处理时间
      const data = new Date((dataList.value[i] as any).CreatedAt)
      const year = data.getFullYear()
      const month = data.getMonth() + 1
      const day = data.getDate()
      const time = `${year}/${month}/${day}`
      // 最终格式
      const obj = {
        ID: dataList.value[i].ID, // 帖子ID
        isLiked: dataList.value[i].isLiked, // 帖子是否被点赞
        isCollected: dataList.value[i].isCollected, // 帖子是否被收藏
        disComId: dataList.value[i].disComId, // 关联的比赛ID
        title: dataList.value[i].disTitle, // 帖子标题
        content: dataList.value[i].disContent, // 帖子内容
        time, // 帖子发布时间
        collectedNum: dataList.value[i].disCollectNumber, // 帖子被收藏数量
        likedNum: dataList.value[i].disLoveNumber, // 帖子被点赞数量
        userInfoID: dataList.value[i].userInfo.ID, // 帖子作者的ID
        author: dataList.value[i].userInfo.userNickname, // 帖子作者昵称
        avatarUrl: dataList.value[i].userInfo.userAvatarUrl, // 帖子作者头像
        imageUrl: dataList.value[i].disPicture || [], // 帖子首页展示图片，只展示第一张
        disCommentNum: dataList.value[i].disCommentNumber, // 帖子被评论数量
        disLookNum: dataList.value[i].disLookNumber, // 帖子被浏览数量
      }
      // 存入数组
      postList.value.push(obj)
    }
    if (currentPageNum.value * pageSize.value >= total.value) {
      loadingStatus.value = 'nomore'
      return
    }
    loadingStatus.value = 'more'
  }, 1000)
}

// 点赞和取消点赞
const likedChange = async (val: boolean, index: number) => {
  if (val) {
    console.log('点赞')
    http({
      url: '/app/dis/userLikeDis',
      data: {
        ID: postList.value[index].ID, // 帖子ID
        likeUserID: postList.value[index].userInfoID, // 帖子作者的ID
      },
    })
    postList.value[index].isLiked = true
    postList.value[index].likedNum++
  } else {
    console.log('取消点赞')
    http({
      url: `/app/dis/userUnLikeDis?ID=${postList.value[index].ID}&dislikeUserID=${postList.value[index].userInfoID}`,
      method: 'DELETE',
    })
    postList.value[index].isLiked = false
    postList.value[index].likedNum--
  }
}
// 收藏
const collectedChange = async (val: boolean, index: number) => {
  if (val) {
    console.log('收藏')
    http({
      url: '/app/dis/userCollectDis',
      data: {
        disID: postList.value[index].ID,
      },
    })
    postList.value[index].isCollected = true
    postList.value[index].collectedNum++
  } else {
    console.log('取消收藏')
    http({
      url: `/app/dis/userCancelCollectDis?disID=${postList.value[index].ID}`,
      method: 'DELETE',
    })
    postList.value[index].isCollected = false
    postList.value[index].collectedNum--
  }
}
// 点击评论跳转到详情页
const switchToDetail = (index: number) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${postList.value[index].ID}`,
  })
}

//tab栏切换
let currentPage = ref(0)
const swiperChange = (e) => {
  currentPage.value = e.detail.current
}
</script>
<style scoped lang="scss">
.container {
  background-color: #eee;
  .swiper {
    margin-top: 100rpx;
    height: 92vh;
  }
  .topTab {
    position: fixed;
    top: 0;
    z-index: 999;
    height: 100rpx;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 1rpx 2rpx #eee;
    background-color: #fff;
    .item {
      width: 100%;
      color: #bbb;
      font-size: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
    }
  }
  .active {
    transform: scale(1.2);
    color: #000 !important;
    transition: all 0.2s ease;
    font-weight: 700;
  }
}
.fabButton {
  position: relative;
  z-index: 99;
  bottom: 400rpx;
  right: 100rpx;
  background-color: red;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
</style>

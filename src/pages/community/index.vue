<template>
  <view class="container" :style="`height:${windowHeight}*2 + 'rpx'`">
    <!-- tab栏切换 -->
    <view class="topTab">
      <view :class="{ item: true, active: currentPage === 0 }" @tap="currentPage = 0">大厅</view>
      <view :class="{ item: true, active: currentPage === 1 }" @tap="currentPage = 1">好友</view>
      <view :class="{ item: true, active: currentPage === 2 }" @tap="currentPage = 2">信息</view>
    </view>
    <!-- 滑动内容 -->
    <swiper
      class="swiper"
      :style="{ height: windowHeight * 2 - 40 + 'rpx' }"
      @change="swiperChange"
      :current="currentPage"
    >
      <!-- 大厅 -->
      <swiper-item>
        <scroll-view
          scroll-y
          :style="{ height: windowHeight * 2 - 40 + 'rpx' }"
          @refresherrefresh="pulldownRefresh"
          :refresher-triggered="pulldownTriggered"
          :refresher-threshold="50"
          :refresher-enabled="true"
        >
          <view class="hall">
            <topic title="热门比赛" :type="true" ref="topicRef"></topic>
            <topic title="热门帖子" :type="false" ref="postRef"></topic>
          </view>
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
import topic from './components/topic.vue'
import friends from './components/friends.vue'
import { ref } from 'vue'
import message from './components/message.vue'
// 控制下拉刷新
let pulldownTriggered = false
// 监听刷新事件
const pulldownRefresh = () => {
  if (!pulldownTriggered) {
    pulldownTriggered = true
    // topicRef.value.getComList()
    // topicRef.value.getCommentList()
    setTimeout(() => {
      pulldownTriggered = false
    }, 1000)
  }
}
// 子组件ref
const postRef = ref()
const topicRef = ref()
let windowHeight = 0
// 获取可用屏幕高度
;(() => {
  const deviceInfo = uni.getWindowInfo()
  windowHeight = deviceInfo?.windowHeight - 40
})()

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
  }
  .topTab {
    position: fixed;
    top: 0;
    z-index: 999;
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 1rpx 2rpx #eee;
    background-color: #fff;
    .item {
      height: 120rpx;
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
</style>

<template>
  <view class="container" :style="`height:${windowHeight}*2 + 'rpx'`">
    <!-- tab栏切换 -->
    <view class="topTab">
      <view :class="{ item: true, active: currentPage === 0 }" @click="currentPage = 0">大厅</view>
      <view :class="{ item: true, active: currentPage === 1 }" @click="currentPage = 1">好友</view>
      <view :class="{ item: true, active: currentPage === 2 }" @click="currentPage = 2">信息</view>
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
        <scroll-view scroll-y :style="{ height: windowHeight * 2 - 40 + 'rpx' }">
          <view class="hall">
            <topic title="热门话题"></topic>
            <topic title="热门帖子"></topic>
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
let windowHeight = 0
// 获取可用屏幕高度
;(() => {
  const deviceInfo = uni.getWindowInfo()
  windowHeight = deviceInfo?.windowHeight - 40
  console.log(windowHeight)
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
    margin-top: 80rpx;
  }
  .topTab {
    position: fixed;
    top: 0;
    z-index: 999;
    height: 80rpx;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 6rpx;
    background-color: #fff;
    .item {
      height: 80rpx;
      width: 80rpx;
      color: #bbb;
      font-size: 28rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
    }
  }
  .active {
    border-bottom: 2rpx solid #27b393;
    transform: scale(1.2);
    color: #000 !important;
    transition: all 0.2s ease;
  }
}
</style>

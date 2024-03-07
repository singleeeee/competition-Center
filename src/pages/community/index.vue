<template>
  <view class="container">
    <!-- tab栏切换 -->
    <view class="topTab">
      <view :class="{ item: true, active: currentPage === 0 }" @tap="currentPage = 0">大厅</view>
      <view :class="{ item: true, active: currentPage === 1 }" @tap="currentPage = 1">好友</view>
      <view :class="{ item: true, active: currentPage === 2 }" @tap="currentPage = 2">信息</view>
    </view>
    <!-- 滑动内容 -->
    <swiper v-show="!isSkeletonShow" class="swiper" @change="swiperChange" :current="currentPage">
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
            <topic title="热门比赛" ref="topicRef" @handleSkeletonShow="handleSkeletonShow"></topic>
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
    <!-- 骨架屏 -->
    <scroll-view
      v-show="isSkeletonShow"
      scroll-y="true"
      class="data-v-485a05f3 data-v-485a05f3"
      refresher-enabled="true"
      refresher-threshold="50"
      style="height: 622px"
    >
      <view class="hall hall data-v-485a05f3 data-v-485a05f3">
        <view is="pages/community/components/topic" class="r r data-v-485a05f3 data-v-485a05f3">
          <view class="container topic--container data-v-9df290d1 topic--data-v-9df290d1">
            <view
              style="margin-top: 100rpx"
              class="title topic--title data-v-9df290d1 topic--data-v-9df290d1"
            >
              <view
                class="topic topic--topic data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-564 sk-text"
                >热门比赛</view
              >
              <view
                class="rightTitle topic--rightTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent"
                >更多
                <view
                  is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                  class="data-v-9df290d1 topic--data-v-9df290d1"
                >
                  <text
                    class="uni-icons icons--uni-icons uniui-forward icons--uniui-forward sk-pseudo sk-pseudo-circle"
                    style="color: #333333; font-size: 12px"
                  ></text>
                </view>
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-604 sk-text"
                >
                  #acm</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-856 sk-text"
                  >机不可失失不再来</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-219 sk-text"
                >
                  #蓝桥杯</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-311 sk-text"
                  >机不可失 时不再来</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-974 sk-text"
                >
                  #中国互联网+创新创业大赛</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-997 sk-text"
                  >机不可失 失不再来</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-180 sk-text"
                >
                  #acm</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-811 sk-text"
                  >机不可失失不再来</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-892 sk-text"
                >
                  #蓝桥杯</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-878 sk-text"
                  >机不可失 时不再来</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-548 sk-text"
                >
                  #中国互联网+创新创业大赛</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-47 sk-text"
                  >机不可失 失不再来</view
                >
              </view>
            </view>
          </view>
        </view>
        <view is="pages/community/components/topic" class="r r data-v-485a05f3 data-v-485a05f3">
          <view class="container topic--container data-v-9df290d1 topic--data-v-9df290d1">
            <view class="title topic--title data-v-9df290d1 topic--data-v-9df290d1">
              <view
                class="topic topic--topic data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-210 sk-text"
                >热门帖子</view
              >
              <view
                class="rightTitle topic--rightTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent"
                >更多
                <view
                  is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                  class="data-v-9df290d1 topic--data-v-9df290d1"
                >
                  <text
                    class="uni-icons icons--uni-icons uniui-forward icons--uniui-forward sk-pseudo sk-pseudo-circle"
                    style="color: #333333; font-size: 12px"
                  ></text>
                </view>
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1">
                <view
                  class="topicTitle topic--topicTitle data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-598 sk-text"
                >
                  #快点关注窝</view
                >
                <view
                  class="introduce topic--introduce data-v-9df290d1 topic--data-v-9df290d1 sk-transparent sk-text-14-2857-774 sk-text"
                  >窝窝头，一块钱三个</view
                >
              </view>
            </view>
            <view class="topicBox topic--topicBox data-v-9df290d1 topic--data-v-9df290d1">
              <view class="data-v-9df290d1 topic--data-v-9df290d1">
                <image
                  class="img topic--img data-v-9df290d1 topic--data-v-9df290d1 sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
              <view class="content topic--content data-v-9df290d1 topic--data-v-9df290d1"></view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import topic from './components/topic.vue'
import friends from './components/friends.vue'
import { ref } from 'vue'
import message from './components/message.vue'
// 控制骨架屏显示
let isSkeletonShow = ref(false)
// 显示
let handleSkeletonShow = (boolean: boolean) => {
  isSkeletonShow.value = boolean
}
// 控制下拉刷新
let pulldownTriggered = ref(false)
// 监听刷新事件
const pulldownRefresh = async () => {
  pulldownTriggered.value = true
  await topicRef.value.refresh()
  pulldownTriggered.value = false
}
// 子组件ref
const postRef = ref()
const topicRef = ref()
// 获取可用屏幕高度
let windowHeight = 0
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
  height: 100vh;
  background-color: #eee;
  .swiper {
    margin-top: 8vh;
    height: 92vh;
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
/*
此文件为开发者工具生成，生成时间: 2024/2/17下午9:00:24

在 E:\frontend\project\Competition-center\competition-Center\dist\dev\mp-weixin\pages\community\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-25-7576-162 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-25-7576-535 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-25-7576-986 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-14-2857-564 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.5797rpx;
  position: relative !important;
}
.sk-text-14-2857-604 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-856 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-219 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-311 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-974 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-997 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-180 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-811 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-892 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-878 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-548 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-47 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-210 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.5797rpx;
  position: relative !important;
}
.sk-text-14-2857-598 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35.5072rpx;
  position: relative !important;
}
.sk-text-14-2857-774 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>

<template>
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
</template>

<style scoped>
// 骨架屏
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

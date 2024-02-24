<template name="skeleton">
  <view class="sk-container">
    <view class="container container data-v-71046a88 data-v-71046a88">
      <view class="header header data-v-71046a88 data-v-71046a88">
        <image class="bg data-v-71046a88 sk-image"></image>
      </view>
      <view class="body body data-v-71046a88 data-v-71046a88">
        <view class="avatarBox avatarBox data-v-71046a88 data-v-71046a88">
          <image class="avatar data-v-71046a88 sk-image" mode="scaleToFill"></image>
          <view class="function function data-v-71046a88 data-v-71046a88">
            <view class="data-v-71046a88 data-v-71046a88" style="display: flex">
              <view
                class="edit data-v-71046a88 sk-transparent sk-text-30-3030-755 sk-text"
                style="background-position-x: 50%"
                >取消关注</view
              >
              <view
                class="edit data-v-71046a88 sk-transparent sk-text-30-3030-358 sk-text"
                style="background-position-x: 50%"
                >私信</view
              >
            </view>
          </view>
        </view>
        <view class="infoBox infoBox data-v-71046a88 data-v-71046a88">
          <view class="nickname data-v-71046a88 sk-transparent"
            >Single
            <image class="gender data-v-71046a88 sk-image" mode="scaleToFill"></image>
          </view>
          <view class="itemsBox itemsBox data-v-71046a88 data-v-71046a88">
            <view class="item item data-v-71046a88 data-v-71046a88">
              <view
                class="num data-v-71046a88 sk-transparent sk-text-14-2857-804 sk-text"
                style="background-position-x: 50%"
                >3</view
              >
              <view class="text data-v-71046a88 sk-transparent sk-text-14-2857-485 sk-text"
                >获赞与收藏</view
              >
            </view>
            <view class="item item data-v-71046a88 data-v-71046a88">
              <view
                class="num data-v-71046a88 sk-transparent sk-text-14-2857-191 sk-text"
                style="background-position-x: 50%"
                >2</view
              >
              <view class="text data-v-71046a88 sk-transparent sk-text-14-2857-966 sk-text"
                >关注</view
              >
            </view>
            <view class="item item data-v-71046a88 data-v-71046a88">
              <view
                class="num data-v-71046a88 sk-transparent sk-text-14-2857-939 sk-text"
                style="background-position-x: 50%"
                >2</view
              >
              <view class="text data-v-71046a88 sk-transparent sk-text-14-2857-984 sk-text"
                >粉丝</view
              >
            </view>
          </view>
          <view
            class="information ellipsis data-v-71046a88 sk-transparent sk-text-14-2857-311 sk-text"
            >莞专莞专我爱你</view
          >
          <view class="tag tag data-v-71046a88 data-v-71046a88">
            <view class="data-v-71046a88 data-v-71046a88" style="display: flex">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag"
                class="label label data-v-71046a88 data-v-71046a88"
              >
                <text
                  class="uni-tag tag--uni-tag uni-tag--primary tag--uni-tag--primary uni-tag--small tag--uni-tag--small uni-tag--circle tag--uni-tag--circle uni-tag-text--small tag--uni-tag-text--small sk-transparent sk-text-7-1429-929 sk-text"
                  style="true"
                  >大二</text
                >
              </view>
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-tag/uni-tag"
                class="label label data-v-71046a88 data-v-71046a88"
              >
                <text
                  class="uni-tag tag--uni-tag uni-tag--primary tag--uni-tag--primary uni-tag--small tag--uni-tag--small uni-tag--circle tag--uni-tag--circle uni-tag-text--small tag--uni-tag-text--small sk-transparent sk-text-7-1429-503 sk-text"
                  style="true"
                  >计算机</text
                >
              </view>
            </view>
          </view>
        </view>
        <view class="trends trends data-v-71046a88 data-v-71046a88">
          <view class="topTap topTap data-v-71046a88 data-v-71046a88">
            <view
              class="data-v-71046a88 item sk-transparent sk-text-25-7576-57 sk-text"
              data-id="0"
              style="background-position-x: 50%"
              >动态</view
            >
            <view
              class="data-v-71046a88 item sk-transparent sk-text-25-7576-80 sk-text"
              data-id="1"
              style="background-position-x: 50%"
              >收藏</view
            >
            <view
              class="data-v-71046a88 item active sk-transparent sk-text-25-7576-272 sk-text"
              data-id="2"
              style="background-position-x: 50%"
              >帖子</view
            >
          </view>
        </view>
      </view>
      <swiper class="swiper swiper data-v-71046a88 data-v-71046a88" current="0" autoplay="false">
        <swiper-item
          class="data-v-71046a88 sk-transparent sk-text-14-2857-222 sk-text"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate(0%, 0px) translateZ(0px);
          "
          >动态</swiper-item
        >
      </swiper>
    </view>
  </view>
</template>
<script lang="ts" setup></script>
<style scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-30-3030-755 {
  background-image: linear-gradient(
    transparent 30.303%,
    #eeeeee 0%,
    #eeeeee 69.697%,
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
.sk-text-30-3030-358 {
  background-image: linear-gradient(
    transparent 30.303%,
    #eeeeee 0%,
    #eeeeee 69.697%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-14-2857-804 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 45.6522rpx;
  position: relative !important;
}
.sk-text-14-2857-485 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-191 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 45.6522rpx;
  position: relative !important;
}
.sk-text-14-2857-966 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-939 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 45.6522rpx;
  position: relative !important;
}
.sk-text-14-2857-984 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.971rpx;
  position: relative !important;
}
.sk-text-14-2857-311 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 38.0435rpx;
  position: relative !important;
}
.sk-text-7-1429-929 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 25.3623rpx;
  position: relative !important;
}
.sk-text-7-1429-503 {
  background-image: linear-gradient(
    transparent 7.1429%,
    #eeeeee 0%,
    #eeeeee 92.8571%,
    transparent 0%
  ) !important;
  background-size: 100% 25.3623rpx;
  position: relative !important;
}
.sk-text-25-7576-57 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-25-7576-80 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-25-7576-272 {
  background-image: linear-gradient(
    transparent 25.7576%,
    #eeeeee 0%,
    #eeeeee 74.2424%,
    transparent 0%
  ) !important;
  background-size: 100% 59.7826rpx;
  position: relative !important;
}
.sk-text-14-2857-222 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 40.5797rpx;
  position: absolute !important;
}
.sk-image {
  background: #efefef !important;
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

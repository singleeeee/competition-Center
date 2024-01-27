<template>
  <view class="container">
    <view class="title">{{ title }}</view>
    <view class="content">{{ content }}</view>
    <view class="img"></view>
    <view class="share">
      <view class="lineBox">
        <view class="line"></view>
        <view class="text">分享至</view>
        <view class="line"></view>
      </view>
      <view class="iconBox">
        <uni-icons style="margin-right: 30rpx" type="weixin" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="qq" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="weibo" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="pyq" color="#ccc" size="38" />
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '震惊！某男子竟当众做出这样的举动',
  },
  content: {
    type: String,
    default: '说话',
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 10rpx 20rpx;
  .img {
    background-color: skyblue;
    height: 400rpx;
    width: 100%;
  }
  .share {
    margin-top: 70rpx;
    .lineBox {
      position: relative;
      display: flex;
      justify-content: space-around;
      .line {
        width: 38%;
        border-bottom: 0.5rpx solid #eee;
      }
      .text {
        position: absolute;
        left: 50%;
        top: -15rpx;
        transform: translateX(-50%);
        font-size: 24rpx;
        color: #ccc;
      }
    }
    .iconBox {
      margin-top: 40rpx;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

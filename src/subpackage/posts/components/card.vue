<template>
  <view class="container">
    <view class="postBox">
      <nameTitle :nickname="nickname" :date="time" icon="right"></nameTitle>
      <view class="contentBox">
        <view class="title">{{ title }}</view>
        <view class="content">{{ content }}</view>
        <view class="img"></view>
      </view>
      <view class="others">
        <view class="item">
          <uni-icons type="redo" color="#ccc" size="24" />
          <span style="color: #ccc; padding-left: 10rpx">{{ retransmission }}</span>
        </view>
        <view class="item">
          <uni-icons type="chat" color="#ccc" size="24" />
          <span style="color: #ccc; padding-left: 10rpx">{{ review }}</span>
        </view>
        <view class="item">
          <uni-icons type="hand-up" color="#ccc" size="24" />
          <span style="color: #ccc; padding-left: 10rpx">{{ font }}</span>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import nameTitle from '@/components/nameTitle.vue'
let props = defineProps({
  nickname: {
    type: String,
    default: '竞赛中心',
  },
  content: {
    type: String,
    default: '竞赛中心',
  },
  time: {
    type: String,
    default: '刚刚',
  },
  title: {
    type: String,
    default: '竞赛中心',
  },
  retransmission: {
    type: Number,
    default: 23,
  },
  review: {
    type: Number,
    default: 42,
  },
  font: {
    type: Number,
    default: 12,
  },
})
</script>
<style scoped lang="scss">
.container {
  height: auto;
  margin: 20rpx 20rpx;
  background-color: #eee;
  .postBox {
    height: 790rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08);
    padding: 20rpx 20rpx 0 20rpx;
    .contentBox {
      height: 570rpx;
      box-sizing: border-box;
      .title {
        height: 40rpx;
        font-weight: 700;
        font-size: 32rpx;
        padding-bottom: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content {
        height: 80rpx;
        font-size: 28rpx;
        color: #ccc;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .img {
        background-color: skyblue;
        height: 430rpx;
      }
    }
    .others {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 80rpx;
      .item {
        height: 100%;
        width: 33%;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        &:active {
          transition: all 0.1s;
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>

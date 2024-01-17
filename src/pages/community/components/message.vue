<template>
  <view class="container">
    <view class="messageBox" v-for="item in messageList" :key="item.id">
      <view class="avatar"></view>
      <view class="bodyBox">
        <view class="nickname">{{ item.nickname }}</view>
        <view class="message">{{ item.message }}</view>
      </view>
      <view class="timeBox">
        <view class="time">{{ item.time }}</view>
        <view class="num"
          ><uni-tag :circle="true" :text="item.num" type="error" size="mini"
        /></view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const messageList = ref([
  {
    id: 1,
    avatar: '',
    nickname: '马春丽',
    message: '我想回家',
    time: '刚刚',
    num: '99+',
  },
  {
    id: 2,
    avatar: '',
    nickname: '代金宇',
    message: '今晚吃驴肉火烧',
    time: '下午 13:25',
    num: '20',
  },

  {
    id: 3,
    avatar: '',
    nickname: '张涵',
    message: '原神，启动！',
    time: '昨天',
    num: '1',
  },
])
</script>
<style scoped lang="scss">
.container {
  .messageBox {
    height: 100rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: skyblue;
    }
    .bodyBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      .nickname {
        font-size: 28rpx;
        padding-bottom: 10rpx;
      }
      .message {
        font-size: 20rpx;
      }
    }
    .timeBox {
      width: 120rpx;
      font-size: 20rpx;

      .num {
        padding-top: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

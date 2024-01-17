<template>
  <view class="container">
    <!-- 作者头像 -->
    <view class="authorBox">
      <view class="avatar"></view>
      <view class="bodyBox">
        <view class="nickname">{{ nickname }}</view>
        <view class="date_add">
          <view class="date">{{ date }}</view>
          <view class="add"> {{ add }}</view>
        </view>
      </view>
      <view class="share">
        <uni-icons :type="icon" color="#ccc" size="18"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
let props = defineProps({
  nickname: {
    type: String,
  },
  date: {
    type: String,
  },
  add: {
    type: String,
  },
  icon: {
    type: String,
  },
})
</script>

<style scoped lang="scss">
.container {
  .authorBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150rpx;
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: skyblue;
    }

    .bodyBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      flex: 1;
      height: 120rpx;
      padding: 10rpx 0 0 20rpx;
      .nickname {
        font-size: 30rpx;
        padding-bottom: 10rpx;
      }
      .date_add {
        display: flex;
        font-size: 24rpx;
        color: #ccc;
        .date {
          margin-right: 10rpx;
        }
      }
    }
    .share {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

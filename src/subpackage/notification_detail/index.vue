<template>
  <view class="container">
    <!-- 作者头像 -->
    <view class="authorBox">
      <view class="avatar"></view>
      <view class="bodyBox">
        <view class="nickname">竞赛中心</view>
        <view class="date_add">
          <view class="date">2023/11/2 16:36</view>
          <view class="add"> 广东</view>
        </view>
      </view>
      <view class="share">
        <uni-icons type="paperplane" color="#ccc" size="18"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.container {
  margin: 0 30rpx;
  .authorBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150rpx;
    border-bottom: 1rpx solid #eee;
    .avatar {
      width: 120rpx;
      height: 120rpx;
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
        font-size: 26rpx;
        color: orange;
        padding-bottom: 10rpx;
      }
      .date_add {
        display: flex;
        font-size: 20rpx;
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

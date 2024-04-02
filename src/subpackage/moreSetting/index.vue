<template>
  <view class="container">
    <view class="configList">
      <view class="changePersonData" @tap="navigateTo('personal_data')">
        <view class="text">修改个人信息</view>
        <view class="right">
          <image class="avatar" :src="userInfo.userAvatarUrl" mode="scaleToFill" />
          <uni-icons type="forward" color="#000" size="18" />
        </view>
      </view>
      <view class="changePersonData" @tap="navigateTo('signUpInfo')">
        <view class="text">完善报名信息</view>
        <view class="right">
          <uni-icons type="forward" color="#000" size="18" />
        </view>
      </view>
    </view>
    <button class="btn" @tap="logout">退出登录</button>
  </view>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
// 修改个人信息
const navigateTo = (target: string) => {
  uni.navigateTo({
    url: `/subpackage/${target}/index`,
  })
}
// 退出登录
const logout = async () => {
  await userInfoStore.resetStore()
  await userInfoStore.clearUserInfo()
  uni.switchTab({
    url: '/pages/mine/index',
  })
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  height: 100vh;
  padding: 20rpx;
  background-color: #f1f1f1;
  .configList {
    .changePersonData {
      display: flex;
      align-items: center;
      height: 80rpx;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 18rpx 30rpx;
      margin-bottom: 20rpx;
      .text {
        font-weight: 700;
        font-size: 30rpx;
      }
      .right {
        display: flex;
        align-items: center;
        .avatar {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }
      }
      &:active {
        background-color: #eee;
      }
    }
  }
  .btn {
    margin-top: 100rpx;
    margin-bottom: 100rpx;
    width: 70vw;
    height: 90rpx;
    border-radius: 50rpx;
    color: #fff;
    box-shadow: 0 0 4rpx black;
    background: linear-gradient(45deg, #010101, #211f1f, #323030, #4a4646, #5b5959);
    &:active {
      transform: scale(1.01);
    }
  }
}
</style>

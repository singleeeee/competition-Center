<template>
  <view class="header">
    <view class="eng"> ABOUT US </view>
    <view class="teamName"> 竞赛云界 </view>
    <view style="display: inline; margin-top: 40rpx">
      <span class="tag">
        <span class="text">欢迎进入竞赛云界</span>
        <image
          style="width: 30rpx; height: 20rpx; display: inline-block; margin-left: 6rpx"
          src="@/static/AboutUs/rightArrow.png"
          mode="scaleToFill"
        />
      </span>
    </view>
  </view>
  <view class="logo">竞赛云界</view>
  <view class="body">
    <!-- 简要介绍 -->
    <view class="card">
      <view class="top">
        <view class="items">
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
        </view>
        <view class="text">INTRODUCTION</view>
      </view>
      <view class="content"
        >竞赛云界小程序是一款服务于高校大学生，提供各种比赛信息的平台，该小程序旨在打
        破比赛信息差，及时通知比赛消息，提供信息交流平台供同学们进行知识共享，同时发现志
        同道合的好友，一起参加比赛，最终达到以赛促学，提升个人竞争力。
      </view>
    </view>
    <!-- 开发人员 -->
    <view class="card">
      <view class="top">
        <view class="items">
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
          <i class="item"></i>
        </view>
        <view class="text">DEVEROPER</view>
      </view>
      <view class="content"
        >竞赛云界小程序是一款服务于高校大学生，提供各种比赛信息的平台，该小程序旨在打
        破比赛信息差，及时通知比赛消息，提供信息交流平台供同学们进行知识共享，同时发现志
        同道合的好友，一起参加比赛，最终达到以赛促学，提升个人竞争力。
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.logo {
  position: fixed;
  top: 60rpx;
  right: 30rpx;
  display: inline;
  font-size: 34rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 40rpx;
  font-weight: 700;
  color: rgb(255, 158, 175);
  box-shadow: 4rpx 4prx 4prx 12rpx #000;
}
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 400rpx;
  justify-content: center;
  background-color: #12a66a;
  padding-left: 40rpx;
  .eng {
    font-size: 52rpx;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;
  }
  .teamName {
    font-size: 52rpx;
    color: #fff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .tag {
    display: inline;
    margin-top: 60rpx;
    font-weight: 700;
    background-color: #fff;
    padding: 10rpx;
    font-size: 24rpx;
    color: #515151;
  }
}
.body {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx;
  background: linear-gradient(to right, #d9faf5, #e0f9f5, #e8faf7);
  .card {
    margin: 40rpx 40rpx;
    padding: 10rpx 40rpx;
    height: 400rpx;
    background-color: #fff;
    border-radius: 40rpx;
    box-shadow: 2rpx 2rpx 2rpx 2rpx #ddd;
    overflow: hidden;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100rpx;
      border-bottom: 2rpx solid #000;
      .items {
        display: flex;
        justify-content: space-evenly;
        .item {
          width: 30rpx;
          height: 30rpx;
          background-color: #d9faf5;
          border-radius: 50%;
        }
      }
      .text {
        font-weight: 700;
        font-size: 28rpx;
      }
    }
    .content {
      padding: 10rpx;
      font-size: 28rpx;
      color: #666;
      letter-spacing: 2rpx;
    }
  }
}
</style>

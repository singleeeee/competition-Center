<template>
  <view class="container">
    <view class="header">
      <image class="bg" src="https://s11.ax1x.com/2024/01/24/pFeshjA.jpg" />
    </view>
    <view class="body">
      <view class="avatarBox">
        <image class="avatar" :src="userInfo.userAvatarUrl" mode="scaleToFill" />
        <view class="edit" @tap="navigateToEdit">编辑资料</view>
      </view>
      <view class="infoBox">
        <view class="nickname"
          >{{ userInfo.userNickname }}
          <image
            v-if="userInfo.userGender === 0"
            class="gender"
            src="/static/personPage/man.png"
            mode="scaleToFill"
          />
          <image v-else class="gender" src="/static/personPage/woman.png" mode="scaleToFill" />
        </view>
        <view class="itemsBox">
          <view class="item">
            <view class="num">2</view>
            <view class="text">获赞与收藏</view>
          </view>
          <view class="item">
            <view class="num">0</view>
            <view class="text">关注</view>
          </view>
          <view class="item">
            <view class="num">2</view>
            <view class="text">粉丝</view>
          </view>
        </view>
        <view class="information ellipsis">{{ userInfo.userIntroduction }}</view>
        <view class="tag">
          <view v-if="tagList.length > 0">
            <uni-tag
              v-for="(item, index) in tagList"
              :key="index"
              class="label"
              :text="item"
              :circle="true"
              type="primary"
              size="small"
            />
          </view>
          <view v-else>
            <uni-tag
              class="label"
              text="暂无标签"
              :circle="true"
              type="primary"
              size="small"
            ></uni-tag>
          </view>
        </view>
      </view>
      <view class="trends">
        <view class="topTap">
          <view :class="{ item: true, active: 0 === activeBar }" data-id="0" @tap="changeBar"
            >动态</view
          >
          <view :class="{ item: true, active: 1 === activeBar }" data-id="1" @tap="changeBar"
            >收藏</view
          >
          <view :class="{ item: true, active: 2 === activeBar }" data-id="2" @tap="changeBar"
            >帖子</view
          >
        </view>
      </view>
    </view>
    <swiper class="swiper" @change="swiperChange" :current="currentPage">
      <swiper-item class="">动态</swiper-item>
      <swiper-item class="">收藏</swiper-item>
      <swiper-item class="">帖子</swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const { userInfo } = storeToRefs(useUserInfoStore())
// 跳转到个人资料修改
const navigateToEdit = () => {
  uni.navigateTo({
    url: '/subpackage/personal_data/index',
  })
}

// tab栏切换
const changeBar = (e: any) => {
  activeBar.value = +e.currentTarget.dataset.id
  currentPage.value = +e.currentTarget.dataset.id
}

//swiper切换事件
const swiperChange = (e: any) => {
  activeBar.value = e.detail.current
}
const currentPage = ref(0)

const activeBar = ref(0)

// tag数组
let tagList = ref<string[]>([])
if (userInfo.value.userLabel.includes('-')) {
  tagList.value = userInfo.value.userLabel.split('-')
} else if (userInfo.value.userLabel !== '') tagList.value.push(userInfo.value.userLabel)
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #eee;
}
.container .header {
  height: 20vh;
}
.container .header .bg {
  width: 100%;
}
.container .body {
  position: relative;
  display: flex;
  flex-direction: column;
  top: -40rpx;
  z-index: 999;
  height: 38vh;
  border-radius: 30rpx 30rpx 0 0;
  padding: 20rpx 20rpx 0 20rpx;
  background-color: #fff;
}
.container .body .avatarBox {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.container .body .avatarBox .avatar {
  position: absolute;
  top: -100rpx;
  left: 10rpx;
  width: 140rpx;
  height: 140rpx;
  background-color: orange;
  border-radius: 50%;
  border: 8rpx solid #ccc;
}
.container .body .avatarBox .edit {
  position: absolute;
  right: 0;
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  font-size: 24rpx;
  border: 1rpx solid #999;
  font-weight: 700;
  background-color: #fff;
}
.container .body .infoBox {
  flex: 5;
  box-sizing: border-box;
  padding: 10rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.container .body .infoBox .nickname {
  font-size: 36rpx;
  font-weight: 700;
}
.container .body .infoBox .itemsBox {
  display: flex;
  margin: 10rpx 0;
}
.container .body .infoBox .itemsBox .item {
  margin-right: 100rpx;
}
.container .body .infoBox .itemsBox .item .num {
  text-align: center;
  font-size: 34rpx;
  font-weight: 700;
}
.container .body .infoBox .itemsBox .item .text {
  color: #ccc;
  font-size: 24rpx;
}
.container .body .infoBox .information {
  max-height: 100rpx;
  padding: 8rpx 0;
  color: #ccc;
  font-size: 28rpx;
}
.container .body .infoBox .tag .label {
  padding-right: 20rpx;
  font-size: 24rpx;
}
.container .body .trends {
  flex: 1;
  display: flex;
  align-items: center;
}
.container .body .trends .topTap {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10rpx 0;
}
.container .body .trends .topTap .item {
  width: 80rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  color: #ccc;
}
.container .body .trends .topTap .active {
  color: #000;
  border-bottom: 4rpx solid #000;
}
.container .swiper {
  height: 42vh;
  margin-top: -38rpx;
}
.container .gender {
  margin-top: 10rpx;
  width: 30rpx;
  height: 30rpx;
}
.ellipsis {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>

<template>
  <view class="container">
    <!-- 头像 -->
    <view class="items">
      <view class="left">更换头像</view>
      <view class="right">
        <view class="back">
          <button class="avatarBox" plain open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image class="avatar" :src="userInfo.userAvatarUrl" mode="scaleToFill" />
          </button>
        </view>
      </view>
    </view>
    <!-- 昵称 -->
    <view class="items" @tap="nicknamePopup.open('center')">
      <view class="left">昵称</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            userInfo.userNickname
          }}</span>
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
    <!-- 性别 -->
    <view class="items" @tap="genderPopup.open('bottom')">
      <view class="left">性别</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            genderSelectd
          }}</span>
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
    <!-- 简介 -->
    <view class="items" @tap="introducePopup.open('center')">
      <view class="left">简介</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            userInfo.userIntroduction
          }}</span>
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
    <!-- 所在地区 -->
    <view class="items">
      <view class="left">所在地区</view>
      <view class="right">
        <view class="back">
          <!-- <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            userInfo.userCity
          }}</span> -->
          <CityChoose></CityChoose>
        </view>
      </view>
    </view>
    <!-- 个性标签 -->
    <view class="items" @tap="labelPopup.open('center')">
      <view class="left">个性标签</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; margin-right: 10rpx; font-size: 28rpx">{{
            userInfo.userLabel || '暂未使用标签'
          }}</span>
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
  </view>

  <button class="btn" @tap="logout">退出登录</button>
  <!-- 弹窗 -->
  <!-- --------------- -->
  <!-- 昵称 -->
  <uni-popup ref="nicknamePopup" background-color="#fff">
    <InputPopup
      v-model:nickname="nickname"
      @nicknameConfirm="nicknameConfirm"
      @nicknameCancel="nicknameCancel"
    ></InputPopup>
  </uni-popup>
  <!-- 性别 -->
  <uni-popup ref="genderPopup" background-color="#fff">
    <picker-view :value="genderValue" immediate-change @change="genderChange" class="picker-view">
      <picker-view-column>
        <view class="item" v-for="(item, index) in genderArray" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
  <!-- 简介 -->
  <uni-popup ref="introducePopup" background-color="#fff">
    <TextareaPopup
      v-model:introduction="introduction"
      @introConfirm="introConfirm"
      @introCancel="introCancel"
    ></TextareaPopup>
  </uni-popup>
  <uni-popup ref="labelPopup" background-color="#fff">
    <LabelPopup></LabelPopup>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores'
import { onShow } from '@dcloudio/uni-app'
import InputPopup from './components/InputPopup.vue'
import TextareaPopup from './components/TextareaPopup.vue'
import CityChoose from './components/CityChoose.vue'
import LabelPopup from './components/LabelPopup.vue'
// 回显和使用
const userInfoStore = useUserInfoStore()
const { userInfo } = userInfoStore
onShow(() => {
  genderSelectd.value = userInfo.userGender === 0 ? '男' : '女'
  genderValue.value[0] = userInfo.userGender
})

// 所有的弹出层
const nicknamePopup = ref()
const genderPopup = ref()
const introducePopup = ref()
const labelPopup = ref()

// 监听点击头像事件
const onChooseAvatar = (e: any) => {
  uni.uploadFile({
    url: 'http://47.113.177.192:8082/app/upload/file',
    filePath: e.detail.avatarUrl,
    name: 'file',
    success: (success) => {
      const { data } = JSON.parse(success.data)
      userInfoStore.changeUserInfo('userAvatarUrl', data.url)
    },
  })
}

// 性别修改
const genderArray = ['男', '女']
const genderValue = ref([0])
const genderSelectd = ref('男')

const genderChange = (e: any) => {
  const val = e.detail.value
  genderSelectd.value = genderArray[val[0]]
  userInfoStore.changeUserInfo('userGender', genderSelectd.value === '男' ? 0 : 1)
}

// 退出登录
const logout = () => {
  userInfoStore.clearUserInfo()
  uni.switchTab({
    url: '/pages/mine/index',
  })
}

// 昵称修改
let nickname = ref<String>(userInfo.userNickname)

// 确认
const nicknameConfirm = () => {
  userInfoStore.changeUserInfo('userNickname', nickname.value)
  nicknamePopup.value.close()
}
// 取消
const nicknameCancel = () => {
  nickname.value = userInfo.userNickname
  nicknamePopup.value.close()
}

// 简介修改
let introduction = ref<String>(userInfo.userIntroduction)
// 确认
const introConfirm = () => {
  userInfoStore.changeUserInfo('userIntroduction', introduction.value as string)
  introducePopup.value.close()
}
// 取消
const introCancel = () => {
  introduction.value = userInfo.userIntroduction
  introducePopup.value.close()
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .items {
    height: 140rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    padding: 0 20rpx;
    &:active {
      background-color: #eee;
    }

    .right {
      display: flex;
      align-items: center;
      .avatarBox {
        display: inline-block;
        padding: 0;
        width: 120rpx;
        height: 120rpx;
        background-color: #fff;
        border: 0;
        border-radius: 50%;
        margin-right: 20rpx;
        .avatar {
          display: block;
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          background-color: skyblue;
          margin-right: 20rpx;
        }
      }
      .back {
        min-height: 50rpx;
        display: flex;
        align-items: center;
      }
    }
  }
}
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
  .item {
    line-height: 60rpx;
    text-align: center;
  }
}
.btn {
  margin-top: 100rpx;
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
</style>

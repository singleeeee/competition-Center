<template>
  <view class="container">
    <!-- 头像 -->
    <view class="items">
      <button class="avatarBox" plain open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <view class="left" style="font-size: 30rpx">更换头像</view>
        <view class="right">
          <image class="avatar" :src="userInfo.userAvatarUrl" mode="scaleToFill" />
        </view>
      </button>
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
            genderSelectd || '男'
          }}</span>
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
    <!-- 简介 -->
    <view class="items" @tap="introducePopup.open('center')">
      <view class="left">简介</view>
      <view class="right">
        <view class="back" style="display: flex">
          <span
            style="
              display: block;
              color: #ccc;
              margin-right: 10rpx;
              font-size: 28rpx;
              max-width: 50vw;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
            >{{ userInfo.userIntroduction }}</span
          >
          <uni-icons type="right" color="#ccc" size="18" />
        </view>
      </view>
    </view>
    <!-- 所在地区 -->
    <view class="items">
      <view class="left">所在地区</view>
      <view class="right">
        <view class="back">
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
  <!-- 个性标签 -->
  <uni-popup ref="labelPopup" background-color="#fff">
    <LabelPopup></LabelPopup>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="修改成功" :duration="500"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="修改失败" :duration="500"></uni-popup-message>
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
import { storeToRefs } from 'pinia'

// 回显和使用
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
onShow(() => {
  // 性别回显
  genderSelectd.value = userInfo.value.userGender === 1 ? '男' : '女'
  genderValue.value[0] = userInfo.value.userGender - 1
})

// 所有的弹出层
const nicknamePopup = ref()
const genderPopup = ref()
const introducePopup = ref()
const labelPopup = ref()
const successInfo = ref()
const errorInfo = ref()

// 监听点击头像事件
const onChooseAvatar = (e: any) => {
  uni.uploadFile({
    url: 'http://47.113.177.192:8082/app/upload/file',
    filePath: e.detail.avatarUrl,
    name: 'file',
    success: (success) => {
      const { data } = JSON.parse(success.data)
      userInfoStore.changeUserInfo('userAvatarUrl', data.url)
      successInfo.value.open()
    },
    fail: () => {
      errorInfo.value.open()
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
  userInfoStore.changeUserInfo('userGender', genderSelectd.value === '男' ? 1 : 2)
  successInfo.value.open()
}
// 昵称修改
let nickname = ref<String>(userInfo.value.userNickname)

// 确认
const nicknameConfirm = () => {
  userInfoStore.changeUserInfo('userNickname', nickname.value)
  nicknamePopup.value.close()
  successInfo.value.open()
}
// 取消
const nicknameCancel = () => {
  nickname.value = userInfo.value.userNickname
  nicknamePopup.value.close()
}

// 简介修改
let introduction = ref<String>(userInfo.value.userIntroduction)
// 确认
const introConfirm = () => {
  userInfoStore.changeUserInfo('userIntroduction', introduction.value as string)
  introducePopup.value.close()
}
// 取消
const introCancel = () => {
  introduction.value = userInfo.value.userIntroduction
  introducePopup.value.close()
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  .info {
    text-align: center;
    padding: 10rpx 0;
    font-size: 20rpx;
    color: #aaa;
  }
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
    .avatarBox {
      display: flex;
      width: 100%;
      border: 0;
      justify-content: space-between;
      align-items: center;
      font-size: 32rpx;
      font-family: '微软雅黑';
      padding: 0;
      .right {
        .avatar {
          display: block;
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
      }
      .back {
        min-height: 50rpx;
        display: flex;
        align-items: center;
      }
    }
    .right {
      .close {
        box-sizing: border-box;
        height: 56rpx;
        width: 360rpx;
        margin-right: 40rpx;
        border-radius: 30rpx;
        text-align: center;
        background-color: #eee;
        max-width: 70vw;
        overflow: hidden;
        line-height: 56rpx;
        padding: 0 20rpx;
        color: #aaa;
        font-size: 28rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
</style>

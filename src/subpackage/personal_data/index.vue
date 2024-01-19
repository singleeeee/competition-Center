<template>
  <view class="container">
    <!-- 头像 -->
    <view class="items">
      <view class="left">更换头像</view>
      <view class="right">
        <view class="back">
          <view class="avatar" v-show="true">
            <image class="avatar" :src="userInfo.avatarUrl" mode="scaleToFill" />
          </view>
          <span
            style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx"
          ></span>
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <!-- 昵称 -->
    <view class="items" @tap="nicknamePopup.open('center')">
      <view class="left">昵称</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx">{{
            userInfo.nickname
          }}</span>
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <!-- 性别 -->
    <view class="items" @tap="sexPopup.open('bottom')">
      <view class="left">性别</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx"
            >男</span
          >
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <!-- 简介 -->
    <view class="items" @tap="introductionPopup.open('bottom')">
      <view class="left">简介</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx"
            >这个人没有留下什么~</span
          >
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <!-- 所在城市 -->
    <view class="items" @tap="cityPopup.open('bottom')">
      <view class="left">所在城市</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx"
            >广东、东莞</span
          >
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <!-- 个性标签 -->
    <view class="items" @tap="labelPopup.open('bottom')">
      <view class="left">个性标签</view>
      <view class="right">
        <view class="back">
          <span style="color: #ccc; font-size: 28rpx; vertical-align: top; margin-right: 10rpx"
            >大二、厨子、铜牌</span
          >
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
    <MyButton content="退出登录" backgroundcolor="#2f2f2f" @tap="logout"></MyButton>
  </view>
  <!-- 修改所在城市 -->
  <uni-popup ref="cityPopup" background-color="#fff">修改所在城市</uni-popup>
  <!-- 修改简介 -->
  <uni-popup ref="introductionPopup" background-color="#fff">修改简介</uni-popup>
  <!-- 修改性别 -->
  <uni-popup ref="sexPopup" background-color="#fff">修改性别</uni-popup>
  <!-- 修改个性标签 -->
  <uni-popup ref="labelPopup" background-color="#fff">修改性别</uni-popup>
  <!-- 修改昵称 -->
  <uni-popup
    ref="nicknamePopup"
    @tap="nicknamePopup.open('bottom')"
    mode="input"
    background-color="#fff"
  >
    <PopInput @cancel="cancel" @confirm="confirm"></PopInput>
  </uni-popup>

  <!-- <button @tap="send">登录</button> -->
</template>

<script lang="ts" setup>
import MyButton from '@/components/MyButton.vue'
import PopInput from './components/PopInput.vue'
import { ref } from 'vue'
//用户信息
const userInfo = uni.getStorageSync('userInfo')
const itemsList = [
  {
    id: '1',
    title: '更换头像',
    back: '',
  },
  {
    id: '2',
    title: '昵称',
    back: userInfo.nickname,
  },
  {
    id: '3',
    title: '性别',
    back: '男',
  },
  {
    id: '4',
    title: '简介',
    back: '',
  },
  {
    id: '5',
    title: '所在城市',
    back: '广东，东莞',
  },

  {
    id: '6',
    title: '个性标签',
    back: '大二、厨子、铜牌',
  },
]
//各弹出层ref
const nicknamePopup = ref()
const sexPopup = ref()
const introductionPopup = ref()
const cityPopup = ref()
const labelPopup = ref()

//测试网络发送
const send = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    success: function (loginRes) {
      const code = loginRes.code
      uni.request({
        url: `http://47.113.177.192:8082/app/login?code=${code}`,
      })
    },
  })
}
// 退出登录
const logout = () => {
  uni.showLoading({
    mask: true,
    success: (success) => {
      uni.removeStorage({
        key: 'userInfo',
        success: () => {
          uni.navigateBack({ delta: 1 })
        },
      })
    },
  })
}

// 弹出框的确认取消
const cancel = () => {
  nicknamePopup.value.close()
}
const confirm = () => {
  nicknamePopup.value.close()
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
    margin: 0 20rpx;
    &:active {
      background-color: #eee;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 140rpx;
      width: 50%;
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        margin-top: 10rpx;
      }
    }
  }
}
</style>

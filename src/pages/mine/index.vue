<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import MyButton from '@/components/MyButton.vue'
// 用户信息
const userInfo = ref({
  isLogin: false,
  nickname: '',
  avatarUrl: '',
})
onShow(() => {
  // 判断本地缓存
  const localUserInfo = uni.getStorageSync('userInfo')
  if (localUserInfo) {
    userInfo.value = localUserInfo
  } else {
    userInfo.value = {
      isLogin: false,
      nickname: '',
      avatarUrl: '',
    }
    loginAvatar = ''
  }
})

let loginAvatar = '' //带'的头像url

// 监听点击头像事件
const onChooseavatar = (e) => {
  loginAvatar = "'" + e.detail.avatarUrl + "'"
  userInfo.value.avatarUrl = e.detail.avatarUrl
}

// 登录按钮
const login = async () => {
  // 头像与昵称必填
  if (loginAvatar && userInfo.value.nickname) {
    await uni.showLoading
    userInfo.value.isLogin = true
    uni.setStorageSync('userInfo', userInfo.value)
  } else {
    console.log(userInfo.value)
    uni.showToast({
      icon: 'error',
      title: '头像和昵称',
    })
  }
}
// 输入框失焦事件
const blur = (e: any) => {
  userInfo.value.nickname = e.detail.value
}
// 跳转到修改个人资料页面
const navigatetoPerson = () => {
  uni.navigateTo({
    url: '/subpackage/personal_data/index',
  })
}
// 主页item配置项
const configItems = [
  {
    id: 1,
    title: '我的奖项',
  },
  {
    id: 2,
    title: '我的队伍',
  },
  {
    id: 3,
    title: '参赛报名',
  },
  {
    id: 4,
    title: '我的经历',
  },
  {
    id: 5,
    title: '联系客服',
  },
  {
    id: 6,
    title: '更多设置',
  },
  {
    id: 7,
    title: '关于',
  },
]
</script>

<template>
  <view class="container" v-if="userInfo.isLogin">
    <view class="header">
      <view class="avatarBox">
        <view class="avatar">
          <image class="avatar" :src="userInfo.avatarUrl" mode="scaleToFill" />
        </view>
        <view class="bodyBox">
          <view class="nickname">{{ userInfo.nickname }}</view>
          <view class="label">
            <view class="tag-view">
              <uni-tag class="label" text="大二" :circle="true" type="primary" size="small" />
              <uni-tag class="label" text="厨子" :circle="true" type="primary" size="small" />
              <uni-tag class="label" text="铜牌" :circle="true" type="primary" size="small" />
            </view>
          </view>
        </view>
        <view class="detail" @click="navigatetoPerson">
          <uni-icons type="right" color="#ccc" size="20"></uni-icons>
        </view>
      </view>
    </view>
    <view class="body">
      <view class="collectBox">
        <view class="liked">
          <span style="font-size: 40rpx; padding-right: 10rpx; color: red; font-weight: 700"
            >2444</span
          >
          <span
            style="
              font-size: 26rpx;
              position: absolute;
              top: 30rpx;
              font-family: 'songti';
              font-weight: 700;
            "
            >获赞</span
          ></view
        >
        <view class="itemsBox">
          <view class="items">
            <image class="img" src="@/static/mine/collect.png" mode="scaleToFill" />
            收藏</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/subscribe.png" mode="scaleToFill" />
            订阅</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/follow.png" mode="scaleToFill" />
            关注</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/fans.png" mode="scaleToFill" />
            粉丝</view
          >
        </view>
      </view>
      <view class="messageBox">
        <view class="itemsBox">
          <view class="items">
            <image class="img" src="@/static/mine/message.png" mode="scaleToFill" />
            信息</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/draft.png" mode="scaleToFill" />
            草稿</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/person.png" mode="scaleToFill" />
            个人中心</view
          >
          <view class="items">
            <image class="img" src="@/static/mine/manage.png" mode="scaleToFill" />
            内容管理</view
          >
        </view>
      </view>
      <view class="list">
        <view class="item" v-for="item in configItems" :key="item.id">
          <view class="left">{{ item.title }}</view>
          <view class="right">
            <uni-icons type="right" color="#ccc" size="18" />
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="unLog" v-else>
    <view class="loginBox">
      <view class="img">
        <button
          class="avatar"
          open-type="chooseAvatar"
          @chooseavatar="onChooseavatar"
          :style="{
            background: 'url(' + loginAvatar + ')',
          }"
        >
          <uni-icons v-if="!userInfo.avatarUrl" type="person-filled" color="#AFAFAF" size="100" />
        </button>
      </view>
      <view class="nicknameInput">
        <input
          type="nickname"
          class="inputNickname"
          placeholder="请输入昵称"
          v-model="userInfo.nickname"
          @blur="blur"
        />
      </view>
      <MyButton @tap="login" content="登录" backgroundcolor="#12a66a"></MyButton>
      <view style="margin-top: 20rpx; font-size: 30rpx">登录后开启更多功能</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .header {
    height: 300rpx;
    background-color: #12a66a;
    padding: 0 20rpx;
    .avatarBox {
      display: flex;
      align-items: center;
      height: 200rpx;
      .avatar {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        background-color: skyblue;
      }
      .bodyBox {
        flex: 1;
        height: 120rpx;
        padding-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .nickname {
          font-family: '微软雅黑';
          font-size: 40rpx;
          padding-bottom: 10rpx;
          color: #000;
          font-weight: 700;
        }
        .label {
          font-size: 26rpx !important;
          padding-right: 10rpx;
        }
      }
      .detail {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120rpx;
        width: 70rpx;
      }
    }
  }
  .body {
    position: relative;
    top: -100rpx;
    z-index: 999;
    border-radius: 10rpx;
    height: 400rpx;
    margin: 0 20rpx;
    box-sizing: border-box;
    .collectBox,
    .messageBox {
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      height: 280rpx;
      margin: 0 20rpx 20rpx 20rpx;
      padding: 20rpx;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);

      .liked {
        padding-bottom: 20rpx;
        padding-left: 20rpx;
        border-bottom: 1px solid #ccc;
      }
      .itemsBox {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 180rpx;
        font-weight: 700;
        font-size: 28rpx;
        .items {
          display: flex;
          width: 200rpx;
          height: 180rpx;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 10rpx;
          &:active {
            background-color: #eee;
          }
          .img {
            width: 60rpx;
            height: 60rpx;
            padding-bottom: 10rpx;
          }
        }
      }
    }
    .messageBox {
      height: 160rpx;
      .itemsBox {
        height: 140rpx;
      }
    }
    .list {
      height: auto;
      background-color: #fff;
      margin: 0 20rpx 20rpx 20rpx;
      border-radius: 10rpx;
      box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
      .item {
        display: flex;
        justify-content: space-between;
        padding: 30rpx;
        font-size: 28rpx;
        &:active {
          background-color: #eee;
        }
      }
    }
  }
}
.unLog {
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginBox {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 220rpx;
      height: 220rpx;
      background-color: #ccc !important;
      border-radius: 50%;
      margin-bottom: 20rpx;
      background-size: contain !important;
    }
    .nicknameInput {
      display: flex;
      margin: 20rpx 10rpx;
      align-items: center;
      font-size: 34rpx;
      color: #aaa;
      .inputNickname {
        box-sizing: border-box;
        font-size: 28rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        width: 50vw;
        margin-bottom: 100rpx;
        border-bottom: 1rpx solid #ccc;
        color: #000;
      }
    }
  }
}
</style>

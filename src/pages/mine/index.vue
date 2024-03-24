<script lang="ts" setup>
import { ref } from 'vue'
import UnLog from './components/UnLog.vue'
import { onLoad, onPullDownRefresh, onShow } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { http } from '@/utils/http'

const userInfoStore = useUserInfoStore()
// 大坑！！！！！解构赋值还是会丢失响应式的，但是log出来还是proxy？
const { userInfo } = storeToRefs(userInfoStore)

onLoad(() => {
  let userInfo = uni.getStorageSync('UserInfo')
  if (userInfo) {
    // 转成对象
    userInfo = JSON.parse(userInfo)
    userInfo = userInfo.userInfo
    useUserInfoStore().updateUserInfo(userInfo)
    isHeadShow.value = true
  } else {
    isHeadShow.value = false
  }
})
onShow(() => {
  formatLabel()
  if (userInfo.value.token) {
    isHeadShow.value = true
  } else {
    isHeadShow.value = false
  }
})
// 标签数组
let tagList = ref<string[]>([])
// 标签格式化
const formatLabel = () => {
  if (userInfo.value) {
    // tag数组处理
    for (let i = 0; i < tagList.value.length; i++) tagList.value.pop()
    if (userInfo.value.userLabel.includes('-')) {
      tagList.value = userInfo.value.userLabel.split('-')
    } else if (userInfo.value.userLabel !== '') {
      tagList.value.push(userInfo.value.userLabel)
    } else {
      // tag数组
      for (let i = 0; i < tagList.value.length; i++) tagList.value.pop()
    }
  } else {
    isHeadShow.value = false
  }
}

// 下拉刷新
onPullDownRefresh(async () => {
  console.log('下拉刷新')

  // 重新获取用户数据
  const res = await http({
    url: `/app/user/getUserInfoByid?ID=${userInfo.value.ID}`,
  })
  console.log('刷新返回的数据', res.data.reuserData)
  // 更新本地仓库
  userInfoStore.updateUserInfo(res.data.reuserData)
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
// 跳转到修改个人资料页面
const navigatetoPerson = () => {
  uni.navigateTo({
    url: '/subpackage/personal_data/index',
  })
}
let isHeadShow = ref(true)

// 改变登录状态
const changeIsLog = (val: boolean) => {
  formatLabel()
  isHeadShow.value = val
}

// 跳转非tabbar页面
const navigateTo = (target: string) => {
  uni.navigateTo({
    url: `/subpackage/${target}/index`,
  })
}
// 跳转到个人主页
const switchToPersonPage = () => {
  uni.navigateTo({ url: `/pages/mine/personPage/index?userID=${userInfo.value.ID}` })
}
</script>

<template>
  <view class="container">
    <view class="header" v-if="isHeadShow">
      <!-- 头像 -->
      <image
        class="avatar"
        @tap="navigatetoPerson"
        :src="userInfo.userAvatarUrl"
        mode="scaleToFill"
      />
      <!-- 昵称 -->
      <view class="nickname">
        {{ userInfo.userNickname }}
      </view>
      <!-- 标签栏 -->
      <view class="tagList">
        <uni-tag
          v-for="(item, index) in tagList"
          :key="index"
          class="label"
          :text="item"
          :circle="true"
          type="primary"
          size="small"
        ></uni-tag>
      </view>
      <!-- 粉丝数量等 -->
      <view class="dataBox">
        <view class="itemBox">
          <view class="num">{{ userInfo.loveNumber }}</view>
          <view class="text">获赞</view>
        </view>
        <view class="itemBox" @tap="navigateTo('myFriends')">
          <view class="num">{{ userInfo.fansNumber }}</view>
          <view class="text">粉丝</view>
        </view>
        <view class="itemBox" @tap="navigateTo('myFollowers')">
          <view class="num">{{ userInfo.followerNumber }}</view>
          <view class="text">关注</view>
        </view>
      </view>
    </view>
    <template v-else>
      <UnLog @changeIsLog="changeIsLog"></UnLog>
    </template>
    <!-- 收藏、订阅 -->
    <view class="configBox">
      <view class="itemBox" @tap="navigateTo('myCollection')">
        <uni-icons type="star" size="26" style="margin-right: 10rpx" />
        收藏
      </view>
      <view class="itemBox noneBorder" @tap="navigateTo('subscribe')">
        <uni-icons type="calendar" size="26" style="margin-right: 10rpx" />
        订阅
      </view>
    </view>
    <!-- 草稿、订阅、个人主页 -->
    <view class="configBox">
      <view class="itemBox" @tap="navigateTo('PostWriting')">
        <uni-icons type="compose" size="26" style="margin-right: 10rpx" />
        发布文章
      </view>
      <view class="itemBox" @tap="navigateTo('postManage')">
        <uni-icons type="eye" size="26" style="margin-right: 10rpx" />
        内容管理
      </view>
      <view class="itemBox noneBorder" @tap="switchToPersonPage">
        <uni-icons type="person" size="26" style="margin-right: 10rpx" />
        个人主页
      </view>
    </view>
    <!-- 我的队伍、我的经历、关于我们 -->
    <view class="configBox">
      <view class="itemBox" @tap="navigateTo('myTeam')">
        <uni-icons type="flag" size="26" style="margin-right: 10rpx" />
        我的队伍
      </view>
      <view class="itemBox" @tap="navigateTo('myExperience')">
        <uni-icons type="videocam" size="26" style="margin-right: 10rpx" />
        我的经历
      </view>
      <view class="itemBox" @tap="navigateTo('aboutUs')">
        <uni-icons type="info" size="26" style="margin-right: 10rpx" />
        关于我们
      </view>
      <view class="itemBox noneBorder" @tap="navigateTo('moreSetting')">
        <uni-icons type="gear" size="26" style="margin-right: 10rpx" />
        更多设置
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding-bottom: 100rpx;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 380rpx;
    background: linear-gradient(to right bottom, #7bd686, #4c9872);
    margin: 30rpx 40rpx;
    margin-top: 90rpx;
    border-radius: 100rpx;
    .avatar {
      position: absolute;
      top: -80rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      border: 6rpx solid #fff;
    }
    .nickname {
      margin-top: 100rpx;
      font-weight: 700;
      font-size: 36rpx;
      color: #fff;
    }
    .tagList {
      display: flex;
      width: 60%;
      justify-content: space-evenly;
      margin-top: 10rpx;
    }
    .dataBox {
      width: 90%;
      margin-top: 30rpx;
      display: flex;
      justify-content: space-evenly;
      color: #fff;
      .itemBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          font-size: 56rpx;
        }
        .text {
          color: #eee;
          font-size: 28rpx;
        }
      }
    }
  }
  .configBox {
    margin: 0rpx 30rpx;
    margin-top: 20rpx;
    background-color: #fff;
    padding: 10rpx 30rpx;
    border-radius: 20rpx;
    box-shadow: 0rpx 4rpx 12rpx 2rpx #ddd;
    .itemBox {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #eee;
      font-size: 28rpx;
      &:active {
        background-color: #fdfdfd;
      }
    }
    .noneBorder {
      border: 0;
    }
  }
}
</style>

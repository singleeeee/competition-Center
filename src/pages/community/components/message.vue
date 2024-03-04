<template>
  <view class="container">
    <scroll-view
      scroll-y
      :style="{ height: windowHeight * 2 - 100 + 'rpx' }"
      @refresherrefresh="pulldownRefresh"
      :refresher-triggered="pulldownTriggered"
      :refresher-threshold="50"
      :refresher-enabled="true"
    >
      <view v-if="messageList.length > 0">
        <view
          class="messageBox"
          v-for="item in messageList"
          :key="item.id"
          @tap="navigateToChat(item.userID)"
        >
          <view style="position: relative">
            <image class="avatar" :src="item.userAvatarUrl" mode="scaleToFill" />
            <view class="dot" v-show="item.unReadCount > 0"></view>
          </view>
          <view class="bodyBox">
            <view class="nickname">{{ item.userName }}</view>
            <view class="message">{{ item.lastMessage }}</view>
          </view>
          <view class="timeBox">
            <view class="time">{{ toLocalTime(item.lastMessageTime * 1000, false) }}</view>
            <view class="num">
              <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
            </view>
          </view>
        </view>
      </view>
      <view v-else-if="!userInfoStore.userInfo.token" class="login"> 请先登录!</view>
      <view v-else>
        <uni-load-more iconType="circle" :status="messageStatus" :contentText="loadingText" />
      </view>
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { useChatHistoryStore } from '@/stores/modules/chatHistoryStore'
import { ref } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
import { onShow } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores/modules/userInfoStore'
const userInfoStore = useUserInfoStore()
onShow(() => {})
// 信息状态
let messageStatus = ref('noMore')
// 状态文字
const loadingText = {
  contentdown: '下拉刷新',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多信息了',
}
// 获取可用屏幕高度
let windowHeight = 0
;(() => {
  const deviceInfo = uni.getWindowInfo()
  windowHeight = deviceInfo?.windowHeight - 40
})()
// 控制下拉刷新
let pulldownTriggered = ref(false)
// 监听刷新事件
const pulldownRefresh = () => {
  pulldownTriggered.value = true
  messageStatus.value = 'loading'
  messageList.value = []
  setTimeout(() => {
    messageList.value = chatHistoryStore.unReadInfoList
    pulldownTriggered.value = false
    messageStatus.value = 'noMore'
  }, 1000)
}
const chatHistoryStore = useChatHistoryStore()
let messageList = ref(chatHistoryStore.unReadInfoList)

// 跳转到聊天页面
const navigateToChat = (userID) => {
  uni.navigateTo({
    url: `/pages/community/chatRoom/index?targetID=${userID}`,
  })
}
</script>
<style scoped lang="scss">
$width: 8vh;
.container {
  .messageBox {
    height: 130rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    padding: 60rpx 20rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10%;
      background-color: skyblue;
    }
    .dot {
      position: absolute;
      height: 10rpx;
      width: 10rpx;
      top: -10rpx;
      right: -6rpx;
      background-color: red;
      padding: 6rpx;
      font-size: 18rpx;
      color: #fff;
      border-radius: 20rpx;
    }
    .bodyBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      .nickname {
        font-size: 28rpx;
        padding-bottom: 10rpx;
      }
      .message {
        font-size: 20rpx;
        color: #888;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .timeBox {
      height: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 200rpx;
      font-size: 20rpx;
      color: #666;
      .num {
        padding-top: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.login {
  text-align: center;
  margin-top: 10vh;
  font-size: 40rpx;
}
</style>

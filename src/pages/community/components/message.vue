<template>
  <view class="container">
    <scroll-view
      scroll-y
      :style="{ height: windowHeight - 50 + 'px' }"
      @refresherrefresh="pulldownRefresh"
      :refresher-triggered="pulldownTriggered"
      :refresher-threshold="50"
      :refresher-enabled="true"
    >
      <view v-if="messageList.length > 0" style="padding-bottom: 100rpx">
        <!-- 比赛订阅信息 -->
        <h1 class="title">比赛订阅信息</h1>
        <view class="friendMessageBox">
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
        </view>
        <!-- 消息列表 -->
        <h1 class="title">好友信息</h1>
        <view class="friendMessageBox">
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
          <view
            class="messageBox"
            v-for="item in messageList"
            :key="item.messageTime"
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
              <view class="time">{{ toLocalTime(item.lastMessageTime, false) }}</view>
              <view class="num">
                <uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else-if="!userInfoStore.userInfo.token" class="login">
        请先登录!
        <image class="img" src="../../../static/empty/unLog.png" mode="scaleToFill" />
      </view>
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
// 获取可用屏幕高度
let windowHeight = 0
;(() => {
  const deviceInfo = uni.getWindowInfo()
  windowHeight = deviceInfo?.windowHeight
})()
const userInfoStore = useUserInfoStore()
onShow(() => {
  undateUnreadInfo()
})
const chatHistoryStore = useChatHistoryStore()
let messageList = ref(chatHistoryStore.chatInfoMap)
// 信息状态
let messageStatus = ref('noMore')
// 状态文字
const loadingText = {
  contentdown: '下拉刷新',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多信息了',
}
// 控制下拉刷新
let pulldownTriggered = ref(false)
// 监听刷新事件
const pulldownRefresh = () => {
  pulldownTriggered.value = true
  messageStatus.value = 'loading'
  messageList.value = []
  setTimeout(() => {
    undateUnreadInfo()
    pulldownTriggered.value = false
    messageStatus.value = 'noMore'
  }, 1000)
}
// 更新未读信息
const undateUnreadInfo = () => {
  // chatHistoryStore.resetUnreadList()
  messageList.value = chatHistoryStore.chatInfoMap
}

// 跳转到聊天页面
const navigateToChat = (userID) => {
  uni.navigateTo({
    url: `/pages/community/chatRoom/index?targetID=${+userID}`,
  })
}
</script>
<style scoped lang="scss">
.container {
  padding: 0 20rpx;
  .title {
    font-weight: 700;
    font-size: 30rpx;
    padding-left: 20rpx;
    margin-top: 20rpx;
  }
  .friendMessageBox {
    margin-top: 20rpx;
    border-radius: 20rpx;
    overflow: hidden;
    background-color: #fff;
    padding: 10rpx 20rpx;
    .messageBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10rpx 0;
      padding-bottom: 10rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #ebeef5;
      background-color: #fff;
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 10%;
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
        justify-content: space-between;
        height: 100rpx;
        padding: 0 25rpx;
        box-sizing: border-box;
        margin-bottom: 10rpx;
        .nickname {
          font-size: 28rpx;
          font-weight: 700;
        }
        .message {
          font-size: 22rpx;
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
        font-size: 22rpx;
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
}
.login {
  height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0;
  background-color: #f2f2fa;
  text-align: center;
  font-size: 40rpx;
  font-weight: 700;
}
</style>

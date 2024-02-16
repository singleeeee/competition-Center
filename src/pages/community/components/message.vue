<template>
  <view class="container" v-if="messageList.length > 0">
    <view
      class="messageBox"
      v-for="item in messageList"
      :key="item.id"
      @tap="navigateToChat(item.userID)"
    >
      <view>
        <image class="avatar" :src="item.userAvatarUrl" mode="scaleToFill" />
      </view>
      <view class="bodyBox">
        <view class="nickname">{{ item.userName }}</view>
        <view class="message">{{ item.lastMessage }}</view>
      </view>
      <view class="timeBox">
        <view class="time">{{ item.lastMessageTime }}</view>
        <view class="num"
          ><uni-tag :circle="true" :text="item.unReadCount" type="error" size="mini"
        /></view>
      </view>
    </view>
  </view>
  <view v-else> zan</view>
</template>
<script lang="ts" setup>
import { useChatHistoryStore } from '@/stores/modules/chatHistoryStore'
import { ref } from 'vue'
const chatHistoryStore = useChatHistoryStore()
const messageList = ref(chatHistoryStore.unReadInfoList)
console.log(messageList.value, '未读信息')

// 跳转到聊天页面
const navigateToChat = (userID) => {
  uni.navigateTo({
    url: `/pages/community/chatRoom/index?targetID=${userID}`,
  })
}
// const messageList = ref([
//   // {
//   //   id: 1,
//   //   avatar: '',
//   //   nickname: '马春丽',
//   //   message: '我想回家',
//   //   time: '刚刚',
//   //   num: '99+',
//   // },
// ])
</script>
<style scoped lang="scss">
.container {
  .messageBox {
    height: 130rpx;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
    .avatar {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      background-color: skyblue;
    }
    .bodyBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      .nickname {
        font-size: 28rpx;
        padding-bottom: 10rpx;
      }
      .message {
        font-size: 20rpx;
      }
    }
    .timeBox {
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 120rpx;
      font-size: 20rpx;
      // background-color: pink;

      .num {
        padding-top: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

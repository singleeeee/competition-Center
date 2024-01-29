<template>
  <view class="chatRoom">
    <view v-for="(items, index) in timeChatList" :key="index" class="each_time">
      <view class="date">{{ items.time }}</view>
      <view v-for="(item, index) in items.chatList" :key="index" class="detail_info">
        <view class="chat-Box">
          <view v-if="!item.myWord" class="friendBox">
            <view class="avatar">
              <image class="avatar" :src="item.avatarUrl" />
            </view>
            <view class="content">{{ item.content }}</view>
          </view>
          <view wx:else class="myBox">
            <view class="avatar">
              <image class="avatar" :src="item.avatarUrl" alt="" />
            </view>
            <view class="content">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const timeChatList = [
  {
    id: 1,
    time: '15:30',
    chatList: [
      {
        myWord: false,
        content: '其实我每天只想你一次',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      },
      {
        myWord: true,
        content: '那么少',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
      },
      {
        myWord: false,
        content: '因为一想就是一整天',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      },
    ],
  },
  {
    id: 2,
    time: '06:20',
    chatList: [
      {
        myWord: false,
        content:
          '怎样说呢，你对我笑的时候啊，感觉就好像我是只剩１％电的手机，就在哆哆嗦嗦要关机的那一瞬间，突然被你接上了充电器。',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      },
    ],
  },
  {
    id: 3,
    time: '07:20',
    chatList: [
      {
        myWord: false,
        content: '我想在你那里买一块地。',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      },
      {
        myWord: true,
        content: '买什么地',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
      },
      {
        myWord: false,
        content: '买你的死心塌地',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      },
      {
        myWord: true,
        content: '....',
        avatarUrl:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
.chatRoom {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.chatRoom .each_time .date {
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  font-size: 26rpx;
  color: #aaa;
  margin-top: 20rpx;
}
.chatRoom .each_time .detail_info {
  width: 100vw;
}
.chatRoom .each_time .detail_info .chat-Box {
  width: 100%;
}
.chatRoom .each_time .detail_info .chat-Box .friendBox,
.chatRoom .each_time .detail_info .chat-Box .myBox {
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx;
  display: flex;
  min-width: 20%;
}
.chatRoom .each_time .detail_info .chat-Box .friendBox .avatar,
.chatRoom .each_time .detail_info .chat-Box .myBox .avatar {
  width: 80rpx;
  min-width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
}
.chatRoom .each_time .detail_info .chat-Box .friendBox .content,
.chatRoom .each_time .detail_info .chat-Box .myBox .content {
  text-indent: 10rpx;
  max-width: 50%;
  background-color: purple;
  margin-left: 10rpx;
  background-color: #fff;
  padding: 20rpx 15rpx 20rpx 15rpx;
  border-radius: 10rpx;
  font-size: 26rpx;
}
.chatRoom .each_time .detail_info .chat-Box .myBox {
  display: flex;
  flex-direction: row-reverse;
  border-radius: 4rpx;
}
.chatRoom .each_time .detail_info .chat-Box .myBox .content {
  margin-left: 0;
  margin-right: 10rpx;
  background-color: #95ec69;
}
</style>

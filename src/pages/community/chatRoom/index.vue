<template>
  <view class="container">
    <view class="chatRoom" v-if="historyIndex !== -1">
      <!-- 一个时间段 -->
      <!-- {{ chatInfoMap[historyIndex].chatList }} -->
      <scroll-view
        id="scrollBox"
        scroll-y
        class="each_time"
        :scroll-top="scrollTop"
        :upper-threshold="50"
        refresher-enabled
        refresher-background="#f0f0f0"
        :refresher-triggered="loadingStatus"
        @refresherrefresh="onRefresh"
      >
        <!-- 时间 -->
        <view class="date" v-show="index < 1">{{
          toLocalTime(chatInfoMap[historyIndex].lastMessageTime * 1000, false)
        }}</view>
        <!-- 聊天内容 -->
        <view v-for="(item, i) in chatInfoMap[historyIndex].chatList" :key="i" class="detail_info">
          <view class="chat-Box">
            <!-- 对面发的 -->
            <view v-if="!item.myWord" class="friendBox">
              <view class="avatar">
                <image class="avatar" :src="item.avatarUrl" />
              </view>
              <view v-if="!item.isImg" class="content">{{ item.content }}</view>
              <view v-else class="imgBox">
                <image class="img" :src="item.imgUrl" mode="widthFix" />
              </view>
            </view>
            <!-- 自己发的 -->
            <view v-else class="myBox">
              <view class="avatar">
                <image class="avatar" :src="item.avatarUrl" />
              </view>
              <!-- 内容 -->
              <view v-if="!item.isImg" class="content">{{ item.content }}</view>
              <view v-else class="imgBox">
                <image class="img" :src="item.imgUrl" mode="widthFix" />
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view v-else>查无此人</view>
    <!-- 底部输入提示框 -->
    <view class="inputArea">
      <view class="input" @tap="openInput">
        <uni-icons style="padding-right: 10rpx" type="compose" color="#ccc" size="24" />
      </view>
    </view>
  </view>
  <uni-popup ref="popup" type="center" @mask-click="closeInput">
    <MyInput v-model:textarea="textarea" @send="send" @clearImgList="clearImgList"></MyInput>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, getCurrentInstance } from 'vue'
import MyInput from '@/components/MyInput.vue'
import { onShow, onLoad, onUnload } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { http } from '@/utils/http'
import { useChatHistoryStore } from '@/stores/modules/chatHistoryStore'
import { toLocalTime } from '@/utils/toLocalTime'
import { myDebounce } from '@/utils/myDebounce'

// 还有个问题我看完未读信息之后，外面的消息列表不会更新(todo)

// 下拉加载状态
let loadingStatus = ref(false)
// 下拉刷新
const onRefresh = () => {
  loadingStatus.value = true
  console.log('下拉刷新')
  getHistoryInfo(targetID.value)
}
// 目前对话用户的userID
let targetID = ref(0)
// 目前对话用户所在下标
let historyIndex = ref(0)
// 获取用户id等
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
// 获取ws
const chatHistoryStore = useChatHistoryStore()
// 消息记录数组
const { chatInfoMap } = storeToRefs(chatHistoryStore)

onLoad((options) => {
  targetID.value = +options?.targetID
  // 提取出于当前用户有关的消息记录
  // 直接使用小程序打开是没有chatInfoMap的，因为还没加载好
  historyIndex.value = chatInfoMap.value.findIndex((user) => {
    return user.userID === targetID.value
  })
  // 获取用户历史信息
  getFirstLoadInfo()
})
// 动态维护获取历史记录时需要的时间
let earliestTime = ref(0)
// 获取第一次加载所需的历史信息
const getFirstLoadInfo = async () => {
  const res = await http({
    url: '/app/msg/getHistoryMessageList',
    data: {
      formUserId: userInfo.value.ID,
      toUserId: targetID.value,
      messageTime: 1907839100, // 由未读信息的上一次时间决定 × ，第二次进去就看不到登录之后发的信息了
      page: 1,
      pageSize: 10, // 要与删除那边同步大小
    },
  })
  let avatarUrl = chatInfoMap.value[historyIndex.value].userAvatarUrl
  // 提取数据
  for (let i = 0; i < res.data.list.length; i++) {
    const item = res.data.list[i]
    // 动态维护最久以前的信息时间
    if (i === res.data.list.length - 1) earliestTime.value = item.messageTime
    // 换成我的头像
    if (item.formUserId === userInfo.value.ID) {
      avatarUrl = userInfo.value.userAvatarUrl
    } else {
      avatarUrl = chatInfoMap.value[historyIndex.value].userAvatarUrl
    }
    const message = {
      messageTime: item.messageTime,
      isImg: item.isImg,
      myWord: item.formUserId === userInfo.value.ID,
      content: item.messageContent,
      avatarUrl,
      imgUrl: item.messageContent,
    }
    chatHistoryStore.insertMessage(targetID.value, message)
  }
  scrollToBottom()
}
onUnload(() => {
  console.log('卸载')
  chatHistoryStore.delLatestInfo(targetID.value)
})
// 查找历史记录
let currentPageNum = 1
let pageSize = 10
// 获取历史记录
const getHistoryInfo = myDebounce(async (targetID: number) => {
  const res = await http({
    url: '/app/msg/getHistoryMessageList',
    data: {
      formUserId: userInfo.value.ID,
      toUserId: +targetID,
      messageTime: earliestTime.value,
      page: currentPageNum,
      pageSize: pageSize,
    },
  })
  // 提取历史记录数据
  const insertData = res.data.list.map((item) => {
    // 动态维护最久以前的信息时间
    let userAvatarUrl = ''
    // 换成我的头像
    if (item.formUserId === userInfo.value.ID) {
      userAvatarUrl = userInfo.value.userAvatarUrl
    } else {
      userAvatarUrl = chatInfoMap.value[historyIndex.value].userAvatarUrl
    }
    const obj = {
      isImg: item.isImg,
      myWord: item.formUserId === userInfo.value.ID,
      content: item.messageContent,
      avatarUrl: userAvatarUrl,
      imgUrl: item.messageContent,
    }
    return obj
  })
  console.log('历史记录', insertData)
  if (insertData.length === 0) {
    uni.showToast({
      title: '没有更多历史信息了',
      icon: 'none',
    })
    loadingStatus.value = false
    return
  } else {
    for (let i = 0; i < insertData.length; i++) {
      chatHistoryStore.insertMessage(targetID, insertData[i])
    }
    currentPageNum++
  }
  loadingStatus.value = false
  scrollTop = bottomPx
})
//滚动到最新位置
onMounted(() => {
  scrollToBottom()
})
// 距离顶部位置
let bottomPx = 0
// 获取当前组件实例
const instance = getCurrentInstance()
// 滚动条位置
let scrollTop = 0
// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    scrollTop = 100000
  })
}

// 输入框popup
const popup = ref()
// 打开输入框
const openInput = () => {
  popup.value.open('bottom')
}
// 输入框绑定内容
let textarea = ref('')
// 关闭输入框
const closeInput = () => {
  console.log(textarea.value)
}
// ws发送信息
const wsSend = (msg) => {
  // 如果发送是图片
  if (msg.isImg) {
    msg.content = msg.imgUrl
  }
  let data = JSON.stringify({
    toUserId: +targetID.value,
    isImg: msg.isImg,
    messageContent: msg.content,
  })
  chatHistoryStore.sendMessage(+targetID.value, data)
  scrollToBottom()
}

// 发送信息
const send = (imgList: string[]) => {
  console.log(imgList, textarea.value)
  // 什么都没
  if (textarea.value === '' && imgList.length === 0) {
    uni.showToast({
      title: '消息不能为空！',
      icon: 'none',
    })
    return
  } else if (imgList.length !== 0) {
    // 发送 信息（也许没有）+图片
    if (textarea.value !== '') {
      const sendArr = {
        isImg: false,
        myWord: true,
        content: textarea.value,
        avatarUrl: userInfo.value.userAvatarUrl,
        imgUrl: '',
      }
      // 塞入数组。同时需要发ws
      wsSend(sendArr)
    }
    // 如果有图片，则发送图片
    for (let i = 0; i < imgList.length; i++) {
      const sendArr = {
        isImg: true,
        myWord: true,
        content: '',
        avatarUrl: userInfo.value.userAvatarUrl,
        imgUrl: imgList[i],
      }
      wsSend(sendArr)
    }
    textarea.value = ''
    popup.value.close()
  } else {
    // 发送文字
    const sendArr = {
      isImg: false,
      myWord: true,
      content: textarea.value,
      avatarUrl: userInfo.value.userAvatarUrl,
      imgUrl: '',
    }
    wsSend(sendArr)
    textarea.value = ''
    popup.value.close()
  }
}
// 清空组件的图片列表
const clearImgList = () => {
  console.log('清空图片列表')
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  overflow-y: scroll;
  background-color: #f5f5f5;
}
.container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
  background-color: transparent;
  opacity: 0;
}
.inputArea {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 99;
  height: 7vh;
  background-color: #eee;
  display: flex;
  align-items: center;
  .input {
    height: 60rpx;
    box-sizing: border-box;
    margin: 0 40rpx;
    padding: 0 10rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    color: #ccc;
    font-size: 28rpx;
  }
}

.chatRoom {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding-bottom: 7vh;
}
.chatRoom .each_time {
  height: 93vh;
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
  margin-top: 20rpx;
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
  display: flex;
  align-items: center;
  text-indent: 10rpx;
  max-width: 50%;
  margin-left: 10rpx;
  background-color: #fff;
  padding: 15rpx 10rpx 15rpx 10rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
}

.chatRoom .each_time .detail_info .chat-Box .friendBox .imgBox,
.chatRoom .each_time .detail_info .chat-Box .myBox .imgBox {
  max-width: 50%;
  width: 42%;
  margin-right: 30rpx;
  border-radius: 10rpx;
}
.chatRoom .each_time .detail_info .chat-Box .friendBox .img,
.chatRoom .each_time .detail_info .chat-Box .myBox .img {
  width: 100%;
  margin-left: 10rpx;
  // max-height: 300rpx;
  border-radius: 10rpx;
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

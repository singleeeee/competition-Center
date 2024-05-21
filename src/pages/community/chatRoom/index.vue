<template>
  <view class="container">
    <view class="chatRoom" v-if="historyIndex !== -1">
      <view class="ball1"></view>
      <view class="ball2"></view>
      <view class="ball3"></view>
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
        <!-- 是否有对话记录 -->
        <template v-if="chatInfoMap[historyIndex].chatList.length > 0">
          <!-- 聊天内容 -->
          <view
            v-for="(item, i) in chatInfoMap[historyIndex].chatList"
            :key="i"
            class="detail_info"
          >
            <!-- 时间 -->
            <!-- <view
              class="date"
              v-if="
                item.messageTime - chatInfoMap[historyIndex].chatList[i - 1]?.messageTime > 4000
              "
              >{{ dayjs(item.messageTime * 1000).format('M/D HH:mm') }}
            </view> -->
            <template v-if="item.type === 1">
              <view class="chat-Box">
                <!-- 对面发的 -->
                <view v-if="!item.myWord" class="friendBox">
                  <!-- 头像 -->
                  <view class="avatar" @click="toUserInfo(targetID)">
                    <image class="avatar" :src="item.avatarUrl" />
                  </view>
                  <!-- 普通内容 -->
                  <div v-if="!item.isImg" style="max-width: 60%">
                    <text :user-select="true" class="content">{{ item.content }}</text>
                    <view id="yourTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </div>
                  <!-- 图片 -->
                  <view v-else class="imgBox">
                    <image
                      @tap="onClickImg(item.imgUrl)"
                      class="img"
                      :src="item.imgUrl"
                      mode="widthFix"
                    />
                    <view id="yourTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                </view>
                <!-- 自己发的 -->
                <view v-else class="myBox">
                  <view class="avatar">
                    <image class="avatar" :src="item.avatarUrl" />
                  </view>
                  <view
                    v-if="!item.isImg"
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      max-width: 60%;
                    "
                  >
                    <!-- 内容 -->
                    <text :user-select="true" class="content">{{ item.content }} </text>
                    <view id="myTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                  <view v-else class="imgBox">
                    <image
                      @tap="onClickImg(item.imgUrl)"
                      class="img"
                      :src="item.imgUrl"
                      mode="widthFix"
                    />
                    <view id="myTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                </view>
              </view>
            </template>
            <template v-else-if="item.type === 2">
              <view class="chat-Box">
                <!-- 对面发的 -->
                <view v-if="!item.myWord" class="friendBox">
                  <!-- 头像 -->
                  <view class="avatar" @click="toUserInfo(targetID)">
                    <image class="avatar" :src="item.avatarUrl" />
                  </view>
                  <!-- 普通内容 -->
                  <div v-if="!item.isImg" style="max-width: 60%">
                    <text :user-select="true" class="content">{{ item.content }}</text>
                    <view id="yourTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </div>
                  <!-- 图片 -->
                  <view v-else class="imgBox">
                    <image
                      @tap="onClickImg(item.imgUrl)"
                      class="img"
                      :src="item.imgUrl"
                      mode="widthFix"
                    />
                    <view id="yourTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                </view>
                <!-- 自己发的 -->
                <view v-else class="myBox">
                  <view class="avatar">
                    <image class="avatar" :src="item.avatarUrl" />
                  </view>
                  <view
                    v-if="!item.isImg"
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      max-width: 60%;
                    "
                  >
                    <!-- 内容 -->
                    <text :user-select="true" class="content">{{ item.content }} </text>
                    <view id="myTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                  <view v-else class="imgBox">
                    <image
                      @tap="onClickImg(item.imgUrl)"
                      class="img"
                      :src="item.imgUrl"
                      mode="widthFix"
                    />
                    <view id="myTime">{{ dayjs(item.messageTime * 1000).fromNow() }}</view>
                  </view>
                </view>
              </view>
            </template>
            <template v-else-if="item.type === 3 && !item.myWord">
              <inviteInfo :data="JSON.parse(item.content)" />
            </template>
          </view>
        </template>
        <template v-else>
          <view style="text-align: center; color:#ccc;padding-top: 20rpx;'"> 暂无聊天记录 </view>
        </template>
      </scroll-view>
    </view>
    <!-- 底部输入提示框 -->
    <!-- @tap="openInput" -->
    <view class="inputArea">
      <image
        style="width: 54rpx; height: 54rpx; margin-left: 20rpx"
        src="@/static/Input/camera.png"
        @tap="chooseImg"
      ></image>
      <view class="input">
        <textarea
          class="textarea"
          v-model="textareaValue"
          auto-height
          placeholder="输入您的消息"
          :cursor-spacing="textareaBottomDistance"
          @keyboardheightchange="keyboardheightchange"
        />
      </view>
      <view
        style="
          height: 62rpx;
          width: 62rpx;
          background-color: #33b8ff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16rpx;
        "
        @tap="send()"
      >
        <image style="width: 28rpx; height: 28rpx" src="@/static/Input/send.png"></image>
      </view>
    </view>
    <!-- 小球背景 -->
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { http } from '@/utils/http'
import { useChatHistoryStore } from '@/stores/modules/chatHistoryStore'
import { myDebounce } from '@/utils/myDebounce'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import inviteInfo from './components/inviteInfo.vue'
dayjs.extend(relativeTime)

// 点击图片预览
const onClickImg = (tempFilePaths: any) => {
  let fileUrlArray = [tempFilePaths]
  uni.previewImage({
    urls: fileUrlArray,
    success: (result) => {},
    fail: (error) => {
      console.log(error)
    },
  })
}

// 下拉加载状态
let loadingStatus = ref(false)
// 下拉刷新
const onRefresh = () => {
  loadingStatus.value = true
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
let { chatInfoMap } = storeToRefs(chatHistoryStore)
// 去用户主页
const toUserInfo = (userId: number) => {
  uni.navigateTo({
    url: `/pages/mine/personPage/index?userID=${userId}`,
  })
}

// 侦听数据刷新
watch(
  chatInfoMap,
  (newValue, oldValue) => {
    scrollToBottom()
  },
  { deep: true },
)
//滚动到最新位置
onMounted(() => {
  scrollToBottom()
})
onLoad(async (options) => {
  targetID.value = +options?.targetID
  // 提取出于当前用户有关的消息记录
  // 直接使用小程序打开是没有chatInfoMap的，因为还没加载好
  historyIndex.value = chatInfoMap.value.findIndex((user) => {
    return user.userID === targetID.value
  })
  uni.setNavigationBarTitle({
    title: chatInfoMap.value[historyIndex.value].userName,
  })
  // 重置历史记录
  await chatHistoryStore.clearChatList(targetID.value)
  // 获取用户历史信息
  await getFirstLoadInfo()
  // 重置未读信息
  chatHistoryStore.resetUnreadList(targetID.value)
})
onUnload(() => {
  // // 重置历史记录
  chatHistoryStore.resetUnreadList(targetID.value)
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
    // 动态维护目前消息列表最久以前的信息时间，用于获取历史记录
    if (i === res.data.list.length - 1) earliestTime.value = item.messageTime
    // 换成我的头像
    if (item.formUserId === userInfo.value.ID) {
      avatarUrl = userInfo.value.userAvatarUrl
    } else {
      avatarUrl = chatInfoMap.value[historyIndex.value].userAvatarUrl
    }
    const message = {
      type: item.type,
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
      type: item.type,
      messageTime: item.messageTime,
      isImg: item.isImg,
      myWord: item.formUserId === userInfo.value.ID,
      content: item.messageContent,
      avatarUrl: userAvatarUrl,
      imgUrl: item.messageContent,
    }
    return obj
  })
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
  scrollTop.value = bottomPx
})

// 距离顶部位置
let bottomPx = 0

let scrollDistance = 1000000 // 必须变动，不然可能会不生效
// 滚动条位置
let scrollTop = ref(10000)
// 滚动到底部
const scrollToBottom = () => {
  scrollTop.value = ++scrollDistance
}

// 输入框绑定内容
let textareaValue = ref('')
type messageType = {
  isImg: boolean
  myWord: boolean
  content: string
  avatarUrl: string
  imgUrl: string
}
// ws发送信息
const wsSend = (msg: messageType) => {
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
const send = () => {
  console.log(textareaValue.value)
  // 什么都没
  if (textareaValue.value === '') {
    uni.showToast({
      title: '消息不能为空！',
      icon: 'none',
    })
    return
  }
  const sendArr: messageType = {
    isImg: false,
    myWord: true,
    content: textareaValue.value,
    avatarUrl: userInfo.value.userAvatarUrl,
    imgUrl: '',
  }
  // 塞入数组。同时需要发ws
  wsSend(sendArr)
  textareaValue.value = ''
}

let textareaBottomDistance = ref(0)
// 键盘高度发生变化
const keyboardheightchange = (e) => {
  console.log(e.target.height, '键盘高度')
  if (e.target.height !== 0) {
    textareaBottomDistance.value = e.target.height
  }
}

// 发送图片
const chooseImg = () => {
  uni.chooseImage({
    count: 1,
    success: (success) => {
      const fileurl = success.tempFilePaths[0]
      uni.uploadFile({
        url: 'http://47.113.177.192:8082/app/upload/file',
        filePath: fileurl,
        name: 'file',
        success: (success) => {
          const {
            data: { url },
          } = JSON.parse(success.data)
          const msg: messageType = {
            isImg: true,
            myWord: true,
            content: '',
            avatarUrl: userInfo.value.userAvatarUrl,
            imgUrl: url,
          }
          wsSend(msg)
        },
        fail: (fail) => {
          uni.showToast({
            title: fail.errMsg,
            mask: true,
            duration: 1000,
          })
        },
      })
    },
  })
}
</script>

<style lang="scss" scoped>
#myTime {
  font-size: 24rpx;
  text-align: end;
  margin: 10rpx 20rpx 0 0;
  color: #9cacbd;
}
#yourTime {
  font-size: 24rpx;
  text-align: start;
  margin: 10rpx 0rpx 0 20rpx;
  color: #9cacbd;
}
.container {
  position: relative;
  min-height: 100vh;
  overflow-y: scroll;
  background-color: #f5f5f5;
}

.chatRoom .ball1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #aaf2f5;
  border-radius: 50%;
  opacity: 0.5;
  box-shadow: 0px 0px 200px 300px #a3e2eb;
}

.chatRoom .ball2 {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #aeeaec;
  border-radius: 50%;
  opacity: 0.5;
  box-shadow: 0px 0px 200px 200px #a3e2eb;
}

.chatRoom .ball3 {
  position: absolute;
  bottom: 50vh;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #fad8d8;
  border-radius: 50%;
  opacity: 0.5;
  box-shadow: 0px 0px 100px 100px #fadcdc;
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
  width: 92vw;
  position: fixed;
  bottom: 40rpx;
  z-index: 99;
  padding: 10rpx 0;
  min-height: 70rpx;
  display: flex;
  align-items: center;
  box-shadow: -2rpx 0 12rpx 2rpx #a3e2eb;
  margin: 0 4vw;
  border-radius: 30rpx;
  background-color: #fff;
  .input {
    box-sizing: border-box;
    margin: 0 20rpx;
    min-height: 60rpx;
    padding: 10rpx 20rpx;
    height: auto;
    width: 70%;
    background-color: #f0f3f8;
    border-radius: 30rpx;
    overflow: hidden;
    .textarea {
      width: 100%;
      color: #000;
      font-size: 28rpx;
      text-align: justify;
      resize: none; /* 禁止调整大小 */
      overflow: hidden; /* 隐藏溢出内容 */
    }
  }

  .imgBox {
    display: flex;
    align-items: center;
  }
}

.chatRoom {
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.chatRoom .each_time {
  height: 100vh;
}

.chatRoom .each_time .detail_info .date {
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
.chatRoom .each_time .detail_info:nth-last-child(1) {
  padding-bottom: 12vh;
}

.chatRoom .each_time .detail_info .chat-Box .friendBox,
.chatRoom .each_time .detail_info .chat-Box .myBox {
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx;
  display: flex;
  margin-top: 20rpx;
  margin-right: 20rpx;
}

.chatRoom .each_time .detail_info .chat-Box .friendBox .avatar,
.chatRoom .each_time .detail_info .chat-Box .myBox .avatar {
  width: 90rpx;
  min-width: 80rpx;
  height: 90rpx;
  border-radius: 10rpx;
}

.chatRoom .each_time .detail_info .chat-Box .friendBox .content,
.chatRoom .each_time .detail_info .chat-Box .myBox .content {
  display: inline-block;
  word-break: break-word;
  text-align: justify;
  background-color: #fff;
  padding: 30rpx 20rpx;
  border-radius: 0 35rpx 35rpx 35rpx;
  font-size: 26rpx;
  letter-spacing: 2rpx;
  box-shadow: 2px 2px 20rpx 4rpx #bcecf3;
  color: #647288;
  font-weight: bold;
  margin-left: 20rpx;
  overflow-wrap: break-word;
}

.chatRoom .each_time .detail_info .chat-Box .friendBox .imgBox,
.chatRoom .each_time .detail_info .chat-Box .myBox .imgBox {
  max-width: 60%;
  width: 42%;
  margin-right: 30rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
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
}

.chatRoom .each_time .detail_info .chat-Box .myBox .content {
  margin-left: 0;
  margin-right: 20rpx;
  background-color: #33b8ff;
  letter-spacing: 2rpx;
  color: #f1f1f1;
  border-radius: 35rpx 35rpx 0 35rpx;
  text-align: justify;
}
</style>

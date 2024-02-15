<template>
  <view class="container">
    <view class="chatRoom">
      <!-- 一个时间段 -->
      <view v-for="(items, index) in timeChatList" :key="index" class="each_time">
        <!-- 时间 -->
        <view class="date">{{ items.time }}</view>
        <!-- 聊天内容 -->
        <view v-for="(item, index) in items.chatList" :key="index" class="detail_info">
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
            <view wx:else class="myBox">
              <view class="avatar">
                <image class="avatar" :src="item.avatarUrl" alt="" />
              </view>
              <!-- 内容 -->
              <view v-if="!item.isImg" class="content">{{ item.content }}</view>
              <view v-else class="imgBox">
                <image class="img" :src="item.imgUrl" mode="widthFix" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="inputArea">
      <view class="input" @tap="openInput">
        <uni-icons style="padding-right: 10rpx" type="compose" color="#ccc" size="24" />
        文明发言</view
      >
    </view>
  </view>
  <uni-popup ref="popup" type="center" @mask-click="closeInput">
    <MyInput v-model:textarea="textarea" @send="send" @clearImgList="clearImgList"></MyInput>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MyInput from '@/components/MyInput.vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { http } from '@/utils/http'
// websocket是否连接
let socketOpen = false
// websocket连接ID
let socketTask: UniApp.SocketTask
// 私聊对象的ID
let targetID: number
// 获取用户id等
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
// 获取token用于ws
const token = userInfoStore.userInfo.token
onLoad((options) => {
  targetID = options?.targetID
  console.log('targetID', targetID)
  // 获取用户历史信息
  getHistoryInfo(targetID)

  // 创建一个 WebSocket 连接。
  socketTask = uni.connectSocket({
    url: 'ws://47.113.177.192:8082/app/msg/ping',
    header: {
      Authorization: token,
    },
    success: () => {
      console.log('发起websocket连接成功!')
    },
  })
  // 监听服务器返回信息
  socketTask.onMessage(async (data) => {
    // 转化返回的数据
    // json格式
    if (data.data[0] === '{') {
      const returnMsg = JSON.parse(data.data)
      console.log('服务器返回信息:', returnMsg)
      // 获取对象头像
      const {
        data: {
          reuserData: { userAvatarUrl },
        },
      } = await http({
        url: `/app/user/getUserInfoByid?ID=${returnMsg.formUserId}`,
      })
      // 发的是图片
      if (returnMsg.isImg) {
        // 处理返回的数据
        const message = {
          isImg: returnMsg.isImg,
          myWord: returnMsg.formUserId === userInfo.value.ID,
          content: '',
          avatarUrl: userAvatarUrl,
          imgUrl: returnMsg.messageContent,
        }
        ;(timeChatList.value[timeChatList.value.length - 1] as any).chatList.push(message)
        scrollToBottom()
      }
      // 非图片内容
      else {
        const message = {
          isImg: returnMsg.isImg,
          myWord: returnMsg.formUserId === userInfo.value.ID,
          content: returnMsg.messageContent,
          avatarUrl: userAvatarUrl,
          imgUrl: '',
        }
        ;(timeChatList.value[timeChatList.value.length - 1] as any).chatList.push(message)
        scrollToBottom()
      }
    } else {
      // 普通文字
      console.log('服务器返回信息:', data.data)
    }
  })
  // 监听WebSocket连接成功事件。
  socketTask.onOpen(function (res) {
    // 标记已经连接
    socketOpen = true
  })
  // 监听连接关闭
  socketTask.onClose(() => {
    console.log('连接关闭')
  })
})
// 获取第一次加载所需的历史信息
const getFirstLoadInfo = async () => {
  // 没有未读信息的情况
  const res = await http({
    url: '/app/msg/getHistoryMessageList',
    data: {
      formUserId: userInfo.value.ID,
      toUserId: targetID,
      messageTime: '9707839100',
      page: 1,
      pageSize: 10,
    },
  })
  // 有未读信息的情况
  // 获取未读信息数组
}

// 查找历史记录
let currentPageNum = 1
let pageSize = 10
const getHistoryInfo = async (targetID: number) => {
  const res = await http({
    url: '/app/msg/getHistoryMessageList',
    data: {
      formUserId: userInfo.value.ID,
      toUserId: targetID,
      messageTime: '9707839100',
      page: currentPageNum,
      pageSize: pageSize,
    },
  })
  console.log('历史记录', res)
  // 提取历史记录数据
  const insertData = res.data.list.map((item) => {
    const obj = {
      isImg: item.isImg,
      myWord: item.formUserId === userInfo.value.ID,
      content: item.messageContent,
      avatarUrl: userAvatarUrl,
      imgUrl: item.imgUrl,
    }
    return item
  })
}
//滚动到最新位置
onShow(() => {
  scrollToBottom()
})
// 距离顶部位置
let bottomPx = 0
// 滚动到底部
const scrollToBottom = () => {
  uni
    .createSelectorQuery()
    .select('.container')
    .boundingClientRect((res) => {
      bottomPx = res.bottom
      uni.pageScrollTo({
        scrollTop: bottomPx,
        duration: 100,
      })
    })
    .exec()
}
// 消息列表
const timeChatList = ref([
  {
    id: 1,
    time: '刚刚',
    chatList: [
      // {
      //   isImg: false,
      //   myWord: false,
      //   content: '其实我每天只想你一次',
      //   avatarUrl: 'https://s11.ax1x.com/2024/02/01/pFMWV7F.jpg',
      //   imgUrl: '',
      // },
    ],
  },
])
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
    toUserId: +targetID,
    isImg: msg.isImg,
    messageContent: msg.content,
  })
  console.log('封装好的发送的数据', data)
  // 连接成功
  if (socketOpen) {
    // 发送消息
    socketTask.send({
      data,
      fail: (fail) => {
        console.log('发送失败', fail)
      },
      success: () => {
        scrollToBottom()
      },
    })
  } else {
    uni.showToast({
      title: '请重新连接ws',
      icon: 'none',
    })
  }
}
// 主动关闭ws连接
const closeWsConnect = () => {
  socketTask.close({
    success: function () {
      console.log('关闭成功')
    },
  })
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
  height: 80rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: -2rpx 0 2rpx 4rpx #eee;
  .input {
    box-sizing: border-box;
    margin: 0 20rpx;
    padding: 0 20rpx;
    width: 100%;
    background-color: #eee;
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
  padding-bottom: 90rpx;
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

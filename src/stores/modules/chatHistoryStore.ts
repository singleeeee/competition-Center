import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserInfoStore } from './userInfoStore'
import { http } from '@/utils/http'

export const useChatHistoryStore = defineStore('chatHistory', () => {
  // ws连接ID
  const socketTask = ref()
  // 当前连接状态
  const socketOpen = ref(false)
  // 与各用户的信息记录
  const chatInfoMap = ref<any>([
    // {
    //   userID: 4,
    //   userAvatarUrl:
    //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
    //   userName: 'yjddb',
    //   lastMessage: '你好',
    //   lastMessageTime: '',
    //   unReadCount: 0,
    //   chatList: [
    //     {
    //       messageTime: '2024',
    //       isImg: false,
    //       myWord: false,
    //       content: '你好',
    //       avatarUrl:
    //         'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
    //       imgUrl: '',
    //     },
    //   ],
    // },
  ])
  // 初始化函数 todo ----->检测服务器状态，服务器错误
  const websocketInit = () => {
    if (socketOpen.value) uni.closeSocket()
    socketOpen.value = false
    connectWebSocket()
  }
  // websocket连接函数
  const connectWebSocket = () => {
    // 获取用户仓库
    const userInfoStore = useUserInfoStore()
    const { userInfo } = storeToRefs(userInfoStore)
    // 创建一个 WebSocket 连接。
    socketTask.value = uni.connectSocket({
      url: 'ws://47.113.177.192:8082/app/msg/ping',
      header: {
        Authorization: userInfo.value.token,
      },
      success: (res) => {},
      fail: (err) => {
        // console.log('发起ws连接失败！', err)
      },
    })
    // 监听WebSocket连接成功事件
    socketTask.value.onOpen(function () {
      // 修改连接状态
      socketOpen.value = true
      // 开启心跳检测
      startHeartbeat()
    })
    // 监听服务器返回信息
    socketTask.value.onMessage(async (data) => {
      // 首次加载的有效信息
      if (data.data[0] === '{') {
        const returnMsg = JSON.parse(data.data)
        console.log('转化后的数据', returnMsg)
        // 返回的是未读信息 1 未读信息 2 普通信息
        if (returnMsg.type === 1) {
          // 更新用户列表 todo
          for (const key in returnMsg.userList) {
            const user = {
              userID: +key,
              userName: returnMsg.userList[key].userName,
              userAvatarUrl: returnMsg.userList[key].userAvatarUrl,
              lastMessage: '暂无未读信息', // 默认没有消息
              lastMessageTime: Math.floor(new Date().getTime()), // 默认值，后面再改
              unReadCount: 0,
              chatList: [],
            }
            // 消息队列
            chatInfoMap.value.push(user)
          }
          // 更新消息记录
          for (const key in returnMsg.unReadMessageList) {
            // 有未读信息
            if (returnMsg.unReadMessageList[key].length > 0) {
              // 查找该用户所在数组下标
              const userIndex = chatInfoMap.value.findIndex((item) => item.userID === +key)
              // 处理最后一条未读信息的时间
              const lastMessageLengh = returnMsg.unReadMessageList[key].length - 1
              chatInfoMap.value[userIndex].lastMessageTime =
                returnMsg.unReadMessageList[key][lastMessageLengh].messageTime * 1000

              // 未读信息的数量
              chatInfoMap.value[userIndex].unReadCount = lastMessageLengh + 1

              // 最后一条未读信息
              chatInfoMap.value[userIndex].lastMessage =
                returnMsg.unReadMessageList[key][lastMessageLengh].messageContent

              // 遍历每一条未读信息并插入消息队列
              for (let i = 0; i < returnMsg.unReadMessageList[key].length; i++) {
                // 提取所需数据
                const messageNeed = {
                  messageTime: returnMsg.unReadMessageList[key][i].messageTime,
                  isImg: returnMsg.unReadMessageList[key][i].isImg,
                  myWord: returnMsg.unReadMessageList[key][i].toUserId === userInfo.value.ID,
                  content: returnMsg.unReadMessageList[key][i].messageContent,
                  avatarUrl:
                    returnMsg.unReadMessageList[key][i].toUserId === userInfo.value.ID
                      ? userInfo.value.userAvatarUrl
                      : chatInfoMap.value[userIndex].userAvatarUrl,
                  imgUrl: returnMsg.unReadMessageList[key][i].messageContent,
                }
                // 推送到消息队列
                chatInfoMap.value[userIndex].chatList.push(messageNeed)
              }
            }
          }
        }
        // 返回的是普通聊天信息
        else if (returnMsg.type === 2) {
          // 确定私聊对象
          let targetIndex
          if (returnMsg.formUserId === userInfo.value.ID) {
            targetIndex = chatInfoMap.value.findIndex((item) => item.userID === returnMsg.toUserId)
          } else {
            targetIndex = chatInfoMap.value.findIndex(
              (item) => item.userID === returnMsg.formUserId,
            )
          }

          // 修改头像
          let avatarUrl
          if (returnMsg.toUserId !== userInfo.value.ID) {
            // 我发的
            avatarUrl = userInfo.value.userAvatarUrl
          } else {
            // 他发给我的
            avatarUrl = chatInfoMap.value[targetIndex].userAvatarUrl
          }
          // 处理返回的数据
          const message = {
            isImg: returnMsg.isImg,
            myWord: returnMsg.formUserId === userInfo.value.ID,
            content: returnMsg.messageContent,
            avatarUrl,
            imgUrl: returnMsg.messageContent,
            messageTime: returnMsg.messageTime, //漏了这个导致消息列表NAN，
          }
          // 本地回显
          chatInfoMap.value[targetIndex].chatList.push(message)
          if (!message.myWord) {
            // 更新未读记录
            chatInfoMap.value[targetIndex].unReadCount++
          }
          chatInfoMap.value[targetIndex].lastMessage = message.isImg ? '[图片]' : message.content
          chatInfoMap.value[targetIndex].lastMessageTime = returnMsg.messageTime * 1000
        } else {
          // console.log('未知返回信息')
        }
      } else if (data.data === 'pong') {
        console.log('接收到服务器的心跳')
      } else {
        // 普通文字
        // console.log(data.data)
      }
    })
    /*
        在使用websocket的过程中，有时候会遇到网络断开的情况，但是在网络断开的时候服务器端并没有触发onclose的事件。这样会有：服务器会继续向客户端发送多余的链接，并且这些数据还会丢失。所以就需要一种机制来检测客户端和服务端是否处于正常的链接状态。因此就有了websocket的心跳了。还有心跳，说明还活着，没有心跳说明已经挂掉了。
    */
    // 监听WebSocket连接关闭事件
    socketTask.value.onClose(() => {
      // console.log('WebSocket连接关闭')
      // 修改连接状态
      chatInfoMap.value = []
      unReadInfoList.value = []
      socketOpen.value = false
      reconnect()
    })
  }
  // 心跳机制延时器
  let socketTimer = 0
  // 重连定时器预定时间,防止多次发起重连请求
  const RECONNECT_INTERVAL = 5000
  // 心跳包内容
  const heartbeatMsg = 'ping'
  // 发送心跳包的时间间隔
  const HEARTBEAT_INTERVAL = 3000

  // 重连函数
  const reconnect = () => {
    // 确保关闭后重新打开
    uni.closeSocket()
    socketOpen.value = false
    if (!socketOpen.value) {
      clearTimeout(socketTimer)
      // 为啥共用定时器，这两个不可能同时存在
      socketTimer = setTimeout(() => {
        // console.log('开始重连...')
        chatInfoMap.value = []
        unReadInfoList.value = []
        connectWebSocket()
      }, RECONNECT_INTERVAL)
    } else {
      // console.log('WebSocket连接已打开，无需重连！')
    }
  }
  // 心跳检测
  const startHeartbeat = () => {
    const sendHeartbeat = () => {
      // console.log('ping')
      // if (socketOpen.value) {
      //   uni
      //     .sendSocketMessage({
      //       data: heartbeatMsg,
      //     })
      //     .catch((error) => {
      //       console.log('发送心跳消息失败:', error)
      //       reconnect()
      //     })
      // }
    }
    // 发送心跳包
    socketTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL)
  }
  // 发送信息
  const sendMessage = (targetID: number, message: any) => {
    for (let i = 0; i < chatInfoMap.value.length; i++) {
      if (chatInfoMap.value[i].userID === targetID) {
        //网络发送
        socketTask.value.send({
          data: message,
          success: () => {},
        })
      }
    }
  }
  // 插入历史信息
  const insertMessage = (targetID: number, message: any) => {
    for (let i = 0; i < chatInfoMap.value.length; i++) {
      if (chatInfoMap.value[i].userID === +targetID) {
        chatInfoMap.value[i].chatList.unshift(message)
      }
    }
  }
  // 第二次进入聊天室时重置聊天记录
  const clearChatList = (targetID: number) => {
    for (let i = 0; i < chatInfoMap.value.length; i++) {
      if (chatInfoMap.value[i].userID === +targetID) {
        chatInfoMap.value[i].chatList = []
      }
    }
  }
  // 重置未读信息
  const resetUnreadList = (targetID: number) => {
    for (let i = 0; i < chatInfoMap.value.length; i++) {
      if (chatInfoMap.value[i].userID === +targetID) {
        // 未读信息数据
        chatInfoMap.value[i].unReadCount = 0
        const chatListLength = chatInfoMap.value[i].chatList.length
        console.log('信息列表的长度', chatListLength)
        // 上条信息
        chatInfoMap.value[i].lastMessage =
          chatListLength > 0
            ? chatInfoMap.value[i].chatList[chatListLength - 1].isImg
              ? '[图片]'
              : chatInfoMap.value[i].chatList[chatListLength - 1].content
            : '暂无未读信息'
        // 上条时间
        console.log(
          '调用resetUnreadList时显示的上条时间',
          chatInfoMap.value[i].chatList[chatListLength - 1],
        )
        chatInfoMap.value[i].lastMessageTime =
          chatListLength > 0
            ? chatInfoMap.value[i].chatList[chatListLength - 1].messageTime * 1000
            : new Date().getTime()
      }
    }
  }
  return {
    socketTask,
    chatInfoMap,
    websocketInit,
    sendMessage,
    insertMessage,
    clearChatList,
    resetUnreadList,
  }
})

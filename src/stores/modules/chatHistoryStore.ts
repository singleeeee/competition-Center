import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserInfoStore } from './userInfoStore'
import { http } from '@/utils/http'

export const useChatHistoryStore = defineStore('chatHistory', () => {
  // ws连接ID
  const socketTask = ref()
  // 当前连接状态
  const socketOpen = ref(false)
  // 未读信息数组
  const unReadInfoList = ref<any[]>([])
  // 与各用户的信息记录
  const chatInfoMap = ref<any>([
    {
      userID: 4,
      userAvatarUrl:
        'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      userName: 'yjddb',
      lastMessage: '你好',
      lastMessageTime: '2023-01-01 12:00:00',
      unReadCount: 0,
      chatList: [
        // {
        //   messageTime: '2024',
        //   isImg: false,
        //   myWord: false,
        //   content: '你好',
        //   avatarUrl:
        //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
        //   imgUrl: '',
        // },
      ],
    },
  ])
  // 当前连接的用户
  const targetIndex = ref()
  // 修改当前对话的目标
  const changeTargetIndex = (targetID: number) => {
    targetIndex.value = chatInfoMap.value.findIndex((item) => item.userID === targetID)
  }
  // 初始化函数 todo ----->检测服务器状态，服务器错误
  const websocketInit = () => {
    uni.closeSocket()
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
      success: (res) => {
        console.log('发起ws连接成功', res)
      },
      fail: (err) => {
        console.log('发起ws连接失败！', err)
      },
    })
    // 监听WebSocket连接成功事件
    socketTask.value.onOpen(function () {
      console.log('WebSocket连接成功！')
      // 修改连接状态
      socketOpen.value = true
      // 开启心跳检测
      startHeartbeat()
    })
    // 监听服务器返回信息
    socketTask.value.onMessage(async (data) => {
      // 转化返回的数据
      // json格式
      if (data.data[0] === '{') {
        const returnMsg = JSON.parse(data.data)
        // 修改头像
        let avatarUrl
        if (returnMsg.toUserId !== userInfo.value.ID) {
          avatarUrl = userInfo.value.userAvatarUrl
        } else {
          avatarUrl = chatInfoMap.value[targetIndex.value].userAvatarUrl
        }
        if (returnMsg.isImg) {
          // 发的是图片
          // 处理返回的数据
          const message = {
            isImg: returnMsg.isImg,
            myWord: returnMsg.formUserId === userInfo.value.ID,
            content: '',
            avatarUrl,
            imgUrl: returnMsg.messageContent,
          }
          // 本地回显
          chatInfoMap.value[targetIndex.value].chatList.push(message)
        }
        // 非图片内容
        else {
          const message = {
            isImg: returnMsg.isImg,
            myWord: returnMsg.formUserId === userInfo.value.ID,
            content: returnMsg.messageContent,
            avatarUrl: avatarUrl,
            imgUrl: '',
          }
          chatInfoMap.value[targetIndex.value].chatList.push(message)
        }
      } else {
        // 普通文字
        console.log('服务器返回信息:', data.data)
      }
    })
    /*
        在使用websocket的过程中，有时候会遇到网络断开的情况，但是在网络断开的时候服务器端并没有触发onclose的事件。这样会有：服务器会继续向客户端发送多余的链接，并且这些数据还会丢失。所以就需要一种机制来检测客户端和服务端是否处于正常的链接状态。因此就有了websocket的心跳了。还有心跳，说明还活着，没有心跳说明已经挂掉了。
    */
    // 监听WebSocket连接关闭事件
    socketTask.value.onClose(() => {
      console.log('WebSocket连接关闭')
      // 修改连接状态
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
        console.log('开始重连...')
        connectWebSocket()
      }, RECONNECT_INTERVAL)
    } else {
      console.log('WebSocket连接已打开，无需重连！')
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
          success: () => {
            console.log('发送成功')
          },
        })
      }
    }
  }
  // 插入历史信息
  const insertMessage = (targetID: number, message: any) => {
    console.log('插入历史信息')
    for (let i = 0; i < chatInfoMap.value.length; i++) {
      if (chatInfoMap.value[i].userID === +targetID) {
        chatInfoMap.value[i].chatList.unshift(message)
      }
    }
  }
  return {
    socketTask,
    unReadInfoList,
    chatInfoMap,
    websocketInit,
    sendMessage,
    insertMessage,
    changeTargetIndex,
  }
})

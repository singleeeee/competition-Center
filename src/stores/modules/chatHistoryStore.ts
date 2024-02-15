import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserInfoStore } from './userInfoStore'

export const useChatHistoryStore = defineStore('chatHistory', () => {
  // ws连接ID
  const socketTask = ref()
  // 当前连接状态
  const socketOpen = ref(false)
  // 未读信息数组
  const unReadInfoList = ref<any[]>([])
  // 与各用户的信息记录
  const chatInfoMap = ref<Map<string, any>>(new Map())
  // 初始化函数
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
      console.log('ping')
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

  return { socketTask, unReadInfoList, chatInfoMap, websocketInit }
})

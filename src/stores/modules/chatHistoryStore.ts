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
  const unReadInfoList = ref<any>([])
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
      let targetIndex
      console.log('原始返回数据', data)
      // 转化返回的数据
      // json格式
      if (data.data[0] === '{') {
        const returnMsg = JSON.parse(data.data)
        console.log('转化后的数据', returnMsg)
        // 返回的是未读信息 1 未读信息 2 普通信息
        if (returnMsg.type === 1) {
          // 更新用户列表 todo
          for (const key in returnMsg.userList) {
            const user = {
              userID: key,
              userName: returnMsg.userList[key].userName,
              userAvatarUrl: returnMsg.userList[key].userAvatarUrl,
              lastMessage: '没有最新消息', // 默认没有最新消息，有再加
              lastMessageTime: '9908057521', // 默认值，后面再改
              unReadCount: 0,
              chatList: [],
            }
            // 消息队列
            chatInfoMap.value.push(user)
            // 未读信息队列
            unReadInfoList.value.push(user)
          }
          for (const key in returnMsg.unReadMessageList) {
            // 有未读信息
            if (returnMsg.unReadMessageList[key].length > 0) {
              console.log('有未读信息')
              // 查找该用户所在数组下标
              const userIndex = chatInfoMap.value.findIndex((item) => item.userID === key)
              // 最后一天未读信息的时间
              chatInfoMap.value[userIndex].lastMessageTime =
                returnMsg.unReadMessageList[key][0].messageTime
              // 未读信息的数量
              chatInfoMap.value[userIndex].unReadCount = returnMsg.unReadMessageList[key].length
              // 最后一条未读信息
              chatInfoMap.value[userIndex].lastMesssage =
                returnMsg.unReadMessageList[key][
                  returnMsg.unReadMessageList[key].length - 1
                ].messageContent
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
                console.log('提取出的每条未读信息:', messageNeed)
                // 推送到消息队列
                chatInfoMap.value[userIndex].chatList.push(messageNeed)
                // 推送到未读信息队列
                unReadInfoList.value[userIndex].chatList.push(messageNeed)
              }
            }
          }
          console.log('未读信息队列', unReadInfoList.value)
        }
        // 返回的是普通聊天信息
        else if (returnMsg.type === 2) {
          console.log('type=====2')

          // 我的信息
          if (
            returnMsg.formUserId === userInfo.value.ID ||
            returnMsg.toUserId === userInfo.value.ID
          ) {
            console.log('包括我')

            // 确定接收用户
            let targetIndex
            if (returnMsg.formUserId === userInfo.value.ID) {
              targetIndex = chatInfoMap.value.findIndex(
                (item) => item.userID === returnMsg.toUserId,
              )
            } else {
              targetIndex = chatInfoMap.value.findIndex(
                (item) => item.userID === returnMsg.formUserId,
              )
            }
            console.log('目标用户的index', targetIndex)

            // 修改头像
            let avatarUrl
            if (returnMsg.toUserId !== userInfo.value.ID) {
              avatarUrl = userInfo.value.userAvatarUrl
            } else {
              avatarUrl = chatInfoMap.value[targetIndex].userAvatarUrl
            }
            // 处理返回的数据
            const message = {
              isImg: returnMsg.isImg,
              myWord: returnMsg.formUserId === userInfo.value.ID,
              content: returnMsg.messageContent,
              avatarUrl,
              imgUrl: returnMsg.messageContent,
            }
            // 本地回显
            chatInfoMap.value[targetIndex].chatList.push(message)
          }
          // 不包括我
          else {
            // 接收的ID
            const targetIndex = chatInfoMap.value.findIndex(
              (item) => item.userID === returnMsg.toUserId,
            )
            // 发送的ID
            const sendIndex = chatInfoMap.value.findIndex(
              (item) => item.userID === returnMsg.formUserId,
            )
            // 发送者的信息
            const messageSend = {
              isImg: returnMsg.isImg,
              myWord: true,
              content: returnMsg.messageContent,
              avatarUrl: chatInfoMap.value[sendIndex].userAvatarUrl,
              imgUrl: returnMsg.messageContent,
            }
            chatInfoMap.value[sendIndex].chatList.push(messageSend)
            // 接受者的信息
            const messageGet = {
              isImg: returnMsg.isImg,
              myWord: false,
              content: returnMsg.messageContent,
              avatarUrl: chatInfoMap.value[sendIndex].userAvatarUrl,
              imgUrl: returnMsg.messageContent,
            }
            chatInfoMap.value[targetIndex].chatList.push(messageGet)
          }
        } else {
          console.log('未知返回信息')
        }
      } else if (data.data === 'pong') {
        console.log('接收到服务器的心跳')
      } else {
        // 普通文字
        console.log(data.data)
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
  }
})

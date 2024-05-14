<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserInfoStore } from './stores'
import { useChatHistoryStore } from './stores/modules/chatHistoryStore'
import { storeToRefs } from 'pinia'

// 获取ws仓库
const chatHistoryStore = useChatHistoryStore()
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

onLaunch(() => {
  console.log('小程序启动')
  // 未读信息条数
  // uni.setTabBarBadge({
  //   index: 2,
  //   text: '1',
  // })

  // 用户已登录才能使用ws功能
  if (userInfo.value.token) {
    // 开启websocket
    chatHistoryStore.websocketInit()
  }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style>
/* 去除scroll滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>

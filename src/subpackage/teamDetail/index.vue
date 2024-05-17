<template>
  <view class="container min-h-screen px-2 py-2 box-border">
    <view class="flex title h-12 items-center mt-2 justify-between">
      <view class="flex text-xl font-bold text-gray-600 pl-2"
        >竞赛云界队
        <view class="rounded-xl bg-yellow-400 px-2 py-1 text-sm ml-2 tracking-widest">待组队</view>
      </view>
      <view
        class="flex justify-center items-center bg-white rounded-full w-10 h-10 addShowdow mr-4"
      >
        <uni-icons type="plusempty" size="24" />
      </view>
    </view>
    <view class="body flex">
      <card :userInfoList="userInfoList" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import card from './components/card.vue'
import { onLoad } from '@dcloudio/uni-app'
const teamID = ref('')
const userInfoList = ref([])
onLoad(() => {
  const instance = getCurrentInstance()?.proxy
  const eventChannel = instance?.getOpenerEventChannel()
  // 页面通信（复杂数据）
  eventChannel.on('acceptDataFromTeam', (data) => {
    teamID.value = data.teamId
    userInfoList.value = data.userInfoList
    console.log(data)
  })
})
</script>
<style lang="scss" scoped>
.addShowdow {
  box-shadow: 2rpx 4rpx 8rpx 4rpx rgb(206, 230, 240);
}
</style>

<template>
  <view class="container min-h-screen px-2 py-2 box-border">
    <view class="flex title h-12 items-center mt-2 justify-between">
      <view class="flex text-xl font-bold text-gray-600 pl-2"
        >{{ groupName }}
        <view class="rounded-xl bg-yellow-400 px-2 py-1 text-sm ml-2 tracking-widest">{{
          teamStatus
        }}</view>
      </view>
      <view
        class="flex justify-center items-center bg-white rounded-full w-10 h-10 addShowdow mr-4 activeBtn"
      >
        <uni-icons type="plusempty" size="24" />
      </view>
    </view>
    <view class="body flex">
      <card :userInfoList="userInfoList" :teamID="+teamID" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import card from './components/card.vue'
import { onLoad } from '@dcloudio/uni-app'
const teamID = ref('')
const userInfoList = ref([])
const teamStatus = ref('')
const groupName = ref('')
onLoad(() => {
  // 页面通信（复杂数据）
  const instance = getCurrentInstance()?.proxy
  const eventChannel = instance?.getOpenerEventChannel()
  eventChannel.on('acceptDataFromTeam', (data) => {
    teamID.value = data.teamId
    userInfoList.value = data.userInfoList
    switch (data.groupStatus) {
      case 1:
        data.groupStatus = '待报名'
        break
      case 2:
        data.groupStatus = '待审核'
        break
      case 3:
        data.groupStatus = '报名成功'
        break
      case 4:
        data.groupStatus = '报名失败'
        break
      default:
        break
    }
    teamStatus.value = data.groupStatus
    groupName.value = data.groupName
    console.log(data)
  })
})
</script>
<style lang="scss" scoped>
.addShowdow {
  box-shadow: 2rpx 4rpx 8rpx 4rpx rgb(206, 230, 240);
}
.activeBtn:active {
  background-color: #eee;
}
</style>

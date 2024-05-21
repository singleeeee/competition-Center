<template>
  <view class="container min-h-screen px-2 py-2 box-border">
    <view class="flex title h-12 items-center mt-2 justify-between">
      <view class="flex text-xl font-bold text-gray-600 pl-2"
        >{{ groupName }}
        <teamStatu :teamStatus="teamStatus" />
      </view>
      <invite :groupID="teamID" @invite="getTeam" />
    </view>
    <view class="body flex">
      <card v-show="teamID" ref="cardRef" :teamID="teamID" :captainId="+captainId" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import card from './components/card.vue'
import { onLoad } from '@dcloudio/uni-app'
import invite from './components/invite.vue'
import teamStatu from './components/teamStatu.vue'

const teamID = ref(0)
const userInfoList = ref([])
const teamStatus = ref(1)
const groupName = ref('')
const captainId = ref(0)
onLoad(() => {
  console.log('页面加载了')
  // 页面通信（复杂数据）
  const instance = getCurrentInstance()?.proxy
  if (instance) {
    const eventChannel = instance?.getOpenerEventChannel()
    eventChannel.on('acceptDataFromTeam', (data) => {
      teamID.value = data.teamId
      userInfoList.value = data.userInfoList
      teamStatus.value = +data.groupStatus
      groupName.value = data.groupName
      captainId.value = data.groupCaptainId
    })
  }
})
onMounted(() => {
  console.log('onMounted')
})
const cardRef = ref()
const getTeam = () => {
  if (cardRef.value) cardRef.value.getTeamInfo()
}
</script>
<style lang="scss" scoped></style>

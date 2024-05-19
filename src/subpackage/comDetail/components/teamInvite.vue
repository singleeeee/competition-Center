<template>
  <view
    class="flex flex-col relative justify-center message h-24 bg-slate-200 py-2 px-4 rounded-xl text-sm"
    v-for="item in inviteList"
    :key="item.ID"
  >
    <view class="text-center">
      <text class="text-orange-400">{{ item.userNickName }}</text>
      <text> 邀请你加入队伍</text>
      <text class="text-blue-400"> {{ item.groupName }}</text>
    </view>
    <view class="flex justify-around mt-5">
      <button
        class="w-1/3 h-8 leading-8 text-sm rounded-2xl bg-[#bababa] border-0 text-white active:scale-101"
        @tap="refuseTeam(item.groupId)"
      >
        拒绝
      </button>
      <button
        class="w-1/3 h-8 leading-8 text-sm rounded-2xl bg-[#2a82e4] border-0 text-white active:scale-101"
        @tap="acceptTeam(item.groupId)"
      >
        接受
      </button>
    </view>
    <uni-icons class="absolute top-2 right-3" type="closeempty" size="20" />
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import {
  getInvitation,
  acceptInvitation,
  refuseInvitation,
  getGroupInfoByID,
} from '@/api/group/group'
import { getUserInfoByID } from '@/api/user/userInfo'
const inviteList = ref([])
const props = defineProps({
  userID: {
    type: Number,
    require: true,
  },
  comID: {
    type: Number,
    require: true,
  },
})
onMounted(() => {
  console.log('组件加载了')
  getInviteList()
})

const getInviteList = async () => {
  const res = await getInvitation({
    userId: props.userID,
    comId: props.comID,
    status: 1,
  })
  for (const item of res.data.list) {
    const res = await getGroupInfoByID(item.groupId.toString())
    const resU = await getUserInfoByID(res.data.regroupInfo.groupCaptainId)
    item.groupName = res.data.regroupInfo.groupName
    item.userNickName = resU.data.reuserData.userNickname
    inviteList.value.push(item)
    console.log(inviteList.value)
  }
}

// 接受队伍邀请
const acceptTeam = async (teamID: string) => {
  const res = await acceptInvitation(teamID)
  if (res.code !== '7') {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
}
// 拒绝队伍邀请
const refuseTeam = async (teamID: string) => {
  const res = await refuseInvitation(teamID)
  if (res.code !== '7') {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
}
</script>
<style scoped>
button:active {
  background-color: rgb(82, 94, 94);
}
</style>

<template>
  <view
    class="mx-auto w-3/4 items-center justify-between rounded-2xl bg-white px-4 py-3 my-4"
    v-if="show"
  >
    <view class="flex justify-between items-center border-b py-3">
      <img class="h-12 w-12 rounded-full" :src="data.userAvatarUrl" alt="头像" />
      <view class="flex-1 pl-3">
        <view class=" ">{{ data.userName }}</view>
        <view class="text-gray-300 text-sm">{{ data.comName }}</view>
      </view>
      <uni-icons type="closeempty" size="22" @tap="remove" />
    </view>
    <view class="mx-auto flex w-full items-center px-2 py-3">
      <span class="text-orange-400 px-1">{{ data.userName }}</span
      >邀请你加入队伍<span class="text-blue-400">{{ data.groupName }}</span>
    </view>
    <view class="my-2 flex justify-around" v-show="showBtn">
      <button
        class="h-8 w-2/5 rounded-3xl bg-[#bababa] px-2 py-1 leading-6 text-white border-0"
        @tap="refuseTeam"
      >
        拒绝
      </button>
      <button
        class="h-8 w-2/5 rounded-3xl bg-blue-500 px-2 py-1 leading-6 text-white border-0"
        @tap="acceptTeam"
      >
        接受
      </button>
    </view>
    <view class="my-2 flex justify-around" v-show="!showBtn">
      <view class="flex h-12 items-center justify-center" v-if="!accept">
        <view
          class="mt-4 inline-block h-8 w-24 rounded-2xl border border-solid border-red-500 bg-red-50 px-2 py-1 text-center text-sm leading-8 text-red-400"
        >
          {{ tipsInfo }}
        </view>
      </view>
      <view class="flex h-12 items-center justify-center" v-else>
        <view
          class="mt-4 inline-block h-8 w-24 rounded-2xl border border-solid border-green-500 bg-green-50 px-2 py-1 text-center text-sm leading-8 text-green-400"
        >
          {{ tipsInfo }}
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { acceptInvitation, refuseInvitation, getInvitation } from '@/api/group/group'

import { useUserInfoStore } from '@/stores'

const { userInfo } = useUserInfoStore()
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
onMounted(() => {
  getInviteStatus()
})
const showBtn = ref(true)
const tipsInfo = ref('')
const accept = ref(false)
// 获取邀请状态
const getInviteStatus = async () => {
  const res = await getInvitation({
    userId: userInfo.ID,
    groupId: props.data.groupId,
  })
  if (res.data.list[0].status === 2) {
    showBtn.value = false
    tipsInfo.value = '已接受'
    accept.value = true
  } else if (res.data.list[0].status === 3) {
    showBtn.value = false
    tipsInfo.value = '已拒绝'
    accept.value = false
  }
}
// 接受队伍邀请
const acceptTeam = async () => {
  const res = await acceptInvitation(props.data.groupId)
  if (res.code !== '7') {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
    setTimeout(() => {
      navigate()
    }, 1000)
  }
}
// 拒绝队伍邀请
const refuseTeam = async () => {
  const res = await refuseInvitation(props.data.groupId)
  if (res.code !== '7') {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
    setTimeout(() => {
      navigate()
    }, 1000)
  }
}
const show = ref(true)
const remove = () => {
  show.value = false
}

const navigate = () => [uni.navigateTo({ url: '/subpackage/myTeam/index' })]
</script>

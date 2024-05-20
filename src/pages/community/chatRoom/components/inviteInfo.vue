<template>
  <view class="mx-auto w-3/4 items-center justify-between rounded-2xl bg-white px-4 py-3 mt-4">
    <view class="flex justify-between items-center border-b py-3">
      <img
        class="h-12 w-12 rounded-full"
        src="https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/djy.jpg"
        alt=""
      />
      <view class="flex-1 pl-3">
        <view class=" ">代金宇</view>
        <view class="text-gray-300 text-sm">无敌是多么寂寞</view>
      </view>
      <uni-icons class="rotate-90" type="more-filled" size="24" />
    </view>
    <view class="mx-auto flex w-full items-center px-2 py-3">
      <span class="text-orange-400">代金宇</span>邀请你加入队伍<span class="text-blue-400"
        >无敌是多么寂寞</span
      >
    </view>
    <view class="my-2 flex justify-around">
      <button class="h-8 w-1/3 rounded-3xl bg-[#bababa] px-2 py-1 leading-6 text-white border-0">
        取消
      </button>
      <button class="h-8 w-1/3 rounded-3xl bg-blue-500 px-2 py-1 leading-6 text-white border-0">
        确认
      </button>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { acceptInvitation, refuseInvitation } from '@/api/group/group'
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

const navigate = () => [uni.navigateTo({ url: '/subpackage/myTeam/index' })]
</script>

<template>
  <!-- 队员信息面板 -->
  <view class="flex flex-wrap justify-evenly w-full">
    <view
      class="flex w-3/7 flex-col items-center justify-center rounded-2xl bg-red-200 px-2 py-3 mt-2 mx-1"
      v-for="(item, index) in userInfoList"
      :key="index"
    >
      <view class="flex items-center">
        <uni-icons class="mr-1 mt-1" type="flag-filled" color="" size="24" />
        {{ index === 0 ? '队长' : '队员' }}
      </view>
      <view
        class="active boder-2 mt-4 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-white"
      >
        <img
          class="h-[58px] w-[58px] rounded-full bg-pink-200"
          :src="item.userAvatarUrl"
          alt="头像"
        />
      </view>
      <text class="mt-2 font-bold tracking-widest text-gray-700">{{ item.userName }}</text>
      <text class="mt-2 h-12 text-xs text-gray-700 text-center line-clamp-2">{{
        item.userIntroduction
      }}</text>
      <button
        class="btn rouded-lg h-[32px] justify-items-end rounded-2xl bg-red-500 px-4 py-2 text-sm leading-[18px] text-gray-100 shadow-sm"
        @tap="deleteTeam"
        v-if="index === 0"
      >
        解散队伍
      </button>
      <button
        class="btn rouded-lg h-[32px] justify-items-end rounded-2xl bg-red-500 px-4 py-2 text-sm leading-[18px] text-gray-100 shadow-sm"
        @tap="deleteTeamer"
        v-else
      >
        移出队伍
      </button>
    </view>
  </view>
  <!-- 信息提示面板 -->
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      :content="alertContent"
      @confirm="delTeam()"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="删除成功" :duration="1000"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="删除失败" :duration="1000"></uni-popup-message>
  </uni-popup>
</template>
<script lang="ts" setup>
import type { UserInfo } from '@/types/global'
import { ref } from 'vue'
const props = defineProps({
  userInfoList: {
    type: Array<UserInfo>,
    default: null,
    require: true,
  },
  teamID: {
    type: Number,
    require: true,
  },
})
// 弹窗ref
const alertDialog = ref()
// 成功ref
const successInfo = ref()
// 失败ref
const errorInfo = ref()
const alertContent = ref('您确定要解散这支队伍吗?')

// 踢出队伍
const deleteTeamer = () => {
  alertContent.value = '您确定要移出该队员吗?'
  alertDialog.value.open()
}
// 解散队伍
const deleteTeam = () => {
  alertContent.value = '您确定要解散这支队伍吗?'
  alertDialog.value.open()
}
</script>
<style scoped>
.active {
  border: 6rpx solid lightgreen;
}
.btn:active {
  background-color: rgb(175, 27, 27);
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

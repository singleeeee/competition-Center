<template>
  <view
    class="flex justify-center items-center bg-white rounded-full w-10 h-10 addShowdow mr-4 activeBtn"
    @tap="popup.open('bottom')"
  >
    <uni-icons type="plusempty" size="24" />
  </view>
  <!-- 普通弹窗 -->
  <uni-popup ref="popup">
    <view class="flex h-56 flex-col rounded-xl bg-blue-200 px-6 py-4 text-center">
      <!-- 搜索框 -->
      <view class="flex h-12 items-center justify-center">
        <input
          class="h-8 w-3/5 rounded-2xl bg-white px-4"
          placeholder="请输入邀请人的姓名"
          v-model="inviteCode"
          type="text"
        />
        <view class="icon ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#5179ef]">
          <uni-icons class="icon" type="search" color="#fff" size="22" />
        </view>
      </view>
      <!-- 好友列表 -->
      <view class="m-2 h-42 overflow-scroll rounded-2xl">
        <!-- item -->
        <view class="my-2 flex items-center justify-between rounded-2xl bg-white px-2 py-2">
          <img
            class="h-12 w-12 rounded-full"
            src="https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/djy.jpg"
            alt=""
          />
          <view class="flex-1 pl-2 text-start">
            <view class="text-orange-300">代金宇</view>
            <view class="text-sm text-gray-400">喜欢oi姐</view>
          </view>
          <view class="icon flex h-10 w-10 items-center justify-center rounded-full bg-[#5179ef]">
            <uni-icons type="plusempty" color="#fff" size="24" />
          </view>
        </view>
        <!-- item -->
        <view class="my-2 flex items-center justify-between rounded-2xl bg-white px-2 py-2">
          <img
            class="h-12 w-12 rounded-full"
            src="https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/djy.jpg"
            alt=""
          />
          <view class="flex-1 pl-2 text-start">
            <view class="text-orange-300">代金宇</view>
            <view class="text-sm text-gray-400">喜欢oi姐</view>
          </view>
          <view class="icon flex h-10 w-10 items-center justify-center rounded-full bg-[#5179ef]">
            <uni-icons type="plusempty" color="#fff" size="24" />
          </view>
        </view>
        <!-- item -->
        <view class="my-2 flex items-center justify-between rounded-2xl bg-white px-2 py-2">
          <img
            class="h-12 w-12 rounded-full"
            src="https://jk-competition.oss-cn-guangzhou.aliyuncs.com/picture/uploads/2024-03-17/djy.jpg"
            alt=""
          />
          <view class="flex-1 pl-2 text-start">
            <view class="text-orange-300">代金宇</view>
            <view class="text-sm text-gray-400">喜欢oi姐</view>
          </view>
          <view class="icon flex h-10 w-10 items-center justify-center rounded-full bg-[#5179ef]">
            <uni-icons type="plusempty" color="#fff" size="24" />
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script setup>
import { ref } from 'vue'
const popup = ref()
const inviteCode = ref('')
</script>
<style scoped>
.activeBtn:active {
  background-color: #eee;
}
.addShowdow {
  box-shadow: 2rpx 4rpx 8rpx 4rpx rgb(206, 230, 240);
}
input::placeholder {
  color: red;
  font-size: 13px;
}
.icon:active {
  background-color: rgb(2, 41, 63);
}
</style>

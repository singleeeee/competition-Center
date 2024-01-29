<template>
  <view class="searchPage">
    <uni-search-bar style="width: 100%" focus cancelButton="none" />
  </view>
  <view class="searchRecord">
    <view class="title">历史记录</view>
    <view class="icon">
      <uni-icons type="trash" color="#ccc" size="20" />
    </view>
  </view>
  <view class="content">
    <view v-for="(items, index) in recordList" :key="index" class="tag">
      <view class="tag">{{ items.text }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const recordList = ref([
  {
    text: '小猪佩奇',
  },
  {
    text: '黑猫警察',
  },
  {
    text: '加菲猫',
  },
])
</script>

<style lang="scss" scoped>
.searchPage {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9999;
  height: 150rpx;
  display: flex;
  align-items: center;
  background-color: #12a66a;
}
.searchRecord {
  box-sizing: border-box;
  width: 100%;
  height: 80rpx;
  position: absolute;
  top: 140rpx;
  z-index: 9999;
  border-radius: 30rpx 30rpx 0 0;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  .title {
    font-size: 32rpx;
    font-weight: 600;
  }
  .content {
    margin-top: 410rpx;
    display: flex;
    width: 100%;
    .tag {
      margin-left: 20rpx;
      margin-right: 10rpx;
    }
  }
}
</style>

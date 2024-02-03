<template>
  <view class="searchPage">
    <uni-search-bar
      v-model="inputValue"
      style="width: 100%"
      focus
      cancelButton="none"
      @confirm="confirm"
      @input="handleChange"
      clear
    />
  </view>
  <view class="searchRecord">
    <view class="title">历史记录</view>
    <view class="icon">
      <uni-icons type="trash" color="#ccc" size="20" @tap="deleteRecord" />
    </view>
  </view>
  <view class="content">
    <view v-for="(items, index) in recordList" :key="index" class="tagBox">
      <view class="tag">{{ items }}</view>
    </view>
  </view>
  <view class="hotSearch">
    <view class="title"
      >热门搜索
      <uni-icons type="fire-filled" color="red" size="22" />
    </view>
    <view class="list">
      <view class="item"> </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useSearchRecordStore } from '@/stores/modules/searchRecord'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
// 输入框内容
const inputValue = ref('')

// 防抖
let timer: number = 1
// 实时监听输入
const handleChange = (e) => {
  if (timer) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(e)
    }, 200)
  }
}
// 失焦事件
const confirm = () => {
  if (inputValue.value.trim() !== '') {
    searchRecord.addRecord(inputValue.value)
    inputValue.value = ''
  }
}
// 获取仓库
const searchRecord = useSearchRecordStore()
console.log(searchRecord)

const { searchList } = storeToRefs(searchRecord)
const recordList = searchList

// 清空历史记录
const deleteRecord = () => {
  searchRecord.clearRecord()
}
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
}
.content {
  box-sizing: border-box;
  margin-top: 210rpx;
  width: 100%;
  height: auto;
  padding: 10rpx 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow: scroll;
  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40rpx;
    border-radius: 24rpx;
    background-color: #f8f8f8;
    color: #666;
    font-size: 20rpx;
    margin: 10rpx 20rpx 0 0;
    padding: 6rpx 12rpx;
  }
}
.hotSearch {
  border-top: 1rpx solid #eee;
  margin: 20rpx;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10rpx;
    color: #f58e46;
    font-weight: 700;
    font-size: 32rpx;
    margin-top: 20rpx;
    padding-left: 20rpx;
    text-align: center;
  }
  .list {
    .item {
    }
  }
}
</style>

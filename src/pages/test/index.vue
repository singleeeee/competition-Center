<template>
  <div class="test">
    <uni-swipe-action>
      <uni-swipe-action-item :threshold="0" :right-options="options2" @click="bindClick">
        <view class="item">
          <view class="title">111</view>
          <view class="author-type">
            <view class="author">2222 | 3333</view>
          </view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options1 = [
  {
    text: '取消置顶',
  },
]
const options2 = [
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d',
    },
  },
]
const contentClick = ref()
const bindClick = (e) => {
  console.log(e)
  uni.showToast({
    title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
.item {
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20rpx 0;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
  .title {
    font-size: 28rpx;
  }
  .author-type {
    display: flex;
    font-size: 22rpx;
    color: #aaa;
  }
}
</style>

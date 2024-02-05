<template>
  <view class="container">
    <view class="item" v-for="(item, index) in collectionList" :key="index">
      <view class="title">{{ item.title }}</view>
      <view class="author-type">
        <view class="author">{{ item.author }} | {{ item.topic }}</view>
      </view>
    </view>
    <view class="item">
      <view class="title">文章标题</view>
      <view class="author-type">
        <view class="author">作者 | 话题</view>
      </view>
    </view>
  </view>
  <view class="text">没有更多内容</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const collectionList = ref([
  {
    title: '学习路线-前端思维导图',
    author: '驿站助手小C',
    topic: '前端学习',
  },
  {
    title: '蓝桥杯速通路线-国一学长的分析',
    author: '代金宇',
    topic: '蓝桥杯',
  },
  {
    title: '如何使用Unity制作王者荣耀',
    author: '张涵',
    topic: 'Unity',
  },
])
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .item {
    height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20rpx;
    padding: 20rpx 0;
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
}
.text {
  font-size: 28rpx;
  color: #aaa;
  text-align: center;
}
</style>

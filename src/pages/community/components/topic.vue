<template>
  <view class="container">
    <!-- item -->
    <view class="title">
      <view class="topic">{{ title }}</view>
      <view class="rightTitle">更多<uni-icons type="forward" size="12" /></view>
    </view>
    <view class="topicBox" v-for="item in topicList" :key="item.id" @click="navigatetoPosts">
      <view class="img"></view>
      <view class="content">
        <view class="topicTitle">{{ item.title }}</view>
        <view class="introduce">{{ item.introduce }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const topicList = [
  {
    id: 1,
    title: '#大一可以打蓝桥杯吗？',
    introduce: '建议大一大二打',
  },
  {
    id: 2,
    title: '#软通杯含金量如何？',
    introduce: '练练手',
  },
  {
    id: 3,
    title: '#我们学校ICPC有多少个名额？',
    introduce: '一般来说2个',
  },
]
const topic = defineProps({
  title: {
    type: String,
  },
})
// 跳转
const navigatetoPosts = () => {
  uni.navigateTo({ url: '/subpackage/posts/index' })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10rpx 20rpx;
    background-color: #fff;
    border-bottom: 0.5px solid #eee;
    box-sizing: border-box;
    .topic {
      font-weight: 700;
      border-left: 4px solid #12a661;
      padding-left: 14rpx;
    }

    .rightTitle {
      color: #ccc;
      font-size: 24rpx;
    }
  }
  .topicBox {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 14rpx 20rpx;
    &:active {
      background-color: #eee;
    }
    .img {
      width: 90rpx;
      height: 90rpx;
      background-color: skyblue;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .content {
      height: 80rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .topicTitle {
        display: inline;
        font-size: 26rpx;
        color: rgb(245, 169, 29);
      }
      .introduce {
        font-size: 24rpx;
        color: #aaa;
      }
    }
  }
}
</style>

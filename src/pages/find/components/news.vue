<template>
  <view class="container" v-for="item in newsList" :key="item.id" @click="navigatetoDetail">
    <view class="left">
      <view class="title">{{ item.title }}</view>
      <view class="bottom">
        <view class="author">{{ item.author }}&nbsp;&nbsp;{{ item.time }}</view>
        <view class="hot">
          <uni-icons color="#ccc" type="fire" size="14" />{{ item.hot }}
          <uni-icons color="#ccc" type="hand-up" size="14" />{{ item.font }}
        </view>
      </view>
    </view>
    <view class="image"></view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
onLoad(async () => {
  const { data } = await http({
    url: '/app/dis/getDisInfoList',
    method: 'GET',
    data: {
      disModel: 1,
      page: 1,
      pageSize: 20,
    },
  })
  console.log(data.list[0])

  for (let i = 0; i < (data as any).list.length; i++) {
    const obj = {
      ID: data.list[i].ID,
      hot: data.list[i].comHot,
      title: data.list[i].comTitle,
      author: '竞赛中心',
    }
  }
})
const newsList = ref([
  {
    id: 1,
    title: '2024蓝桥杯报名开启!',
    author: '竞赛中心',
    time: '21分钟前',
    pic: '',
    font: 2333,
    hot: '999+',
  },
])

// 跳转到详情页
const navigatetoDetail = () => {
  uni.navigateTo({
    url: '/subpackage/notification_detail/index',
  })
}
</script>
<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  height: 200rpx;
  padding: 0 20rpx 10rpx 20rpx;
  border-bottom: 0.5rpx solid #efefef;
  margin: 20rpx 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow-y: scroll;
  // box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08);

  .left {
    flex: 1;
    height: 180rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      padding-top: 20rpx;
      font-size: 28rpx;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      color: #ccc;
      padding: 0 20rpx 0 0;
    }
  }
  .image {
    width: 240rpx;
    height: 180rpx;
    background-color: skyblue;
  }
}
</style>

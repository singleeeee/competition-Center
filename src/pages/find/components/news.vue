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
  {
    id: 2,
    title: '蓝桥杯自费选手报名提醒',
    author: '竞赛中心',
    time: '56分钟前',
    pic: '',
    font: 122,
    hot: 13,
  },
  {
    id: 3,
    title:
      '目前系统导师已更新完毕，由于选手数量较多，请所有填写了自选导师的同学务必在12月29日今天下午15:00点前上系统查阅导师信息是否正确，如有修改的，在今天下午16:00前告诉我，过后系统关闭无法更新',
    author: '竞赛中心',
    time: '昨天',
    pic: '',
    font: 333,
    hot: 99,
  },
  {
    id: 4,
    title:
      '为了备战2024年的蓝桥杯与团体程序设计天梯赛，我们特别组织了这次算法集训队！ 这是一个绝佳的机会，让我们共同努力，为即将到来的挑战做好准备，提升我们的编程和算法技能！',
    author: '竞赛中心',
    time: '三天前',
    pic: '',
    font: 2333,
    hot: 199,
  },
  {
    id: 5,
    title:
      '挑战杯全称为“挑战杯”全国大学生系列科技学术竞赛，是由共青团中央、中国科协、教育部和全国学联共同主办的全国性的大学生课外学术实践竞赛。',
    author: '辅导员',
    time: '三天前',
    pic: '',
    font: 2333,
    hot: 199,
  },
  {
    id: 6,
    title: '关于开展2023-2024学年第一学期学生评教通知 ',
    author: '计算机学院',
    time: '五天前',
    pic: '',
    font: 833,
    hot: 99,
  },
  {
    id: 7,
    title: '数智精英大赛获奖情况已发布，大家可自行下载获奖证书，望周知。 ',
    author: '竞赛中心',
    time: '五天前',
    pic: '',
    font: 833,
    hot: 99,
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
  border: 0.5rpx solid #eee;
  margin: 20rpx 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08);
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

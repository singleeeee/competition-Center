<template>
  <view class="container">
    <uni-notice-bar
      class="error"
      show-icon
      scrollable
      showClose
      @close="closeNoticebar"
      text="为了备战2024年的蓝桥杯与团体程序设计天梯赛，我们特别组织了这次算法集训队！ 这是一个绝佳的机会，让我们共同努力，为即将到来的挑战做好准备，提升我们的编程和算法技能！"
    />
    <!-- 轮播图 -->
    <uni-swiper-dot
      class="uni-swiper-dot-box"
      :info="swiperDataList"
      :current="currentImg"
      mode="nav"
      field="content"
    >
      <swiper
        class="swiper"
        circular
        autoplay
        :style="{ 'margin-top': marginTop + 'rpx' }"
        @change="swiperChange"
      >
        <swiper-item v-for="(item, index) in swiperDataList" :key="index">
          <image class="image" :src="item.url" mode="scaleToFill" />
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="section"> <view class="line"></view> <view class="title">近期通告</view> </view>

    <!-- 通告栏 -->
    <view class="report">
      <news></news>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import news from './components/news.vue'

// 轮播图数据数组
const swiperDataList = ref([
  {
    url: 'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-02-02/InternetFight.jpg',
    content: '360数科攻防演练',
  },
  {
    url: 'https://5b0988e595225.cdn.sohucs.com/images/20190523/eae348313a854e0a8c3e4afec86975f9.jpeg',
    content: '挑战杯',
  },
  {
    url: 'https://math.lcu.edu.cn/images/content/2022-09/20220915231221799458.png',
    content: '全国大学生数学建模比赛',
  },
])
// 轮播图切换事件
const swiperChange = (e) => {
  currentImg.value = e.detail.current
}
// 轮播图当前页
const currentImg = ref(0)
let marginTop = ref(80)
// 关闭通告栏
const closeNoticebar = () => {
  marginTop.value = 0
  console.log(marginTop.value)
}
</script>
<style scoped lang="scss">
.container {
  background-color: #fff;
}
.swiper {
  height: 300rpx;
  border-radius: 10rpx;
  .image {
    width: 100%;
    height: 100%;
  }
}
.error {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
.section {
  height: 60rpx;
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  font-weight: 700;
  .line {
    background-color: #12a661;
    width: 10rpx;
    height: 60rpx;
    margin-right: 20rpx;
  }
}
</style>

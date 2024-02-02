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
    <swiper class="swiper" circular autoplay :style="{ 'margin-top': marginTop + 'rpx' }">
      <swiper-item>
        <image
          class="image"
          src="https://mmbiz.qpic.cn/mmbiz_jpg/9RM1R8UKDIYZEomIrexCrOSXbdH0EVJ2IQfV16icgAwZEsqAiacoWmOetjKYbFTeNLuZahOBeh0ibDuINIpl0uxxw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1"
          mode="scaleToFill"
        />
      </swiper-item>
      <swiper-item>
        <image
          class="image"
          src="https://5b0988e595225.cdn.sohucs.com/images/20190523/eae348313a854e0a8c3e4afec86975f9.jpeg"
          mode="scaleToFill"
        />
      </swiper-item>
      <swiper-item>
        <image
          class="image"
          src="https://math.lcu.edu.cn/images/content/2022-09/20220915231221799458.png"
          mode="scaleToFill"
        />
      </swiper-item>
    </swiper>
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

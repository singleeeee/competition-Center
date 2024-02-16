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
      @clickItem="clickItem"
      mode="nav"
      field="content"
      v-if="swiperDataList.length > 0"
    >
      <swiper
        class="swiper"
        circular
        autoplay
        :style="{ 'margin-top': marginTop + 'rpx' }"
        @change="swiperChange"
      >
        <swiper-item
          v-for="(item, index) in swiperDataList"
          :key="index"
          @tap="handleSwiperTap(item.disId)"
        >
          <image class="image" :src="item.url" mode="scaleToFill" />
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="section"> <view class="line"></view> <view class="title">近期通告</view> </view>
    <!-- 通告栏 -->
    <view class="report">
      <news @getNotificationList="getNotificationList"></news>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import news from './components/news.vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { onPullDownRefresh } from '@dcloudio/uni-app'
onLoad(() => {
  getSwiperData()
})
onPullDownRefresh(() => {
  getSwiperData()
  getNotificationList()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
// 获取通告数据
const getNotificationList = () => {
  // 调用接口获取通告数据
  console.log('获取通告数据')
}
// 获取轮播图数据
const getSwiperData = async () => {
  // 调用接口获取轮播图数据
  const {
    data: { list },
  } = await http({
    url: '/app/manager/getHomePictureList',
  })
  for (let i = 0; i < list.length; i++) {
    ;(swiperDataList as any).value.push({
      content: list[i].disInfo.disTitle,
      disId: list[i].disId,
      url: list[i].pictureUrl,
    })
  }
}
// 轮播图点击
const handleSwiperTap = (disId: number) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${disId}`,
  })
}

// 轮播图数据数组
const swiperDataList = ref([])
// 轮播图切换事件
const swiperChange = (e) => {
  currentImg.value = e.detail.current
}
// 轮播图当前页
const currentImg = ref(0)
// 点击指示点
const clickItem = (e) => {
  currentImg.value = e
}
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

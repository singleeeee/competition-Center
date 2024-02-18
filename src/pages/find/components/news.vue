<template>
  <view class="containerBox">
    <view
      class="container"
      v-for="item in newsList"
      :key="item.id"
      @click="navigatetoDetail(item.ID)"
    >
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
      <view>
        <image class="image" :src="item.imageUrl" mode="scaleToFill" />
      </view>
    </view>
    <view>
      <uni-load-more iconType="circle" :status="loadingStatus" :contentText="loadingText" />
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import type { UniLoadMoreStatus } from '@uni-helper/uni-ui-types'
// 加载状态
const loadingStatus = ref<UniLoadMoreStatus>('more')
// 下拉刷新文字内容
const loadingText = {
  contentdown: '上拉显示更多',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多数据了',
}
onLoad(() => {
  notificationListInit()
})
// 获取通告列表
const currentNotificationPage = ref(1)
const notificationPageSize = ref(5)
// 通告列表
const newsList = ref([])
// 获取通告列表
const notificationListInit = async () => {
  currentNotificationPage.value = 1
  newsList.value = []
  getNotificationList()
}
// 获取通告列表
const getNotificationList = async () => {
  // 加载状态
  loadingStatus.value = 'loading'
  // 获取列表
  const res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      page: currentNotificationPage.value,
      pageSize: notificationPageSize.value,
      disModel: 2, // 1为普通 2为公告 3为比赛
      disStatus: 2, // 1待审核 2 展示中 3 有问题
    },
  })
  const resList = ref(res.data.list)
  for (let i = 0; i < resList.value.length; i++) {
    const obj = {
      ID: resList.value[i].ID, //帖子ID
      hot: resList.value[i].disLookNumber,
      title: resList.value[i].disTitle,
      time: toLocalTime(resList.value[i].CreatedAt, false),
      font: resList.value[i].disLoveNumber,
      imageUrl: resList.value[i].disPicture[0],
      author: resList.value[i].userInfo.userNickname,
    }
    newsList.value.push(obj)
  }
  currentNotificationPage.value++
  if (currentNotificationPage.value * notificationPageSize.value >= res.data.total) {
    loadingStatus.value = 'noMore'
  } else {
    loadingStatus.value = 'more'
  }
}

// 跳转到详情页
const navigatetoDetail = (disId: number) => {
  uni.navigateTo({
    url: `/subpackage/notification_detail/index?disId=${disId}`,
  })
}
// 暴露子组件函数
defineExpose({
  notificationListInit,
  getNotificationList,
})
</script>
<style scoped lang="scss">
.containerBox {
  height: 100%;
  .container {
    margin: 20rpx 10rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10rpx 20rpx 10rpx 20rpx;
    border-bottom: 0.5rpx solid #efefef;
    background-color: #fff;
    border-radius: 10rpx;
    overflow-y: scroll;
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08);

    .left {
      flex: 1;
      height: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 28rpx;
        overflow: hidden;
        padding-top: 20rpx;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        font-weight: 700;
        -webkit-box-orient: vertical;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        color: #ccc;
        padding: 0 20rpx 10rpx 0;
      }
    }
    .image {
      width: 240rpx;
      height: 180rpx;
      background-color: skyblue;
    }
  }
}
</style>

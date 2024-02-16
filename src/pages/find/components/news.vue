<template>
  <view v-if="newsList.length > 0">
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
  </view>
  <view v-else style="text-align: center; color: #ccc"> 暂无数据 </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { onPullDownRefresh } from '@dcloudio/uni-app'
// 下拉刷新
onPullDownRefresh(async () => {
  getNotificationList()
  console.log('获取通告数据')
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 1000)
})
// 加载比赛列表
onLoad(() => {
  getNotificationList()
})

// 获取帖子列表
const currentNotificationPage = ref(0)
const notificationPageSize = ref(5)
const getNotificationList = async () => {
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
  newsList.value = []
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
}

const newsList = ref([])

// 跳转到详情页
const navigatetoDetail = (disId: number) => {
  uni.navigateTo({
    url: `/subpackage/notification_detail/index?disId=${disId}`,
  })
}
</script>
<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10rpx 20rpx 10rpx 20rpx;
  border-bottom: 0.5rpx solid #efefef;
  margin: 20rpx 10rpx;
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
</style>

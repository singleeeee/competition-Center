<template>
  <scroll-view
    scroll-y
    class="container"
    @scrolltolower="onReachBottom"
    refresher-enabled
    @refresherrefresh="pullDownRefresh"
    :refresher-triggered="isPullingDown"
  >
    <view v-if="collectionList.length > 0">
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(item, index) in collectionList"
          :key="index"
          :threshold="0"
          :right-options="Del"
          @click="bindClick($event, index)"
        >
          <view class="item" @tap="switchToPostDetail(item.disId)">
            <view class="title">{{ item.disTitle }}</view>
            <view class="author-type">
              <view class="author">{{ item.disUserName }} | {{ item.disTopic }}</view>
            </view>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
      <uni-load-more :status="loadStatus" iconType="circle" />
    </view>
    <view v-else>
      <uni-load-more status="loading" iconType="circle" />
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import type { CollectList } from '@/types/global'
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/index'
onLoad(async () => {
  getCollectList()
})
// 下滑加载状态
let loadStatus = ref('more')
// 触底事件
const onReachBottom = () => {
  loadStatus.value = 'loading'
  getCollectList()
}
// 下拉刷新状态
const isPullingDown = ref(false)
// 刷新事件
const pullDownRefresh = () => {
  isPullingDown.value = true
  currentPage = 1
  collectionList.value = []
  setTimeout(() => {
    getCollectList()
  }, 1000)
}
// 收藏列表
const collectionList = ref<CollectList>([])

const userInfoStore = useUserInfoStore()
const { userInfo } = userInfoStore
let currentPage = 1
let pageSize = 5
// 获取收藏列表
const getCollectList = async () => {
  const res = await http<CollectList[]>({
    url: '/app/dis/userShowCollectDis',
    data: {
      userid: userInfo.ID,
      page: currentPage,
      pageSize: pageSize,
    },
  })
  if (!res.data.disList?.length) {
    loadStatus.value = 'noMore'
    return
  } else {
    loadStatus.value = 'more'
    for (let i = 0; i < res.data.disList.length; i++) {
      collectionList.value.push(res.data.disList[i])
    }
    currentPage++
  }
  if (res.data.total <= currentPage * pageSize) {
    loadStatus.value = 'noMore'
  }
  isPullingDown.value = false
}

// 跳转到帖子详情页
const switchToPostDetail = (disId: number) => {
  if (disId) {
    console.log('disId', disId)
    uni.navigateTo({
      url: `/subpackage/postDetail/index?disId=${disId}`,
    })
  } else {
    console.log('disId不存在')
    uni.showToast({
      url: '帖子不存在!',
      icon: 'none',
    })
  }
}
// 点击删除
const Del = [
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d',
    },
  },
]
// 处理删除事件
const bindClick = async (e, index) => {
  const res = await http({
    url: `/app/dis/userCancelCollectDis?disID=${collectionList.value[index].disId}`,
    method: 'DELETE',
  })
  getCollectList()
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f2f2f2;
  .item {
    margin: 20rpx 20rpx;
    min-height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0rpx 4rpx 12rpx 2rpx #ddd;
    .title {
      font-size: 26rpx;
      padding-bottom: 20rpx;
      text-align: justify;
      overflow: hidden;
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

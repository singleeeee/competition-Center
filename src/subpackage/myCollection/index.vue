<template>
  <view class="container">
    <uni-swipe-action>
      <uni-swipe-action-item
        v-for="(item, index) in collectionList"
        :key="index"
        :threshold="0"
        :right-options="Del"
        @click="bindClick($event, index)"
      >
        <view class="item" @tap="switchToPostDetail(item.disID)">
          <view class="title">{{ item.disTitle }}</view>
          <view class="author-type">
            <view class="author">{{ item.disUserName }}| {{ item.disTopic }}</view>
          </view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
  <view class="text">没有更多内容</view>
</template>

<script lang="ts" setup>
import type { CollectList } from '@/types/global'
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const collectionList = ref<CollectList>([])
onLoad(async () => {
  getCollectList()
})
// 获取收藏列表
const getCollectList = async () => {
  const res = await http<CollectList[]>({
    url: '/app/dis/userShowCollectDis',
  })
  collectionList.value = res.data
}
// 更新收藏列表（分页器）

// 跳转到帖子详情页
const switchToPostDetail = (disId: number) => {
  console.log(disId)

  if (disId) {
    console.log(disId)
    uni.navigateTo({
      url: `/subpackage/postDetail/index?ID=${disId}`,
    })
  } else {
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
const bindClick = (e, index) => {
  http({
    url: `/app/dis/userCancelCollectDis?disID=${collectionList.value[index].disId}`,
    method: 'DELETE',
  })
  getCollectList()
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .item {
    height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20rpx;
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

<template>
  <view class="container">
    <!-- item -->
    <view class="item">
      <view class="title">
        <view class="topic">{{ title }}</view>
        <view class="rightTitle" @tap="navigatetoPosts"
          >更多<uni-icons type="forward" size="12"
        /></view>
      </view>
      <!-- 比赛列表 -->
      <template v-if="competitionList.length > 0">
        <view
          class="topicBox"
          v-for="(item, index) in competitionList"
          :key="index"
          @click="navigatetoComdetail(item.ID)"
        >
          <view>
            <image class="img" :src="item.comPicture" mode="scaleToFill" />
          </view>
          <view class="content">
            <view class="topicTitle comTitle">{{ item.comTitle }}</view>
            <view class="introduce">{{ item.comSubTitle }}</view>
          </view>
        </view>
      </template>
      <template v-else>
        <uni-load-more status="loading" iconType="circle" />
      </template>

      <view class="title">
        <view class="topic">热门帖子</view>
        <view class="rightTitle" @tap="navigatetoComdetail(item.ID)"
          >更多<uni-icons type="forward" size="12"
        /></view>
      </view>
      <!-- 帖子列表 -->
      <template v-if="postList.length > 0">
        <view
          class="topicBox"
          v-for="(item, index) in postList"
          :key="index"
          @click="navigatetoPostDetail(item.ID)"
        >
          <view>
            <image class="img" :src="item.disPicture[0]" mode="scaleToFill" />
          </view>
          <view class="content">
            <view class="topicTitle"> #{{ item.disTitle }}</view>
            <view class="introduce">{{ item.disContent }}</view>
          </view>
        </view>
      </template>
      <template v-else>
        <uni-load-more status="loading" iconType="circle" />
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const emit = defineEmits(['handleSkeletonShow'])

onLoad(() => {
  // 获取比赛列表
  refresh()
})

// 父组件传来的数据
defineProps({
  title: {
    type: String,
  },
})

// 跳转到具体页面
const navigatetoPostDetail = (disId: number) => {
  uni.navigateTo({ url: `/subpackage/postDetail/index?disId=${disId}` })
}
// 跳转到比赛详情
const navigatetoComdetail = (comID: number) => {
  uni.navigateTo({ url: `/subpackage/comDetail/index?comID=${comID}` })
}
// 帖子列表数组
const postList = ref([])
// 比赛列表数组
const competitionList = ref([])

// 获取帖子列表
const getPostList = async () => {
  postList.value = []
  const res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      disModel: 1,
      disStatus: 2,
      page: 1,
      pageSize: 5,
      sort: 'dis_hot',
      order: 'descending',
    },
  })
  setTimeout(() => {
    for (let i = 0; i < res.data.list.length; i++) {
      postList.value.push(res.data.list[i])
    }
  }, 500)
}
// 比赛加载状态
// 获取比赛列表
const getComList = async () => {
  competitionList.value = []
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      disModel: 3,
      disStatus: 2,
      page: 1,
      pageSize: 5,
      sort: 'com_hot',
      order: 'descending',
    },
  })
  setTimeout(() => {
    for (let i = 0; i < res.data.list.length; i++) {
      competitionList.value.push(res.data.list[i])
    }
  }, 500)
}
// 刷新页面
const refresh = async () => {
  await getPostList()
  await getComList()
  emit('handleSkeletonShow', false)
}
defineExpose({
  refresh,
})
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
      width: 100rpx;
      height: 100rpx;
      background-color: skyblue;
      border-radius: 8rpx;
      margin-right: 20rpx;
    }
    .content {
      height: 100rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .topicTitle {
        display: inline;
        font-size: 28rpx;
        color: rgb(245, 169, 29);
      }
      .comTitle {
        color: rgb(35, 149, 231);
        font-size: 30rpx;
      }
      .introduce {
        font-size: 24rpx;
        color: #aaa;
      }
    }
  }
}
</style>

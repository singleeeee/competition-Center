<template>
  <view class="container">
    <!-- item -->
    <view class="title">
      <view class="topic">{{ title }}</view>
      <view class="rightTitle">更多<uni-icons type="forward" size="12" /></view>
    </view>
    <template v-if="type">
      <view
        class="topicBox"
        v-for="(item, index) in competitionList"
        :key="index"
        @click="navigatetoPosts"
      >
        <view>
          <image class="img" :src="item.comPicture" mode="scaleToFill" />
        </view>
        <view class="content">
          <view class="topicTitle"> #{{ item.comTitle }}</view>
          <view class="introduce">{{ item.comSubTitle }}</view>
        </view>
      </view>
    </template>
    <template v-else>
      <view
        class="topicBox"
        v-for="(item, index) in postList"
        :key="index"
        @click="navigatetoPosts"
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
  </view>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLoad(() => {
  // 获取比赛列表
  getComList()
  getCommentList()
})

// 比赛列表数组
const competitionList = ref([])
// 获取比赛列表
const getComList = async () => {
  const res = await http({
    url: '/app/com/getComInfoList',
    data: {
      disModel: 3,
      // disStatus: 1, 1待审核 2 展示中 3 有问题
      page: 1,
      pageSize: 5,
      sort: 'com_hot',
      order: 'descending',
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    competitionList.value.push(res.data.list[i])
  }
}
// 父组件传来的数据
defineProps({
  title: {
    type: String,
  },
  type: {
    type: Boolean,
  },
})
// 跳转到具体页面
const navigatetoPosts = () => {
  uni.navigateTo({ url: '/subpackage/posts/index' })
}

// 帖子列表数组
const postList = ref([])
// 获取帖子列表
const getCommentList = async () => {
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
  for (let i = 0; i < res.data.list.length; i++) {
    postList.value.push(res.data.list[i])
  }
  console.log(postList.value)
}
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
      width: 90rpx;
      height: 90rpx;
      background-color: skyblue;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .content {
      height: 80rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .topicTitle {
        display: inline;
        font-size: 26rpx;
        color: rgb(245, 169, 29);
      }
      .introduce {
        font-size: 24rpx;
        color: #aaa;
      }
    }
  }
}
</style>

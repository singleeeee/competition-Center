<template>
  <div class="postManage">
    <scroll-view scroll-y class="scrollBox">
      <view
        class="item"
        v-for="item in postList"
        :key="item.ID"
        @tap="navigateTo(item.disStatus, item.ID)"
      >
        <image class="img" :src="item.disPicture[0]" mode="scaleToFill" />
        <view class="content">
          <span class="titleBox">
            <h1 class="title">{{ item.disTitle }}</h1>
            <p class="subTitle">{{ item.disContent }}</p>
          </span>
          <span class="extraBox">
            <span class="Tag">原创</span>
            <span class="date">{{ toLocalTime(item.CreatedAt).split(' ')[0] }}</span>
            <span class="readedNum" v-if="item.disStatus !== 1 && item.disStatus !== 3"
              >{{ item.disHot }}阅读</span
            >
            <span class="liked" v-if="item.disStatus != 1 && item.disStatus != 3"
              >{{ item.disLoveNumber }}点赞</span
            >
            <span class="followed" v-if="item.disStatus !== 1 && item.disStatus !== 3"
              >{{ item.disCollectNumber }}收藏</span
            >
          </span>
        </view>
        <view class="postStatus">
          <span class="statusTag checked" v-if="item.disStatus === 1">待审核</span>
          <span class="statusTag error" v-else-if="item.disStatus === 3">未通过</span>
          <span class="statusTag success" v-else>展示中</span>
        </view>
      </view>
    </scroll-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { useUserInfoStore } from '@/stores'

onLoad(() => {
  getPostList()
})
const userInfoStore = useUserInfoStore()
// 获取帖子列表
const getPostList = async () => {
  const res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      disUserId: userInfoStore.userInfo.ID,
    },
  })
  res.data.list.forEach((element) => {
    postList.value.push(element)
  })
}
// 帖子列表
const postList = ref([])
// 跳转到相应页面
const navigateTo = (status: number, disId: number) => {
  // 1-待审核 2-展示中 3-未通过
  if (status === 1) {
    return
  } else if (status === 2) {
    uni.navigateTo({
      url: `/subpackage/postDetail/index?disId=${disId}`,
    })
  } else {
    uni.navigateTo({
      url: `/subpackage/PostWriting/index?disId=${disId}`,
    })
  }
}
</script>

<style lang="scss" scoped>
.scrollBox {
  height: 100vh;
  background-color: #f5f5f5;
  .item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 10rpx;
    height: 180rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    padding: 20rpx;
    overflow: hidden;
    .img {
      height: 160rpx;
      width: 160rpx;
      background-color: skyblue;
      border-radius: 10rpx;
    }
    .content {
      height: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 20rpx;
      .titleBox {
        width: 55vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 28rpx;
        }
        .subTitle {
          color: #aaa;
          font-size: 24rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .extraBox {
      display: flex;
      width: 100%;
      font-size: 22rpx;
      .Tag {
        display: inline;
        background-color: rgb(255, 238, 241);
        padding: 4rpx 8rpx;
        border-radius: 2rpx;
        color: rgb(203, 7, 7);
      }
      .date {
        padding: 4rpx 8rpx;
        color: #aaa;
      }
      .readedNum {
        padding: 4rpx 8rpx;
        color: #aaa;
      }
      .liked {
        padding: 4rpx 8rpx;
        color: #aaa;
      }
      .followed {
        padding: 4rpx 8rpx;
        color: #aaa;
      }
    }
    .postStatus {
      position: absolute;
      transform: translateX(20px) translateY(16px) rotate(45deg);
      top: 0;
      right: 0;
      font-size: 26rpx;
    }
    .checked {
      padding: 4rpx 50rpx;
      background-color: rgb(251, 251, 126);
      color: rgb(23, 171, 230);
    }
    .error {
      padding: 4rpx 50rpx;
      background-color: rgb(247, 219, 223);
      color: rgb(212, 9, 9);
    }
    .success {
      padding: 4rpx 50rpx;
      background-color: rgb(220, 246, 247);
      color: rgb(29, 148, 35);
    }
  }
}
</style>

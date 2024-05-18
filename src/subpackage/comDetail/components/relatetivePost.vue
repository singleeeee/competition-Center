<template>
  <!-- 相关通告 -->
  <view class="grade">
    <view class="line">{{ title }}</view>
    <view class="postBox" v-if="postList.length > 0">
      <view class="item" v-for="item in postList" :key="item.ID" @tap="navigateTo(item.ID)">
        <image
          class="img"
          :src="item.disPicture.length > 0 ? item.disPicture[0] : '/static/empty/emptyImg.png'"
          mode="scaleToFill"
        />
        <view class="content">
          <span class="titleBox">
            <h1 class="title">{{ item.disTitle }}</h1>
            <p class="subTitle">{{ item.disContent }}</p>
          </span>
          <span class="extraBox">
            <span class="Tag">原创</span>
            <!-- <span class="date">{{ toLocalTime(item.CreatedAt).split(' ')[0] }}</span> -->
            <span class="readedNum">{{ item.disHot }}阅读</span>
            <span class="liked">{{ item.disLoveNumber }}点赞</span>
            <span class="followed">{{ item.disCollectNumber }}收藏</span>
          </span>
        </view>
        <view class="postStatus">
          <span class="statusTag error">热门</span>
        </view>
      </view>
    </view>
    <view v-else>
      <image src="../../static/empty/emptyPost.png" mode="scaleToFill" />
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getDisInfoList } from '@/api/post/post'
import { onMounted } from 'vue'
// 帖子列表
const postList = ref([])

onMounted(async () => {
  console.log('onload')
  await getPostList()
})
const props = defineProps({
  disComid: {
    type: String,
    default: '1',
    require: true,
  },
  disModel: {
    type: String,
    default: '2',
    require: true,
  },
  title: {
    type: String,
    default: '相关帖子',
    require: true,
  },
})

// 跳转到相应页面
const navigateTo = (disId) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${disId}`,
  })
}
// 获取帖子列表
const getPostList = async () => {
  const res = await getDisInfoList({
    disComid: props.disComid,
    disModel: props.disModel,
    page: 1,
    pageSize: 4,
  })
  console.log(postList.value)
  res.data.list.forEach((element) => {
    postList.value.push(element)
  })
}
</script>
<style lang="scss" scoped>
.line {
  padding-left: 20rpx;
  border-left: #2979ff 6rpx solid;
  margin-bottom: 20rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}
.grade {
  align-self: flex-start;
  margin-bottom: 30rpx;
  width: 100%;
  .postBox {
    .item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin: 0 10rpx;
      height: 180rpx;
      border-radius: 20rpx;
      background-color: #e2e8f0;
      margin-bottom: 20rpx;
      padding: 20rpx;
      overflow: hidden;
      .img {
        height: 150rpx;
        width: 160rpx;
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
            margin-top: 10rpx;
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
        transform: translateX(22px) translateY(12px) rotate(45deg);
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
}
</style>

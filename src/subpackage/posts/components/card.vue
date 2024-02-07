<template>
  <view class="container">
    <view class="postBox">
      <nameTitle :author="author" :date="time" icon="right" :avatarUrl="avatarUrl"></nameTitle>
      <view class="contentBox">
        <view class="title">{{ title }}</view>
        <view class="content">{{ content }}</view>
        <view v-if="imageUrl">
          <image class="img" :src="imageUrl" mode="heightFix" />
        </view>
      </view>
      <view class="others">
        <!-- 收藏 -->
        <view class="item" @tap="collectChange" v-if="!props.isCollected">
          <uni-icons type="star" color="#aaa" size="20" />
          <span style="color: #aaa; padding-left: 10rpx">{{ props.collectedNum }}</span>
        </view>
        <view class="item" @tap="collectChange" v-else>
          <uni-icons type="star-filled" color="#f79321" size="20" />
          <span style="color: #f79321; padding-left: 10rpx">{{ props.collectedNum }}</span>
        </view>
        <!-- 评论 -->
        <view class="item" @tap="switchToDetail">
          <uni-icons type="chat" color="#aaa" size="20" />
          <span style="color: #aaa; padding-left: 10rpx">{{ props.commentNum }}</span>
        </view>
        <!-- 点赞 -->
        <view class="item" @tap="likeChange" v-if="!props.isLiked">
          <uni-icons type="hand-up" color="#aaa" size="20" />
          <span style="color: #aaa; padding-left: 10rpx">{{ props.likedNum }}</span>
        </view>
        <view class="item" @tap="likeChange" v-else>
          <uni-icons type="hand-up-filled" color="#f79321" size="20" />
          <span style="color: #f79321; padding-left: 10rpx">{{ props.likedNum }}</span>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import nameTitle from '@/components/nameTitle.vue'
const props = defineProps({
  id: {
    type: Number,
    require: true,
  },
  author: {
    type: String,
    default: '微信用户',
  },
  content: {
    type: String,
    default: '文章内容',
  },
  time: {
    type: String,
    default: '发布时间',
  },
  title: {
    type: String,
    default: '文章标题',
  },
  collectedNum: {
    type: Number,
    default: 0,
  },
  commentNum: {
    type: Number,
    default: 0,
  },
  likedNum: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-02-02/defaultAvatar.png',
  },
  isCollected: {
    type: Boolean,
    require: true,
  },
  isLiked: {
    type: Boolean,
    require: true,
  },
})
const emit = defineEmits(['likedChange', 'collectedChange', 'switchToDetail'])

// 点击收藏
const collectChange = () => {
  emit('collectedChange', !props.isCollected, props.id)
}

// 点击评论
const switchToDetail = () => {
  emit('switchToDetail', props.id)
}

// 点击点赞
const likeChange = () => {
  emit('likedChange', !props.isLiked, props.id)
}
</script>
<style scoped lang="scss">
.container {
  display: inline-block;
  width: 100%;
  background-color: #f1f1f3;
  .postBox {
    border-radius: 10rpx;
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.08);
    padding: 0rpx 24rpx 0rpx;
    margin: 10rpx 20rpx;
    background-color: #fff;

    .contentBox {
      box-sizing: border-box;
      .title {
        font-weight: 700;
        font-size: 32rpx;
        padding-bottom: 10rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content {
        font-size: 28rpx;
        color: #ccc;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        padding: 10rpx 0;
        max-height: 106rpx;
      }
      .img {
        background-color: #fff;
        height: 330rpx;
        margin: 10rpx 0;
      }
    }
    .others {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 80rpx;
      border-top: 1rpx solid #eee;
      .item {
        height: 100%;
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

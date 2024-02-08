<template>
  <view class="container">
    <view class="title">{{ title }}</view>
    <view class="content">{{ content }}</view>
    <view class="imgBox" v-if="imgList.length > 0">
      <ul class="imgBox">
        <li v-for="(item, index) in imgList" :key="index">
          <image class="img" :src="item" mode="heightFix" />
        </li>
      </ul>
    </view>
    <view class="share">
      <view class="lineBox">
        <view class="line"></view>
        <view class="text">分享至</view>
        <view class="line"></view>
      </view>
      <view class="iconBox">
        <uni-icons style="margin-right: 30rpx" type="weixin" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="qq" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="weibo" color="#ccc" size="38" />
        <uni-icons style="margin-right: 30rpx" type="pyq" color="#ccc" size="38" />
      </view>
    </view>
    <view class="likeBox">
      <view :class="{ liked: true, active: isLiked }" @tap="like">
        <view>
          <uni-icons :type="isLiked ? 'hand-up-filled' : 'hand-up'" color="" size="24" />
        </view>
        <view> 点赞 </view>
      </view>
      <view :class="{ collect: true, active: isCollected }" @tap="collect">
        <view>
          <uni-icons :type="isCollected ? 'star-filled' : 'star'" color="" size="24" />
        </view>
        <view>收藏</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '震惊！某男子竟当众做出这样的举动',
  },
  content: {
    type: String,
    default: '说话',
  },
  imgList: {
    type: Array,
    default: () => [],
  },
})
const isLiked = ref(false)
const like = () => {
  isLiked.value = !isLiked.value
}
const isCollected = ref(false)
const collect = () => {
  isCollected.value = !isCollected.value
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 10rpx 20rpx;
  .title {
    font-weight: 700;
    padding: 10rpx 0;
  }
  .content {
    padding: 10rpx 0;
  }
  .imgBox {
    display: flex;
    align-items: center;
    height: 220rpx;
    width: 100%;
    .img {
      flex: 1;
      height: 220rpx;
      margin: 20rpx 10rpx;
      margin-left: 0rpx;
    }
  }
  .share {
    margin: 70rpx 0;
    .lineBox {
      position: relative;
      display: flex;
      justify-content: space-around;
      .line {
        width: 38%;
        border-bottom: 0.5rpx solid #eee;
      }
      .text {
        position: absolute;
        left: 50%;
        top: -15rpx;
        transform: translateX(-50%);
        font-size: 24rpx;
        color: #ccc;
      }
    }
    .iconBox {
      margin-top: 40rpx;
      display: flex;
      justify-content: center;
    }
  }
  .likeBox {
    display: flex;
    height: 90rpx;
    justify-content: center;
    align-items: center;
    .liked,
    .collect {
      display: flex;
      align-items: center;
      margin-right: 120rpx;
      font-size: 26rpx;
      color: #aaa;
      background-color: #f1f2f3;
      padding: 10rpx 40rpx;
      border-radius: 30rpx;
    }
    .collect {
      margin-right: 0;
    }
    .active {
      color: orange;
    }
  }
}
</style>

<template>
  <view class="container">
    <text :user-select="true" class="title">{{ title }}</text>
    <text :user-select="true" :selectable="true">
      <!-- <div class="content" v-html="disContentHTML"></div> -->
      {{ content }}
    </text>
    <ul class="imgBox" v-if="imgList.length > 0">
      <li v-for="(item, index) in imgList" :key="index">
        <image @tap="onClickImg(item)" class="img" :src="item" mode="heightFix" />
      </li>
    </ul>
    <view class="share">
      <view class="lineBox">
        <view class="line"></view>
        <view class="text">分享至</view>
        <view class="line"></view>
      </view>
      <view class="iconBox" @tap="share">
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
        <view v-if="isLiked"> 已点赞 </view>
        <view v-else> 点赞 </view>
      </view>
      <view :class="{ collect: true, active: isCollected }" @tap="collect">
        <view>
          <uni-icons :type="isCollected ? 'star-filled' : 'star'" color="" size="24" />
        </view>
        <view v-if="isCollected"> 已收藏 </view>
        <view v-else> 收藏 </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { ref, computed } from 'vue'
import { myDebounce } from '@/utils/myDebounce'
// 分享
const share = () => {
  uni.showToast({
    title: '暂未开放',
    icon: 'none',
    duration: 500,
  })
}
// 点击图片预览
const onClickImg = (tempFilePaths) => {
  let fileUrlArray = [tempFilePaths]
  uni.previewImage({
    urls: fileUrlArray,
    success: (result) => {},
    fail: (error) => {
      console.log(error)
    },
  })
}
// 转换过\n的帖子内容 !!!! win
// const disContentHTML = computed(() => {
//   return props.content.replace(/\n/g, '<br>')
// })

const props = defineProps({
  disId: {
    type: Number,
  },
  authorId: {
    type: Number,
  },
  title: {
    type: String,
    default: '震惊！xxxxxx',
  },
  content: {
    type: String,
    default: '暂无内容',
  },
  imgList: {
    type: Array,
    default: () => [],
  },
  liked: {
    type: Boolean,
  },
  collected: {
    type: Boolean,
  },
})

const isLiked = ref(props.liked)
const like = myDebounce(async () => {
  // 取消点赞
  if (isLiked.value) {
    try {
      const res = await http({
        url: `/app/dis/userUnLikeDis?ID=${props.disId}&dislikeUserID=${props.authorId}`,
        method: 'DELETE',
      })
      if (res.code !== '7') isLiked.value = !isLiked.value
    } catch (error) {
      uni.showToast({
        title: '未知错误',
        icon: 'none',
      })
    }
  } else {
    try {
      const res = await http({
        url: '/app/dis/userLikeDis',
        data: {
          ID: props.disId,
          likeUserID: props.authorId,
        },
      })
      if (res.code !== '7') isLiked.value = !isLiked.value
    } catch (error) {
      uni.showToast({
        title: '点赞失败!',
        icon: 'none',
      })
    }
  }
}, 200)
// 收藏
const isCollected = ref(props.collected)
const collect = myDebounce(() => {
  // 取消点赞
  if (isCollected.value) {
    http({
      url: `/app/dis/userCancelCollectDis?disID=${props.disId}`,
      method: 'DELETE',
    })
    isCollected.value = !isCollected.value
  } else {
    http({
      url: '/app/dis/userCollectDis',
      data: {
        disID: props.disId,
      },
    })
    isCollected.value = !isCollected.value
  }
}, 200)
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 10rpx 20rpx;
  .title {
    font-size: 34rpx;
    font-weight: 700;
    padding: 10rpx 0;
  }
  .content {
    padding: 10rpx 0;
    font-size: 28rpx;
    letter-spacing: 2rpx;
  }
  .imgBox {
    display: flex;
    align-items: center;
    height: 350rpx;
    margin: 20rpx 10rpx;
    .img {
      height: 350rpx;
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

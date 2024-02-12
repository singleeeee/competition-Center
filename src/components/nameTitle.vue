<template>
  <view :class="{ container: true, comment: isComment, border: border }">
    <!-- 作者头像 -->
    <view :class="{ authorBox: true, comment: isComment }" @tap="handleTap">
      <view class="avatar" @tap.stop="tapAvatar">
        <image class="avatar" :src="avatarUrl" mode="scaleToFill" />
      </view>
      <view class="bodyBox">
        <view class="nickname" :style="{ color: nicknameColor }">{{ author }}</view>
        <view class="date_add">
          <view class="date">{{ date }}</view>
          <view class="add"> {{ extra }}</view>
        </view>
      </view>
      <view class="share" v-if="candelete" @tap.stop="delComment">
        <span style="font-size: 24rpx; color: #ccc">{{ rightText }}</span>
        <uni-icons :type="icon" color="#ccc" size="18"></uni-icons>
      </view>
    </view>
    <!-- 二级评论 -->
    <view class="commentItem" @tap="handleTap">
      <slot name="comment"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'

const props = defineProps({
  avatarUrl: {
    type: String,
    default: 'http://tmp/wpinKs1JejQv9558093d8ac2138389013e440bfe808e.jpeg',
  },
  author: {
    type: String,
    default: '竞赛中心',
  },
  date: {
    type: String,
    default: '2024/1/1 14:20',
  },
  extra: {
    type: String,
    default: '广东',
  },
  icon: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: false,
  },
  rightText: {
    type: String,
    default: '',
  },
  nicknameColor: {
    type: String,
    default: 'orange',
  },
  isComment: {
    type: Boolean,
    default: false,
  },
  // 一级评论的id
  commentID: {
    type: Number,
  },
  candelete: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['tapAvatar', 'refleshComment', 'openInput'])
// 点击评论区
const handleTap = () => {
  console.log('handleTap')
  emits('openInput')
}
// 点击头像
const tapAvatar = () => {
  emits('tapAvatar', props.index)
}
// 删除评论
const delComment = async () => {
  await http({
    url: `/app/comment/deleteCommentInfo?ID=${props.commentID}`,
    method: 'DELETE',
  })
  emits('refleshComment')
}
</script>

<style scoped lang="scss">
.container {
  .authorBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150rpx;
    .avatar {
      width: 110rpx;
      height: 110rpx;
      border-radius: 50%;
    }
    .bodyBox {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      flex: 1;
      height: 120rpx;
      padding: 10rpx 0 0 20rpx;
      .nickname {
        font-size: 30rpx;
        color: orange;
      }
      .date_add {
        display: flex;
        font-size: 24rpx;
        color: #ccc;
        margin-bottom: 14rpx;
        .date {
          margin-right: 10rpx;
        }
      }
    }
    .share {
      width: 100rpx;
      height: 100rpx;
      margin-top: 10rpx;
      display: flex;
      justify-content: center;
    }
  }
  .comment {
    .avatar {
      width: 80rpx;
      height: 80rpx;
    }
    .bodyBox {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 120rpx;
      padding: 10rpx 0 0 30rpx;
      .nickname {
        font-size: 26rpx;
      }
      .date_add {
        display: flex;
        font-size: 22rpx;
        color: #ccc;
        .date {
          margin-right: 10rpx;
        }
      }
    }
  }
}
.border {
  border-bottom: 1rpx solid #eee;
}
.commentItem {
  margin-top: -20rpx;
  margin-left: 110rpx;
  margin-bottom: 20rpx;
}
</style>

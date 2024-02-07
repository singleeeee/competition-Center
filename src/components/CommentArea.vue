<template>
  <view class="container">
    <view class="title">评论({{ commentTotal }})</view>
    <nameTitle
      v-for="(item, index) in commentList"
      :key="index"
      icon="hand-up"
      :is-comment="true"
      :border="true"
      :author="item.nickname"
      :nickname-color="item.nicknameColor"
      :avatar-url="item.avatarUrl"
    >
      <template #comment>
        <slot>
          <view class="commentText" v-for="(items, index) in commentList" :key="index">
            {{ items.content }}

            <view v-if="item.commentSons.length > 0">
              <view
                class="secondCommentList"
                v-for="(item, index) in items.commentSons"
                :key="index"
              >
                <view class="left">
                  <view class="userInfo">{{ item.useInfo?.userNickname }}</view>
                  <view class="content">{{ item.commentText }}</view>
                  <view class="replyTime">2023/11/14 09:31 香港</view>
                </view>
                <view class="right">
                  <view>
                    <uni-icons type="hand-up" color="#ccc" size="18" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </slot>
      </template>
    </nameTitle>
  </view>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import nameTitle from './nameTitle.vue'
import { ref } from 'vue'
import { http } from '@/utils/http'
defineProps({
  disId: {
    type: Number,
    default: 1,
  },
})
let commentTotal = ref('')
onLoad(async () => {
  console.log('打开帖子详情')
  const { data } = await http({
    url: '/app/comment/getCommentInfoList',
    data: {
      page: 1,
      pageSize: 5,
      commentDisId: 1,
    },
  })
  commentTotal.value = data.total
  const dataList = data.list
  for (let i = 0; i < data.list.length; i++) {
    const obj = ref({
      commentDisId: data.list[i].ID, // 一级帖子的ID
      commentLikeNumber: data.list[i].commentLikeNumber, // 点赞个数
      content: data.list[i].commentText, // 评论内容
      avatarUrl: data.list[i].userInfo.userAvatarUrl, // 评论头像
      nickname: data.list[i].userInfo.userNickName, // 评论昵称
      commentSons: data.list[i].commentSons, // 二级评论数组
    })
    console.log(obj.value)

    commentList.value.push(obj.value)
  }
})

const commentList = ref([])
</script>
<style lang="scss" scoped>
.title {
  color: #aaa;
  font-size: 28rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #eee;
}
.container {
  margin: 0 20rpx;
}
.commentText {
  font-size: 28rpx;
  .secondCommentList {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    .left {
      display: flex;
      flex: 1;
      flex-direction: column;
      .userInfo {
        font-size: 24rpx;
        color: #147ea8;
      }
      .content {
        font-size: 26rpx;
        padding: 4rpx 0;
        color: #666;
      }
      .replyTime {
        padding: 4rpx 0;
        font-size: 22rpx;
        color: #ccc;
      }
    }
    .right {
      width: 100rpx;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

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
      :avatar-url="item.avatarUrl"
      :date="toLocalTime(item.date)"
    >
      <template #comment>
        <slot>
          <view>
            <view class="commentText">
              {{ item.content }}
              <view v-if="item.commentSons.length > 0">
                <!-- 二级评论 -->
                <view
                  class="secondCommentList"
                  v-for="(items, index) in item.commentSons"
                  :key="index"
                >
                  <view class="left">
                    <view class="userInfo">{{ items.userInfo.userNickname }}</view>
                    <view class="content">{{ items.commentText }}</view>
                    <view class="replyTime"
                      >{{ toLocalTime(items.CreatedAt) }}
                      {{
                        items.userInfo.userCity.slice(0, items.userInfo.userCity.indexOf('/'))
                      }}</view
                    >
                  </view>
                  <view class="right">
                    <view>
                      <uni-icons type="hand-up" color="#ccc" size="18" />
                    </view>
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
import nameTitle from './nameTitle.vue'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { onMounted } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
const props = defineProps({
  disId: {
    type: Number,
    default: 1,
  },
})
console.log(props.disId)
// 控制评论区显示隐藏
const isCommentShow = ref(false)
// 评论总条数
let commentTotal = ref('')
// 评论数组
let commentList = ref([])
// 为啥用onLoad不行？
onMounted(async () => {
  const { data } = await http({
    url: '/app/comment/getCommentInfoList',
    data: {
      page: 1,
      pageSize: 10,
      commentDisId: props.disId,
    },
  })
  commentTotal.value = data.total
  console.log(data)

  for (let i = 0; i < data.list.length; i++) {
    const obj = {
      commentDisId: data.list[i].ID, // 一级帖子的ID
      commentLikeNumber: data.list[i].commentLikeNumber, // 点赞个数
      content: data.list[i].commentText, // 评论内容
      avatarUrl: data.list[i].userInfo.userAvatarUrl, // 评论头像
      nickname: data.list[i].userInfo.userNickname, // 评论昵称
      commentSons: data.list[i].commentSons, // 二级评论数组
      date: data.list[i].CreatedAt,
    }
    commentList.value.push(obj)
  }
  isCommentShow.value = true
  console.log(commentList.value)
})
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

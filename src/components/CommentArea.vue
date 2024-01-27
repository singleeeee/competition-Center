<template>
  <view class="title">评论({{ commentNum }})</view>
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
      <slot>{{ item.content }}</slot>
    </template>
  </nameTitle>
</template>
<script lang="ts" setup>
import nameTitle from './nameTitle.vue'
import { ref } from 'vue'
defineProps({
  commentNum: {
    type: Number,
    default: 0,
  },
})

const commentList = ref([
  {
    avatarUrl:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
    nickname: '代金宇',
    content: '老铁666',
    nicknameColor: 'orange',
  },
  {
    avatarUrl:
      'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
    nickname: '马春丽',
    content: '你好',
    nicknameColor: '#aaa',
  },
])
</script>
<style scoped>
.title {
  margin: 0 20rpx;
  color: #aaa;
  font-size: 28rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #eee;
}
</style>

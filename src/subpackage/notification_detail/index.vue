<template>
  <view v-if="isPostShow">
    <view class="header">
      <nameTitle
        :author="postDetail.userInfo.userNickname"
        :avatar-url="postDetail.userInfo.userAvatarUrl"
        :date="postDetail.date"
        :extra="postDetail.extra"
      ></nameTitle>
    </view>
    <PostBody
      :content="postDetail.disContent"
      :title="postDetail.disTitle"
      :img-list="postDetail.disPicture"
      :dis-id="postDetail.ID"
      :authorId="postDetail.userInfo.ID"
      :liked="postDetail.isLiked"
      :collected="postDetail.isCollected"
    ></PostBody>
    <CommentArea :disId="postDetail.ID"></CommentArea>
  </view>
  <view v-else> 加载中</view>
</template>
<script lang="ts" setup>
import nameTitle from '@/components/nameTitle.vue'
import PostBody from '@/components/PostBody.vue'
import CommentArea from '@/components/CommentArea.vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { ref } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
// 帖子详细信息
const postDetail = ref()
// 控制帖子显示
const isPostShow = ref(false)
onLoad(async (options) => {
  const { disId } = options
  // 请求获取帖子详细信息
  const res = await http({
    url: `/app/dis/getDisInfoByid?ID=${disId}`,
  })
  postDetail.value = res.data.redisData

  const time = toLocalTime(postDetail.value.CreatedAt)
  // 修改时间
  postDetail.value.date = time
  const province = postDetail.value.userInfo.userCity

  // 修改省份
  postDetail.value.extra = province.slice(0, province.indexOf('/'))
  isPostShow.value = true
})
</script>
<style lang="scss" scoped>
.header {
  margin: 0 20rpx;
}
</style>

<script lang="ts" setup>
import card from './components/card.vue'
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { PostList } from '@/types/global'
import { onReachBottom } from '@dcloudio/uni-app'

const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
let postList = ref<PostList[]>([])
onMounted(() => {
  getPostList()
})
// 获取帖子列表
const getPostList = async () => {
  // 返回的数据
  const dataList = ref<any>([])
  // 请求数据
  const res = await http({
    url: `/app/dis/getDisInfoList?ID=${userInfo.value.ID}`,
  })
  dataList.value = (res.data as any).list
  // 处理需要的数据 用map失效？
  for (let i = 0; i < dataList.value.length; i++) {
    // 处理时间
    const data = new Date((dataList.value[i] as any).CreatedAt)
    const year = data.getFullYear()
    const month = data.getMonth() + 1
    const day = data.getDate()
    const time = `${year}/${month}/${day}`
    // 最终格式
    const obj: PostList = {
      ID: dataList.value[i].ID, // 帖子ID
      isLike: true, // 帖子是否被点赞
      disComId: dataList.value[i].disComId, // 关联的比赛ID
      title: dataList.value[i].disTitle, // 帖子标题
      content: dataList.value[i].disContent, // 帖子内容
      time, // 帖子发布时间
      collectedNum: dataList.value[i].disCollectNumber, // 帖子被收藏数量
      likedNum: dataList.value[i].disLoveNumber, // 帖子被点赞数量
      author: dataList.value[i].userInfo.userNickname, // 帖子作者昵称
      avatarUrl: dataList.value[i].userInfo.userAvatarUrl, // 帖子作者头像
      imageUrl: dataList.value[i].disPicture, // 帖子首页展示图片，只展示第一张
      disCommentNum: dataList.value[i].disCommentNumber, // 帖子被评论数量
      disLookNum: dataList.value[i].disLookNumber, // 帖子被浏览数量
    }
    console.log(obj)
    // 存入数组
    postList.value.push(obj)
  }
  console.log('获取数据成功')
}
// 点赞和取消点赞
const like = (val: boolean) => {
  if (val) {
    const res = http({
      url: `/app/dis/userLikeDis?ID=${userInfo.value.ID}`,
    })
    console.log(res)
  } else {
    const res = http({
      url: `/app/dis/userUnLikeDis?ID=${userInfo.value.ID}`,
    })
    console.log(res)
  }
}

const collect = (val: boolean) => {}

// 当前页码
const pagenum = ref(0)

// 上滑触底效果
onReachBottom(() => {
  console.log('触底了')
})
</script>

<template>
  <view class="container">
    <card
      v-for="(item, index) in postList"
      :key="index"
      :author="item.author"
      :title="item.title"
      :content="item.content"
      :time="item.time"
      :avatar-url="item.avatarUrl"
      :imageUrl="item.imageUrl[0]"
      :collected-num="item.collectedNum"
      :comment-num="item.collectedNum"
      :liked-num="item.likedNum"
      :isLike="item.isLike"
      :isCollect="false"
      @collect="collect"
      @like="like"
      @liked-change="item.likedNum += $event.detail"
      @collected-change="item.collectedNum += $event.detail"
    ></card>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f1f1f3;
}
</style>

<script lang="ts" setup>
import card from './components/card.vue'
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { PostList } from '@/types/global'
import { onReachBottom } from '@dcloudio/uni-app'

const userInfoStore = useUserInfoStore()
let postList = ref<PostList[]>([])
onMounted(() => {
  getPostList()
})
// 当前页数
const currentPage = ref(1)
// 当前页面大小
const pageSize = ref(5)
// 最大帖子数量
const total = ref(1000000)
// 获取帖子列表
const getPostList = async () => {
  uni.showLoading()
  // 返回的数据
  const dataList = ref<any>([])
  // 请求数据
  const res = await http({
    url: `/app/dis/getDisInfoList`,
    data: {
      page: currentPage.value,
      pageSize: pageSize.value,
    },
  })
  total.value = res.data.total
  dataList.value = (res.data as any).list
  console.log(dataList.value)

  // 处理需要的数据 用map失效？
  for (let i = 0; i < dataList.value.length; i++) {
    // 处理时间
    const data = new Date((dataList.value[i] as any).CreatedAt)
    const year = data.getFullYear()
    const month = data.getMonth() + 1
    const day = data.getDate()
    const time = `${year}/${month}/${day}`
    // 最终格式
    const obj = {
      ID: dataList.value[i].ID, // 帖子ID
      isLiked: dataList.value[i].isLiked, // 帖子是否被点赞
      isCollected: dataList.value[i].isCollected, // 帖子是否被收藏
      disComId: dataList.value[i].disComId, // 关联的比赛ID
      title: dataList.value[i].disTitle, // 帖子标题
      content: dataList.value[i].disContent, // 帖子内容
      time, // 帖子发布时间
      collectedNum: dataList.value[i].disCollectNumber, // 帖子被收藏数量
      likedNum: dataList.value[i].disLoveNumber, // 帖子被点赞数量
      userInfoID: dataList.value[i].userInfo.ID, // 帖子作者的ID
      author: dataList.value[i].userInfo.userNickname, // 帖子作者昵称
      avatarUrl: dataList.value[i].userInfo.userAvatarUrl, // 帖子作者头像
      imageUrl: dataList.value[i].disPicture || [], // 帖子首页展示图片，只展示第一张
      disCommentNum: dataList.value[i].disCommentNumber, // 帖子被评论数量
      disLookNum: dataList.value[i].disLookNumber, // 帖子被浏览数量
    }
    // 存入数组
    postList.value.push(obj)
    uni.hideLoading()
  }
  console.log('修改后的帖子列表信息', postList.value)
}
// 点赞和取消点赞
const likedChange = async (val: boolean, index: number) => {
  if (val) {
    console.log('点赞')
    http({
      url: '/app/dis/userLikeDis',
      data: {
        ID: postList.value[index].ID, // 帖子ID
        likeUserID: postList.value[index].userInfoID, // 帖子作者的ID
      },
    })
    postList.value[index].isLiked = true
    postList.value[index].likedNum++
  } else {
    console.log('取消点赞')
    http({
      url: `/app/dis/userUnLikeDis?ID=${postList.value[index].ID}&dislikeUserID=${postList.value[index].userInfoID}`,
      method: 'DELETE',
    })
    postList.value[index].isLiked = false
    postList.value[index].likedNum--
  }
}
// 收藏
const collectedChange = async (val: boolean, index: number) => {
  if (val) {
    console.log('收藏')
    http({
      url: '/app/dis/userCollectDis',
      data: {
        disID: postList.value[index].ID,
      },
    })
    postList.value[index].isCollected = true
    postList.value[index].collectedNum++
  } else {
    console.log('取消收藏')
    http({
      url: `/app/dis/userCancelCollectDis?disID=${postList.value[index].ID}`,
      method: 'DELETE',
    })
    postList.value[index].isCollected = false
    postList.value[index].collectedNum--
  }
}

// 当前页码
const pagenum = ref(0)

// 上滑触底效果
onReachBottom(() => {
  console.log('触底了')
  if (currentPage.value * pageSize.value >= total.value) {
    uni.showToast({
      title: '页面到底啦！',
      icon: 'none',
      mask: true,
    })
    return
  }
  currentPage.value++
  getPostList()
})
// 点击评论跳转到详情页
const switchToDetail = (index: number) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${postList.value[index].ID}`,
  })
}
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
      :comment-num="item.disCommentNum"
      :liked-num="item.likedNum"
      :isLiked="item.isLiked"
      :isCollected="item.isCollected"
      :id="index"
      @liked-change="likedChange"
      ;
      @collected-change="collectedChange"
      @switchToDetail="switchToDetail"
    ></card>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f1f1f3;
}
</style>

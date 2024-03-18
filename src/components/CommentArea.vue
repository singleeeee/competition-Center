<template>
  <view class="container">
    <view class="title">评论 ({{ commentTotal }}) </view>
    <template v-if="commentList.length > 0">
      <nameTitle
        v-for="(item, index) in commentList"
        :key="index"
        :is-comment="true"
        :border="true"
        :author="item.nickname"
        :avatar-url="item.avatarUrl"
        :date="toLocalTime(item.date)"
        :commentID="item.commentDisId"
        :extra="item.city.split('/')[0]"
        :candelete="item.userId === userInfo.ID"
        @tap-avatar="toUserHome(item.userId)"
        @refleshComment="refleshComment"
        @open-input="openInput(item.commentDisId, true)"
      >
        <template #comment>
          <slot>
            <view>
              <view class="commentText">
                {{ item.content }}
                <!-- 二级评论 -->
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
                    <view class="right" @tap.stop="showTips(items.ID)">
                      <view v-if="items.userInfo.ID === userInfo.ID">
                        <uni-icons type="closeempty" color="#ccc" size="18" />
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </slot>
        </template>
      </nameTitle>
    </template>
    <template v-else>
      <view style="display: flex; justify-content: center; align-items: center">
        <image src="../static/empty/emptyComment.png" mode="scaleToFill" />
      </view>
    </template>
  </view>
  <!-- 评论框 -->
  <view class="inputArea" @tap="openInput(props.disId, false)">
    <!-- 首页或自动打开 -->
    <view class="input"></view>
    <view class="imgBox">
      <image
        style="width: 46rpx; height: 46rpx; margin-left: 20rpx"
        src="@/static/Input/face.png"
      ></image>
      <image
        style="width: 54rpx; height: 54rpx; margin-left: 20rpx"
        src="@/static/Input/picture.png"
      ></image>
    </view>
  </view>
  <!-- 评论弹窗 -->
  <uni-popup ref="popup" type="center" @mask-click="closeInput">
    <MyInput
      v-model:textarea="textarea"
      @send="send(currentCommentID, isSecondComment)"
      @clearImgList="clearImgList"
    ></MyInput>
  </uni-popup>
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      content="您确认要删除这条评论吗？"
      @confirm="delSecondComment(secondCommentId)"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script lang="ts" setup>
import nameTitle from './nameTitle.vue'
import MyInput from '@/components/MyInput.vue'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { onMounted } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { myThrottle } from '@/utils/myThrottle'
onPullDownRefresh(async () => {
  console.log('刷新')
  await getCommentList(props.disId)
  uni.stopPullDownRefresh()
})
// 为啥用onLoad不行？
onMounted(async () => {
  getCommentList(props.disId)
  console.log(commentList.value)
})

onReachBottom(
  myThrottle(async () => {
    if (+commentTotal.value > currentPageNum.value * pageSize.value) {
      uni.showLoading()
      currentPageNum.value++
      await getCommentList(props.disId)
      uni.hideLoading()
    } else {
      if (currentPageNum.value !== 1)
        uni.showToast({
          title: '已经到底了！',
          icon: 'none',
          mask: true,
          duration: 500,
        })
    }
  }, 1000),
)
const props = defineProps({
  disId: {
    type: Number,
    default: 1,
  },
})
// 确认删除评论弹窗ref
const alertDialog = ref()
let secondCommentId = 0
const showTips = (ID: number) => {
  secondCommentId = ID
  alertDialog.value.open()
}

// 初始化仓库数据
const { userInfo } = storeToRefs(useUserInfoStore())

// 控制评论区显示隐藏
const isCommentShow = ref(false)
// 评论总条数
let commentTotal = ref('')
// 评论数组
let commentList = ref([])

// 当前总页数
const currentPageNum = ref(1)
// 分页大小
const pageSize = ref(10)
// 获取评论数组
const getCommentList = async (disId: number) => {
  const { data } = await http({
    url: '/app/comment/getCommentInfoList',
    data: {
      page: currentPageNum.value,
      pageSize: pageSize.value,
      commentDisId: disId,
    },
  })
  commentTotal.value = data.total
  if (currentPageNum.value === 1) {
    commentList.value = []
  }
  for (let i = 0; i < data.list.length; i++) {
    const obj = {
      commentDisId: data.list[i].ID, // 一级帖子的ID
      commentLikeNumber: data.list[i].commentLikeNumber, // 点赞个数
      content: data.list[i].commentText, // 评论内容
      avatarUrl: data.list[i].userInfo.userAvatarUrl, // 评论头像
      nickname: data.list[i].userInfo.userNickname, // 评论昵称
      commentSons: data.list[i].commentSons, // 二级评论数组
      date: data.list[i].CreatedAt,
      userId: data.list[i].userInfo.ID, // 用户ID
      city: data.list[i].userInfo.userCity, // 用户城市
    }
    commentList.value.push(obj)
  }
  isCommentShow.value = true
}
// 跳转到用户页面
const toUserHome = (disId: number) => {
  uni.navigateTo({
    url: `/pages/mine/personPage/index?userID=${disId}`,
  })
}
// 发送评论 ID 帖子ID or 一级评论的ID
const send = async (ID: number, isSecondComment: boolean) => {
  if (textarea.value.trim() !== '') {
    if (!isSecondComment) {
      uni.showLoading()
      // 一级评论
      await http({
        url: '/app/comment/createCommentInfo',
        method: 'POST',
        data: {
          commentDisId: ID,
          commentText: textarea.value,
        },
      })
      currentPageNum.value = 1
      await getCommentList(props.disId)
      uni.hideLoading()
      popup.value.close()
      textarea.value = ''
    } else {
      uni.showLoading()
      http({
        url: '/app/comment/createCommentSonInfo',
        method: 'POST',
        data: {
          commentCommentId: ID,
          commentText: textarea.value,
        },
      })
      textarea.value = ''
      currentPageNum.value = 1
      await getCommentList(props.disId)
      uni.hideLoading()
      popup.value.close()
    }
  } else {
    uni.showToast({
      title: '评论不能为空',
      icon: 'none',
    })
  }
}
// 当前评论类型的ID
const currentCommentID = ref(0)
// 是否二级评论
const isSecondComment = ref(false)
// 输入框popup
const popup = ref()
// 打开输入框
const openInput = (ID: number, SecondComment: boolean) => {
  console.log(ID)
  currentCommentID.value = ID
  isSecondComment.value = SecondComment
  popup.value.open('bottom')
}
// 输入框绑定内容
let textarea = ref('')
// 关闭输入框
const closeInput = () => {
  console.log(textarea.value)
}
// 清空组件的图片列表
const clearImgList = () => {
  console.log('清空')
}
// 刷新评论区，回到顶部
const refleshComment = () => {
  currentPageNum.value = 1
  getCommentList(props.disId)
}
// 删除二级评论
const delSecondComment = async (ID: number) => {
  await http({
    url: `/app/comment/deleteCommentSonInfo?ID=${ID}`,
    method: 'DELETE',
  })
  currentPageNum.value = 1
  getCommentList(props.disId)
}
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
  padding-bottom: 80rpx;
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
.inputArea {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 99;
  height: 80rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: -2rpx 0 2rpx 2rpx #eee;
  .input {
    box-sizing: border-box;
    margin: 0 20rpx;
    padding: 0 20rpx;
    width: 70%;
    height: 50rpx;
    background-color: #f0f3f8;
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    color: #ccc;
    font-size: 28rpx;
  }
  .imgBox {
    display: flex;
    align-items: center;
  }
}
</style>

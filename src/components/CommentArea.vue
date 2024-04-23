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
        @open-input="updateCurCommentId(item.commentDisId, true)"
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
                      <text :selectable="true" :user-select="true" class="content">{{
                        items.commentText
                      }}</text>
                      <view class="replyTime"
                        >{{ toLocalTime(items.CreatedAt) }}
                        {{
                          items.userInfo.userCity.slice(0, items.userInfo.userCity.indexOf('/'))
                        }}</view
                      >
                    </view>
                    <!-- 删除评论 -->
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
  <!-- <view class="inputArea" @tap="updateCurCommentId(props.disId, false)"> -->
  <view class="inputArea">
    <!-- 首页或自动打开 -->
    <view class="input">
      <textarea
        class="textarea"
        :placeholder="placeholder"
        auto-height
        v-model="textarea"
        :cursor-spacing="20"
        :show-confirm-bar="false"
        @input="onInput"
        @blur="blur"
        :focus="isFocus"
        disable-default-padding
      />
    </view>
    <view class="imgBox">
      <button class="btn" @tap="send(currentCommentID, isSecondComment)">发送</button>
    </view>
  </view>
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      content="您确认要删除这条评论吗？"
      @confirm="delSecondComment(secondCommentId)"
    ></uni-popup-dialog>
  </uni-popup>
</template>
<script lang="ts" setup>
import nameTitle from './nameTitle.vue'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { onMounted } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { myThrottle } from '@/utils/myThrottle'
onPullDownRefresh(async () => {
  await getCommentList(props.disId)
  uni.stopPullDownRefresh()
})
// 为啥用onLoad不行？
onMounted(async () => {
  getCommentList(props.disId)
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
// 输入事件
const onInput = (e) => {
  textarea.value = e.detail.value
}
// 输入框是否聚焦
const isFocus = ref(false)
const props = defineProps({
  disId: {
    type: Number,
    default: 1,
  },
})
// 输入框失焦
const blur = () => {
  isFocus.value = false
}

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
// 占位符
const placeholder = ref('评论')
// 发送评论 ID 帖子ID or 一级评论的ID
const send = async (ID: number, isSecond: boolean) => {
  if (textarea.value.trim() !== '') {
    if (!isSecond) {
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
      // 将评论发送重置为默认一级评论
      currentCommentID.value = props.disId
      isSecondComment.value = false
      textarea.value = ''
      isFocus.value = false
    } else {
      // 发送二级评论
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
      // 将评论发送重置为默认一级评论
      currentCommentID.value = props.disId
      isSecondComment.value = false
      uni.hideLoading()
      isFocus.value = false
    }
  } else {
    uni.showToast({
      title: '评论不能为空',
      icon: 'none',
    })
  }
}
// 当前评论类型的ID
const currentCommentID = ref(props.disId)
// 是否二级评论
const isSecondComment = ref(false)
// 打开输入框
const updateCurCommentId = (ID: number, SecondComment: boolean) => {
  isFocus.value = true
  currentCommentID.value = ID
  isSecondComment.value = SecondComment
}
// 输入框绑定内容
let textarea = ref('')
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
  padding: 10rpx 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: -2rpx 0 2rpx 4rpx #eee;
  .input {
    box-sizing: border-box;
    margin: 0 0 0 20rpx;
    padding: 10rpx 20rpx;
    width: 70%;
    background-color: #f0f3f8;
    border-radius: 30rpx;
    display: flex;
    min-height: 70rpx;
    align-items: center;
    color: #ccc;
    font-size: 28rpx;
    .textarea {
      box-sizing: border-box;
      color: black;
      width: 100%;
      text-align: justify;
    }
  }
  .imgBox {
    display: flex;
    align-items: center;
    margin-right: 30rpx;
    .btn {
      border: 0;
      width: 140rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      background-color: #12a66a;
      box-shadow: 0rpx 1rpx 12rpx 4rpx #efefef;
      color: #eee;
      border-radius: 30rpx;
    }
  }
}
</style>

<template>
  <template v-if="isLog">
    <uni-collapse ref="collapse">
      <!-- 好友分组 -->
      <uni-collapse-item v-for="(group, index) in groupList" :key="index" :title="group.groupName">
        <view class="content">
          <view class="frdbox" v-for="item in group.groupMember" :key="item.id">
            <view>
              <image class="image" :src="item.userAvatarUrl" mode="scaleToFill" />
            </view>
            <view class="body" @tap="switchToChat(item.userID)">
              <view class="nickname">{{ item.userNickname }}</view>
              <view class="info">{{ item.userIntroduction }}</view>
            </view>
            <view class="statusBox">
              <view class="status" :style="{ color: item.isOnline ? 'green' : '#ccc' }">{{
                item.isOnline ? '在线' : '离线'
              }}</view>
              <button plain @tap="switchToChat(item.userID)">聊天</button>
            </view>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </template>
  <view v-else class="login">请先登录!</view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores'
// 登录状态
const isLog = ref(false)

onShow(async () => {
  if (useUserInfoStore().userInfo.token) {
    getFriends()
    isLog.value = true
  }
})
// 获取好友列表
const getFriends = async () => {
  groupList.value[0].groupMember = []
  // 获取朋友列表
  const res = await http({
    url: `/app/user/showUserFriend?userID=${useUserInfoStore().userInfo.ID}`,
  })
  for (let i = 0; i < res.data.length; i++) {
    groupList.value[0].groupMember.push(res.data[i])
  }
}

const switchToChat = (targetID: number) => {
  uni.navigateTo({ url: `/pages/community/chatRoom/index?targetID=${targetID}` })
}

const groupList = ref([
  {
    id: 1,
    groupName: '我的好友',
    groupMember: [
      // {
      //   userID: 3,
      //   userNickname: '代金宇',
      //   userAvatarUrl:
      //     'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
      //   userIntroduction: '我踏马来啦',
      //   isOnline: '在线',
      // },
    ],
  },
])
</script>
<style scoped lang="scss">
.frdbox {
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  .image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-color: skyblue;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    .nickname {
      font-weight: 700;
      font-size: 28rpx;
      padding-bottom: 10rpx;
    }
    .info {
      font-size: 20rpx;
    }
  }
  .statusBox {
    box-sizing: border-box;
    width: 80rpx;
    .status {
      font-size: 20rpx;
      text-align: center;
      padding-bottom: 5rpx;
    }

    button {
      display: block;
      width: 80rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 20rpx;
      font-weight: 700;
      padding: 0;
      border-radius: 1rpx;
      border: 1px solid black;
    }
  }
}
.login {
  text-align: center;
  margin-top: 10vh;
  font-size: 40rpx;
}
</style>

<template>
  <uni-collapse ref="collapse">
    <!-- 好友分组 -->
    <uni-collapse-item
      v-for="(group, index) in groupList"
      :key="index"
      open
      :title="group.groupName"
    >
      <view class="content">
        <view class="frdbox" v-for="item in group.groupMember" :key="item.id">
          <view>
            <image class="image" :src="item.avatar" mode="scaleToFill" />
          </view>
          <view class="body" @tap="switchToChat(item.userID)">
            <view class="nickname">{{ item.nickname }}</view>
            <view class="info">{{ item.info }}</view>
          </view>
          <view class="statusBox">
            <view class="status" :style="{ color: item.status === '在线' ? 'green' : 'gray' }">{{
              item.status
            }}</view>
            <button @tap="switchToChat">聊天</button>
          </view>
        </view>
      </view>
    </uni-collapse-item>
  </uni-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const switchToChat = (targetID: number) => {
  uni.navigateTo({ url: `/pages/test/index?targetID=${targetID}` })
}

const groupList = ref([
  {
    id: 1,
    groupName: '我的好友',
    groupMember: [
      {
        id: 1,
        userID: 3,
        nickname: '代金宇',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
        info: '我踏马来啦',
        status: '在线',
      },
      {
        id: 2,
        nickname: '马春丽',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
        info: '好极了',
        status: '离线',
      },
      {
        id: 3,
        nickname: '阮志荣',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-02-05/微信图片_20240201173945.jpg',
        info: '我踏马来啦',
        status: '在线',
      },
    ],
  },
  {
    id: 1,
    groupName: '重生之带学妹拿奖',
    groupMember: [
      {
        id: 1,
        nickname: '代金宇',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/yjddb.jpg',
        info: '我踏马来啦',
        status: '在线',
      },
      {
        id: 2,
        nickname: '马春丽',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
        info: '好极了',
        status: '离线',
      },
      {
        id: 3,
        nickname: '阮志荣',
        avatar:
          'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-02-05/微信图片_20240201173945.jpg',
        info: '我踏马来啦',
        status: '在线',
      },
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
      line-height: 40rpx;
      font-size: 20rpx;
      font-weight: 700;
      padding: 0;
      border-radius: 1rpx;
      border: 1px solid black;
    }
  }
}
</style>

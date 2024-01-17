<template>
  <uni-collapse ref="collapse">
    <!-- 好友分组 -->
    <uni-collapse-item title="我的好友">
      <view class="content">
        <view class="frdbox" v-for="item in myFriendsList" :key="item.id">
          <view class="image"></view>
          <view class="body">
            <view class="nickname">{{ item.nickname }}</view>
            <view class="info">{{ item.info }}</view>
          </view>
          <view class="statusBox">
            <view class="status" :style="{ color: item.status === '在线' ? 'green' : 'gray' }">{{
              item.status
            }}</view>
            <button>聊天</button>
          </view>
        </view>
      </view>
    </uni-collapse-item>
    <uni-collapse-item title="小程序队友">
      <view class="content">
        <view class="frdbox" v-for="item in teamList" :key="item.id">
          <view class="image"></view>
          <view class="body">
            <view class="nickname">{{ item.nickname }}</view>
            <view class="info">{{ item.info }}</view>
          </view>
          <view class="statusBox">
            <view class="status" :style="{ color: item.status === '在线' ? 'green' : 'gray' }">{{
              item.status
            }}</view>
            <button>聊天</button>
          </view>
        </view>
      </view>
    </uni-collapse-item>
  </uni-collapse>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const myFriendsList = ref([
  {
    id: 1,
    nickname: '代金宇',
    avatar: '',
    info: '我踏马来啦',
    status: '在线',
  },
  {
    id: 2,
    nickname: '张翰',
    avatar: '',
    info: 'Unity，启动！',
    status: '离线',
  },
])
const teamList = ref([
  {
    id: 1,
    nickname: '代金宇',
    avatar: '',
    info: '我踏马来啦',
    status: '在线',
  },
  {
    id: 2,
    nickname: '马春丽',
    avatar: '',
    info: '我想回家',
    status: '离线',
  },
])
</script>
<style scoped lang="scss">
.frdbox {
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
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

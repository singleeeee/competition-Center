<template>
  <view class="container">
    <view class="items" v-for="(item, index) in List" :key="item.id">
      <view class="left">{{ item.title }}</view>
      <view class="right">
        <view class="back">
          <view class="avatar" v-show="index === 0">
            <image class="avatar" :src="userInfo.avatarUrl" mode="scaleToFill" />
          </view>
          <span style="color: #ccc; font-size: 28rpx">{{ item.back }}</span>
        </view>
        <uni-icons type="right" color="#ccc" size="20" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const userInfo = uni.getStorageSync('userInfo')
const List = [
  {
    id: '1',
    title: '更换头像',
    back: '',
  },
  {
    id: '2',
    title: '昵称',
    back: userInfo.nickname,
  },
  {
    id: '3',
    title: '所在城市',
    back: '广东，东莞',
  },
  {
    id: '4',
    title: '简介',
    back: '',
  },
  {
    id: '5',
    title: '性别',
    back: '男',
  },
  {
    id: '6',
    title: '生日',
    back: '2003-10-10',
  },
  {
    id: '7',
    title: '个人标签',
    back: '大二、厨子、铜牌',
  },
]
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;

  .items {
    height: 140rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #eee;
    padding: 0 20rpx;
    &:active {
      background-color: #eee;
    }

    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: skyblue;
        margin-right: 20rpx;
      }
    }
  }
}
</style>

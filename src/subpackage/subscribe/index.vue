<template>
  <view class="container">
    <template v-if="subscribeList.length > 0">
      <view
        class="comBox"
        v-for="(item, index) in subscribeList"
        :key="index"
        @tap="navigateToCom(item.comInfo.ID)"
      >
        <view class="header">
          <view class="name_rate">
            <p class="text">{{ item.comInfo.comTitle }}</p>
            <uni-rate readonly :touchable="false" :value="4" />
          </view>
          <view class="date">
            {{ toLocalTime(item.comInfo.comStart).split(' ')[0] }} -
            {{ toLocalTime(item.comInfo.comEnd).split(' ')[0] }}</view
          >
        </view>
        <view class="body">
          <view class="status">目前进度：{{ statusToWidth(item.comInfo.comStatus, false) }}</view>
          <view class="radius">
            <view
              class="current"
              :style="{ width: statusToWidth(item.comInfo.comStatus, true) + '%' }"
            >
              <view class="round"></view>
            </view>
          </view>
          <view class="text"
            >详情
            <uni-icons type="forward" color="#666" size="14" />
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="empty">
        <image src="@/static/empty/emptyBox.png" mode="scaleToFill" />
        暂无订阅比赛
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const { userInfo } = userInfoStore
onLoad(() => {
  //获取订阅比赛列表
  getSubscribeList()
})
const comStatusWidth = ref(0)
// 将状态转换成进度条,true 表示返回width ， false表示返回文字
const statusToWidth = (status: number, mode: boolean) => {
  switch (status) {
    // 未开始
    case 1:
      return mode ? 0 : '未开始'
    // 报名中
    case 2:
      return mode ? 25 : '报名中'
    // 截止报名
    case 3:
      return mode ? 50 : '截止报名'
    //比赛中
    case 4:
      return mode ? 75 : '比赛中'
    // 已结束
    case 5:
      return mode ? 100 : '已结束'
  }
  return mode ? 0 : '未开始'
}
const subscribeList = ref([])
//获取订阅比赛列表
const getSubscribeList = async () => {
  const res = await http({
    url: '/app/sub/getSubInfoList',
    data: {
      userId: userInfo.ID,
    },
  })
  res.data.list.forEach((element) => {
    subscribeList.value.push(element)
  })
  console.log(subscribeList.value)
}
// 跳转到比赛页面
const navigateToCom = (comID: number) => {
  uni.navigateTo({
    url: `/subpackage/comDetail/index?comID=${comID}`,
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f5f5f5;
  .comBox {
    background-color: #fff;
    border-radius: 30rpx;
    overflow: hidden;
    box-shadow: 0rpx 4rpx 12rpx 2rpx #ddd;
    margin-bottom: 60rpx;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 20rpx;
      background: linear-gradient(to right bottom, #7bd686, #4c9872);
      .name_rate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 52rpx;
          padding-left: 20rpx;
          color: #fff;
          font-weight: 700;
        }
      }
      .date {
        padding: 10rpx 20rpx;
        font-size: 32rpx;
        color: #f1f1f1;
      }
    }
    .body {
      .status {
        padding: 8rpx 40rpx;
        font-weight: 700;
        font-size: 28rpx;
      }
      .radius {
        margin: 10rpx 10rpx 0rpx 40rpx;
        width: 460rpx;
        height: 30rpx;
        background-color: #e8e6ea;
        border-radius: 20rpx;
        overflow: hidden;
        .current {
          position: relative;
          height: 100%;
          width: 200rpx;
          border-radius: 20rpx;
          background-color: #50a67b;
          .round {
            float: right;
            height: 30rpx;
            width: 30rpx;
            border-radius: 50%;
            background-color: #64bc6e;
          }
        }
      }
      .text {
        padding: 10rpx 0 20rpx 40rpx;
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #aaa;
}
</style>

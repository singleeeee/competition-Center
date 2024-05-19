<template>
  <view class="containerBox">
    <template v-if="teamInfoList.length > 0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none" v-for="(item, index) in teamInfoList" :key="index">
          <template v-slot:title>
            <view class="titleBox">
              <view class="container">
                <view class="flex items-center mb-4">
                  <image class="comImg" :src="item.comPicture" mode="scaleToFill" />
                  <view class="titleContent ml-2">
                    <view class="TeamName">{{ item.groupName }}</view>
                    <view class="title">{{ item.comTitle }}</view>
                  </view></view
                >
                <view class="flex text-[#7d8592]">
                  <uni-icons class="mx-2" type="calendar" color="#7d8592" size="24" />
                  <view>
                    <view>Start date {{ dayjs(item.comStart).format('MMM D，YYYY') }}</view>
                    <view>Over data {{ dayjs(item.comEnd).format('MMM D，YYYY') }}</view>
                  </view>
                </view>
              </view>
            </view>
          </template>
          <view class="contentBox">
            <view class="teamerBox">
              <view class="font-bold mb-2 text-lg">队伍成员</view>
              <image
                v-for="(teamer, teamerIndex) in item.userInfoList"
                :key="teamerIndex"
                class="item"
                :src="teamer.userAvatarUrl"
              ></image>
            </view>
            <view class="btnBox">
              <view
                class="btn bg-[#f4f4f5] text-gray-600"
                style="border-color: #c8c9cc"
                @tap="toComIndex(item.comID)"
                >比赛详情</view
              >
              <view
                class="btn bg-[#fef0f0]"
                style="border-color: #fab6b6; color: #f56c6c"
                @tap="toTeamDetail(item)"
                >队伍详情</view
              >
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </template>
    <template v-else>
      <view class="empty">
        <image src="@/static/empty/emptyBox.png" mode="scaleToFill" />
        暂无比赛队伍
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores/index'
import { getGroupInfoList } from '@/api/group/group'
import { toTeamList } from '@/utils/idToTeamList'
import type { UserInfo } from '@/types/global'

import { ref } from 'vue'
import dayjs from 'dayjs'
const { userInfo } = useUserInfoStore()
onShow(() => {
  getTeamInfo()
})
// 队伍信息数组
let teamInfoList = ref([])
// 获取组队信息
const getTeamInfo = async () => {
  teamInfoList.value = []
  // 获取队伍信息
  const res = await getGroupInfoList({
    groupUsersId: userInfo.ID.toString(),
  })
  for (let j = 0; j < res.data.list.length; j++) {
    // 获取队伍信息
    const teamInfo = {
      teamId: res.data.list[j].ID,
      groupCaptainId: res.data.list[j].groupCaptainId,
      groupName: res.data.list[j].groupName,
      groupStatus: res.data.list[j].groupStatus,
    }
    // 获取比赛信息
    const comDetail = await getComInfo(res.data.list[j].comId)
    let userInfoList: UserInfo[] = []
    userInfoList = (await toTeamList(res.data.list[j].groupUsersId)) as any
    const result = Object.assign(comDetail, { userInfoList }, teamInfo)
    teamInfoList.value.push(result)
  }
}
// 根据比赛ID获取比赛信息
const getComInfo = async (comID: number) => {
  const res = await http({
    url: '/app/com/getComInfoByid',
    data: {
      ID: comID,
    },
  })
  const { ID, comTitle, comPicture, comStart, comEnd } = res.data.recomData
  let obj = {
    comID: ID,
    comTitle,
    comPicture,
    comStart,
    comEnd,
  }
  return obj
}

// 进入比赛
const toComIndex = (comID: number) => {
  uni.navigateTo({
    url: `/subpackage/comDetail/index?comID=${comID}`,
  })
}

// 进入比赛详情
const toTeamDetail = (data) => {
  uni.navigateTo({
    url: `/subpackage/teamDetail/index`,
    success: (res) => {
      res.eventChannel.emit('acceptDataFromTeam', data)
    },
  })
}
</script>

<style lang="scss" scoped>
.containerBox {
  box-sizing: border-box;
  padding: 10rpx 20rpx;
  min-height: 100vh;
  background-color: #f5f5f5;
  .titleBox {
    width: calc(100% - 40rpx);
    margin: 10rpx 20rpx;
    padding: 10rpx 20rpx;
    overflow: hidden;
    .container {
      border-bottom: 2rpx solid #eee;
      padding-bottom: 20rpx;
      .comImg {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
        margin-right: 20rpx;
        box-shadow: 0rpx 0rpx 4rpx 2rpx #ccc;
      }
      .titleContent {
        .TeamName {
          margin-bottom: 10rpx;
          font-weight: bold;
        }
        .title {
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }
  .contentBox {
    display: flex;
    align-items: center;
    margin: 10rpx 20rpx;
    padding: 20rpx 20rpx;
    background-color: #fff;
    .teamerBox {
      flex: 1;
      .item {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        &:not(:nth-child(2)) {
          margin-left: -10rpx;
          border: 2rpx solid #fff;
        }
      }
    }
    .btn {
      width: 150rpx;
      height: 60rpx;
      border: 1rpx solid #000;
      border-radius: 4rpx;
      text-align: center;
      line-height: 60rpx;
      margin-bottom: 20rpx;
    }
    .btnBox {
      width: 150rpx;
      display: flex;
      flex-direction: column;
    }
    .btn:active {
      background: #eee;
    }
  }
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #aaa;
}
</style>

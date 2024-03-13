<template>
  <view class="container">
    <view class="groupBox" v-for="(item, index) in teamInfoList" :key="index">
      <!-- 队伍名称 -->
      <view class="teamName">{{ item.groupName }}</view>
      <!-- 组队信息 -->
      <view class="teamInfo">
        <!-- 比赛信息 -->
        <view class="comBox">
          <img class="comImg" :src="item.comPicture" />
          <h1>{{ item.comTitle }}</h1>
        </view>

        <!-- 队伍信息 -->
        <view class="teamerBox">
          <view
            class="teamItem"
            v-for="(teamer, teamerIndex) in item.userInfoList"
            :key="teamerIndex"
          >
            <i class="head" v-if="teamerIndex === 0">队长</i>
            <i class="head" v-else>队员{{ teamerIndex }}</i>

            <img class="tearmerAvatar" :src="teamer.userAvatarUrl" />
            <h1 class="teamerNickname">{{ teamer.userNickname }}</h1>
          </view>
        </view>
      </view>
      <!-- 比赛信息 -->
      <view class="comDetailBox">
        <view class="timeItem">
          <span>比赛开始时间：</span>
          <p class="time">{{ item.comStart }}</p>
        </view>
        <view class="timeItem">
          <span>比赛结束时间：</span>
          <p class="time">{{ item.comEnd }}</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores/index'
import { ref } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
const { userInfo } = useUserInfoStore()
onLoad(() => {
  getTeamInfo()
})
// 队伍信息数组
let teamInfoList = ref([])
// 获取组队信息
const getTeamInfo = async () => {
  // 获取队伍信息
  const res = await http({
    url: '/app/group/getGroupInfoList',
    data: {
      groupUsersId: userInfo.ID,
    },
  })
  for (let j = 0; j < res.data.list.length; j++) {
    // 获取队伍信息
    const teamInfo = {
      teamId: res.data.list[j].ID,
      groupCaptainId: res.data.list[j].groupCaptainId,
      groupName: res.data.list[j].groupName,
    }
    // 获取比赛信息
    const comDetail = await getComInfo(res.data.list[j].comId)
    // 提取队员信息
    let arr = res.data.list[j].groupUsersId.split('-')
    arr.pop()
    arr.shift()
    let userInfoList = []
    for (let i = 0; i < arr.length; i++) {
      userInfoList.push(await getTeamerInfo(arr[i]))
    }
    const result = Object.assign(comDetail, { userInfoList }, teamInfo)
    teamInfoList.value.push(result)
  }
  console.log(teamInfoList.value, '组队信息')
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
    comStart: toLocalTime(comStart),
    comEnd: toLocalTime(comEnd),
  }
  return obj
}
// 根据用户ID获取队员信息
const getTeamerInfo = async (userID: number) => {
  const res = await http({
    url: '/app/user/getUserInfoByid',
    data: {
      ID: userID,
    },
  })

  const { ID, userNickname, userAvatarUrl } = res.data.reuserData
  const obj = {
    ID,
    userNickname,
    userAvatarUrl,
  }
  return obj
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 10rpx 20rpx;
  .groupBox {
    display: flex;
    flex-direction: column;
    border-radius: 10rpx;
    margin: 20rpx 0;
    background: #c9d6ff;
    background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff);
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);

    .teamName {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36rpx;
      font-weight: bold;
    }
    .teamInfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 30rpx 0;
    }
    .comDetailBox {
      display: flex;
      flex-direction: column;
      .timeItem {
        display: flex;
        padding-left: 20rpx;
        font-size: 28rpx;
        margin: 10rpx 0;
      }
    }
    .comBox {
      text-align: center;
      width: 140rpx;
      padding: 20rpx 10rpx;
      .comImg {
        width: 120rpx;
        height: 120rpx;
        background-color: skyblue;
        border-radius: 20rpx;
      }
    }
    .comTimeBox {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      font-size: 26rpx;
      color: #666;
      .time {
        font-size: 24rpx;
      }
    }
    .teamerBox {
      display: flex;
      .teamItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        .head {
          font-size: 28rpx;
        }
        .tearmerAvatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          background-color: skyblue;
          margin: 10rpx 10rpx;
        }
        .teamerNickname {
          font-size: 28rpx;
          color: #aaa;
        }
      }
    }
  }
}
</style>

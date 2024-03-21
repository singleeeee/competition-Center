<template>
  <view class="container">
    <template v-if="teamInfoList.length > 0">
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
          <view>
            <view class="timeItem">
              <span>比赛开始时间：</span>
              <p class="time">{{ item.comStart }}</p>
            </view>
            <view class="timeItem">
              <span>比赛结束时间：</span>
              <p class="time">{{ item.comEnd }}</p>
            </view>
          </view>
          <view>
            <button class="btn" @tap="onDel(item.teamId)">删除队伍</button>
          </view>
        </view>
      </view>
    </template>
    <template v-else>
      <view class="empty">
        <image src="@/static/empty/emptyBox.png" mode="scaleToFill" />
        暂无比赛队伍
      </view>
    </template>
  </view>
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      content="您确认要删除这个队伍吗"
      @confirm="delTeam()"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="删除成功" :duration="500"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="删除失败" :duration="500"></uni-popup-message>
  </uni-popup>
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
// 当前要删除的队伍的ID
let teamID = ref(0)
// 弹窗ref
const alertDialog = ref()
// 成功ref
const successInfo = ref()
// 失败ref
const errorInfo = ref()
// 点击删除按钮
const onDel = (teamId: number) => {
  alertDialog.value.open()
  teamID.value = teamId
}
// 删除队伍
const delTeam = async () => {
  if (teamID.value != 0) {
    try {
      http({
        url: '/app/group/deleteGroup?ID=' + teamID.value,
        method: 'DELETE',
      })
      teamInfoList.value = teamInfoList.value.filter((item) => item.teamId != teamID.value)
      successInfo.value.open()
    } catch (error) {
      errorInfo.value.open()
    }
  }
}
// 队伍信息数组
let teamInfoList = ref([])
// 获取组队信息
const getTeamInfo = async () => {
  teamInfoList.value = []
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10rpx 20rpx;
  min-height: 100vh;
  background-color: #f5f5f5;
  .groupBox {
    display: flex;
    flex-direction: column;
    border-radius: 30rpx;
    overflow: hidden;
    margin: 20rpx 0;
    background: #c9d6ff;
    background: -webkit-linear-gradient(to right, #e2e2e2, #c9d6ff);
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);
    box-shadow: 0rpx 4rpx 12rpx 2rpx #ddd;

    .teamName {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36rpx;
      font-weight: bold;
      padding: 10rpx 0;
    }
    .teamInfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 30rpx 0;
    }
    .comDetailBox {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      margin-bottom: 20rpx;
      .timeItem {
        display: flex;
        padding-left: 20rpx;
        font-size: 28rpx;
        margin: 10rpx 0;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70rpx;
        background-color: #2979ff;
        color: #fff;
        margin-top: 20rpx;
        margin-right: 40rpx;
        font-size: 24rpx;
        &:active {
          background-color: #0553a7;
          transform: scale(0.99);
        }
      }
    }
    .comBox {
      text-align: center;
      width: 140rpx;
      padding: 20rpx 10rpx;
      .comImg {
        width: 120rpx;
        height: 120rpx;
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
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #aaa;
}
</style>

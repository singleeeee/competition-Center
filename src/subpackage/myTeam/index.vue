<template>
  <view class="containerBox">
    <template v-if="teamInfoList.length > 0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none" v-for="(item, index) in teamInfoList" :key="index">
          <template v-slot:title>
            <view class="titleBox">
              <view class="container">
                <image class="comImg" :src="item.comPicture" mode="scaleToFill" />
                <view class="titleContent">
                  <view class="TeamName">{{ item.groupName }}</view>
                  <view class="title">{{ item.comTitle }}</view>
                </view>
                <view class="titleTime">
                  <view> {{ dayjs(item.comStart).format('YYYY.MM.DD') }}</view>

                  <view>{{ dayjs(item.comEnd).format('YYYY.MM.DD') }}</view>
                </view>
              </view>
            </view>
          </template>
          <view class="contentBox">
            <view class="teamerBox">
              <image
                v-for="(teamer, teamerIndex) in item.userInfoList"
                :key="teamerIndex"
                class="item"
                :src="teamer.userAvatarUrl"
              ></image>
            </view>
            <view class="btnBox">
              <view class="btn" @tap="toComIndex(item.comID)">进入比赛</view>
              <view class="btn" style="border-color: #e96f6f; color: #e96f6f" @tap="onDel(item.ID)"
                >解散队伍</view
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
  <!-- 确定删除弹窗 -->
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消"
      confirmText="确认"
      title="警告"
      content="您确认要解散这个队伍吗"
      @confirm="delTeam()"
    ></uni-popup-dialog>
  </uni-popup>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" message="删除成功" :duration="1000"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" message="删除失败" :duration="1000"></uni-popup-message>
  </uni-popup>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { useUserInfoStore } from '@/stores/index'
import { ref } from 'vue'
import { toLocalTime } from '@/utils/toLocalTime'
import dayjs from 'dayjs'
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
      const res = await http({
        url: '/app/group/deleteGroup?ID=' + teamID.value,
        method: 'DELETE',
      })
      if (res.code === '1') {
        teamInfoList.value = teamInfoList.value.filter((item) => item.teamId != teamID.value)
        successInfo.value.open()
      } else if (res.code === '7') {
        errorInfo.value.open()
      }
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
// 进入比赛
const toComIndex = (comID: number) => {
  uni.navigateTo({
    url: `/subpackage/comDetail/index?comID=${comID}`,
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
      display: flex;
      align-items: center;
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
        flex: 1;
        .TeamName {
          margin-bottom: 10rpx;
          font-weight: bold;
        }
        .title {
          font-size: 28rpx;
          color: #333;
        }
      }
      .titleTime {
        font-size: 28rpx;
        width: 200rpx;
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
        margin-right: 10rpx;
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

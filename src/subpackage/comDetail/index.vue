<template>
  <view class="container" v-if="!isSkeletonShow">
    <!-- 比赛图片 -->
    <view class="comImg">
      <image class="comImg" :src="comInfo.comPicture" mode="scaleToFill" />
    </view>
    <!-- 比赛倒计时 -->
    <view class="countDown">
      <view class="countDownTitle">
        <span v-if="timeRest > 0">{{ countDownText }} </span>
        <uni-countdown
          v-if="timeRest > 0"
          :font-size="16"
          :day="countDownDay"
          :hour="countDownHour"
          :minute="countDownMinute"
          background-color="#007AFF"
        />
        <view v-else-if="timeRest < 0" class="comEnd"> {{ countDownText }} </view>
      </view>
    </view>
    <!-- 比赛订阅 -->
    <button class="subscribe" v-if="!isSubscribe" plain @tap="comSubscribe">比赛订阅</button>
    <button class="subscribe subscribed" v-else plain @tap="cancelSubscribe">取消订阅</button>
    <!-- 比赛信息 -->
    <view class="detailBox">
      <view class="line">比赛信息 </view>
      <p>
        <span class="comName">赛事名称：</span>
        <text :user-select="true" class="detail">{{ comInfo.comTitle }}</text>
      </p>
      <p>
        <span class="comName">赛事时间：</span>
        <text :user-select="true" class="detail"
          >{{ toLocalTime(comInfo.comStart).split(' ')[0] }} -
          {{ toLocalTime(comInfo.comEnd).split(' ')[0] }}</text
        >
      </p>
      <p>
        <span class="comName">队伍数量：</span>
        <span class="detail">{{ comInfo.comNumber }} </span>
      </p>

      <p>
        <span class="comName">比赛类别：</span>
        <span class="detail">{{ comType }} </span>
      </p>
      <p>
        <span class="comName">比赛等级：</span>
        <span class="detail">{{ comRating }} </span>
      </p>
    </view>
    <!-- 比赛简介 -->
    <view class="shortInfoBox">
      <view class="line">比赛简介</view>
      <text :user-select="true" class="comSubTitle">{{ comInfo.comSubTitle }}</text>
    </view>
    <!-- 比赛详细介绍 -->
    <view class="shortInfoBox">
      <view class="line">详细介绍</view>
      <text :user-select="true" class="comSubTitle">{{ comInfo.comIntroduction }}</text>
    </view>
    <!-- 比赛评分 -->
    <view class="grade">
      <view class="line">比赛评价</view>
      <view class="star" style="margin-left: 50rpx; display: flex">
        得分：
        <uni-rate :value="4.5" allowHalf :is-fill="false" />
      </view>
    </view>
    <!-- 参赛报名 -->
    <view class="enter" v-if="timeRest !== -1">
      <view class="line">比赛报名</view>
      <!-- 组队邀请面板 -->
      <teamInvite :userID="userInfo.ID" :comID="+comID" />
      <button class="btn" v-if="!isSignUp" @tap="signUp">创建队伍</button>
      <!-- 队伍面板 -->
      <view class="teamInfo" v-if="isSignUp" @tap="toTeam">
        <view class="teamName">{{ teamInfo.groupName }}</view>
        <view class="teamers">
          <view class="teamItem" v-for="(item, index) in teamInfo.userInfoList" :key="index">
            <image class="avatar" :src="item.userAvatarUrl"></image>
            <view class="nickname" v-if="index === 0" style="color: orange">{{
              item.userNickname
            }}</view>
            <view class="nickname" v-else>{{ item.userNickname }}</view>
          </view>
          <!-- <button class="btn" @tap="onDel(teamInfo.ID)">删除队伍</button> -->
        </view>
        <!-- 队伍状态 -->
        <!-- 队伍状态 -->
        <view class="status" v-if="teamInfo.groupStatus === 1">待报名</view>
        <view class="status" v-else-if="teamInfo.groupStatus === 2">待审核</view>
        <view
          class="status"
          style="background-color: #95ec69; color: #000"
          v-else-if="teamInfo.groupStatus === 3"
          >报名成功</view
        >
        <view
          class="status"
          v-else-if="teamInfo.groupStatus === 4"
          style="background-color: lightcyan; color: red"
          >报名失败</view
        >
      </view>
    </view>
    <!-- 比赛通告 -->
    <view style="align-self: flex-start; margin-left: 20rpx; width: calc(100% - 40rpx)">
      <RelatetivePost :disComid="comID" disModel="2" title="比赛通告" />
    </view>
    <view style="align-self: flex-start; margin-left: 20rpx; width: calc(100% - 40rpx)">
      <!-- 相关帖子 -->
      <RelatetivePost :disComid="comID" disModel="1" title="相关帖子" />
    </view>
    <!-- 抽屉 -->
    <uni-drawer ref="showLeft" mode="left" :width="320">
      <scroll-view scroll-y class="drawerBox">
        <view class="title">{{ comInfo.comTitle }}</view>
        <view class="line">报名参赛</view>
        <!-- 输入框 -->
        <uni-easyinput
          trim="all"
          v-model="teamName"
          placeholder="请输入队伍名称"
          style="margin-bottom: 20rpx"
        ></uni-easyinput>
        <view style="margin: 20rpx 0; color: #666; font-size: 24rpx"
          ><span style="color: red">*</span> 比赛限制人数:{{ minTeamNum }}-{{
            maxTeamNum
          }}，默认第一位为队长</view
        >
        <!-- 队伍 -->
        <view class="teamBox">
          <view class="teamerItem" v-for="(item, index) in chosedTeamer" :key="index">
            <image class="avatar mt-1" :src="item.userAvatarUrl"></image>
            <view class="nickname">{{ item.userNickname }}</view>
            <uni-icons
              class="clear"
              @tap="deleteTeamer(index)"
              type="clear"
              color="red"
              size="20"
            />
          </view>
          <!-- 提示添加 -->
          <view class="teamerItem" v-if="chosedTeamer.length < maxTeamNum">
            <view class="flex justify-center items-center w-14 h-14 rounded-full bg-blue-400 mt-1"
              ><uni-icons type="plusempty" size="32" color="#fff"> </uni-icons>
            </view>
            <view class="nickname">继续添加</view>
          </view>
        </view>
        <!-- 确认报名 -->
        <view class="confirm">
          <button class="btn" v-if="!isSignUp" @tap="createTeam">创建队伍</button>
        </view>
        <!-- 选择好友 -->
        <view class="line">选择好友</view>
        <!-- 好友列表 -->
        <view class="friendBox">
          <view
            class="friendItem"
            v-for="(item, index) in friendList.filter((element) => element.userID != 9999)"
            :key="index"
          >
            <image class="avatar" :src="item.userAvatarUrl"></image>
            <view class="contentBox">
              <view class="nickName">{{ item.userNickname }}</view>
              <view class="introduction">{{ item.userIntroduction }}</view>
            </view>
            <view
              class="flex justify-center items-center w-10 h-10 rounded-full bg-orange-400 btn-active"
              @tap="addToChosedTeamer(item)"
              ><uni-icons type="plusempty" size="24" color="#fff"> </uni-icons>
            </view>
          </view>
        </view>
      </scroll-view>
    </uni-drawer>
  </view>
  <template v-else>
    <skeleton></skeleton>
  </template>
  <!-- 成功提示 -->
  <uni-popup ref="successInfo" type="message">
    <uni-popup-message type="success" :message="successMsg" :duration="500"></uni-popup-message>
  </uni-popup>
  <!-- 失败提示 -->
  <uni-popup ref="errorInfo" type="message">
    <uni-popup-message type="error" :message="errorMsg" :duration="500"></uni-popup-message>
  </uni-popup>
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
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { useUserInfoStore } from '@/stores'
import skeleton from './components/skeleton.vue'
import { getTimeDifference } from '@/utils/getTimeDifference'
import RelatetivePost from './components/relatetivePost.vue'
import teamInvite from './components/teamInvite.vue'
const { userInfo } = useUserInfoStore()
const isSkeletonShow = ref(true)
let comID = ref(0)
let isSignUp = ref(false)
onLoad(async (options) => {
  comID.value = options?.comID
  // 验证用户是否已报名
  await getComTeam()
  // 获取比赛详细信息
  await getComInfoDetail()
  // 获取比赛类别
  getComType()
  // 获取比赛等级
  getComRating()
  // 获取好友列表
  getFriendList()
  // 获取订阅信息
  getSubStatu()
  isSkeletonShow.value = false
})
// 订阅id
const subID = ref(0)
//获取订阅信息
const getSubStatu = async () => {
  const res = await http({
    url: '/app/sub/getSubInfoList',
    data: {
      userId: userInfo.ID,
      comId: +comID.value,
    },
  })
  if (res.data.list.length > 0) {
    subID.value = res.data.list[0].ID
    isSubscribe.value = true
  } else isSubscribe.value = false
}
// 成功和失败ref
const successInfo = ref()
const errorInfo = ref()
const successMsg = ref('')
const errorMsg = ref('')
// 订阅状态
const isSubscribe = ref(false)
// 比赛订阅
const comSubscribe = async () => {
  try {
    const res = await http({
      url: '/app/sub/createSub',
      method: 'POST',
      data: {
        comId: +comID.value,
      },
    })
    uni.showLoading({
      title: '',
      mask: true,
    })
    setTimeout(() => {
      uni.hideLoading()
      successMsg.value = '订阅成功'
      successInfo.value.open()
      isSubscribe.value = true
    }, 500)
  } catch (error) {
    errorMsg.value = '订阅失败'
    isSubscribe.value = false
    errorInfo.value.open()
  }
}
// 取消订阅
const cancelSubscribe = async () => {
  try {
    const res = await http({
      url: '/app/sub/deleteSub?ID=' + +subID.value,
      method: 'DELETE',
    })
    uni.showLoading({
      title: '',
      mask: true,
    })
    setTimeout(() => {
      uni.hideLoading()
      successMsg.value = '取消订阅成功'
      successInfo.value.open()
      isSubscribe.value = false
    }, 500)
  } catch (error) {
    isSubscribe.value = true
    successMsg.value = '取消订阅失败'
  }
}
// 抽屉
const showLeft = ref()
// 队伍名称
const teamName = ref('')
// 已选队友列表
const chosedTeamer = ref([
  {
    userID: userInfo.ID,
    userNickname: userInfo.userNickname,
    userAvatarUrl: userInfo.userAvatarUrl,
    userIntroduction: userInfo.userIntroduction,
    userCity: userInfo.userCity,
    isOnline: userInfo.isOnline,
  },
])
// 好友列表
const friendList = ref([])
// 获取好友列表
const getFriendList = async () => {
  const res = await http({
    url: '/app/user/showUserFriend',
    data: {
      userID: userInfo.ID,
    },
  })
  for (let i = 0; i < res.data.length; i++) {
    friendList.value.push(res.data[i])
  }
}

// 最大组队人数和最小组队人数
let maxTeamNum = ref(0)
let minTeamNum = ref(0)
// 添加到组队列表
const addToChosedTeamer = (info) => {
  if (chosedTeamer.value.find((item) => item.userID === info.userID)) {
    uni.showToast({
      title: '请勿重复添加!',
      icon: 'none',
    })
    return
  }
  if (chosedTeamer.value.length < maxTeamNum.value) {
    chosedTeamer.value.push(info)
    uni.showToast({
      title: '添加成功!',
      icon: 'none',
    })
  } else {
    uni.showToast({
      title: '组队人数已满!',
      icon: 'none',
    })
  }
}
// 确认创建队伍
const createTeam = async () => {
  if (teamName.value === '') {
    uni.showToast({
      title: '请输入队伍名称!',
      icon: 'none',
    })
    return
  }
  if (chosedTeamer.value.length < minTeamNum.value) {
    uni.showToast({
      title: '组队人数不足!',
      icon: 'none',
    })
    return
  }
  const groupUsersId = '-' + chosedTeamer.value.map((item) => item.userID).join('-') + '-'
  try {
    await http({
      url: '/app/group/createGroup',
      method: 'POST',
      data: {
        groupName: teamName.value,
        groupCaptainId: +chosedTeamer.value[0].userID,
        groupUsersId,
        comId: +comID.value,
      },
    })
    teamName.value = ''
    chosedTeamer.value = []
    uni.showToast({
      title: '创建成功!',
      icon: 'none',
      duration: 500,
    })
    showLeft.value.close()
    isSignUp.value = true
    setTimeout(() => {
      uni.reLaunch({
        url: '/subpackage/comDetail/index?comID=' + comID.value,
      })
    }, 500)
  } catch (error) {
    uni.showToast({
      title: '创建失败，请重试!',
      icon: 'none',
    })
  }
}
// 删除队员
const deleteTeamer = (index: number) => {
  chosedTeamer.value.splice(index, 1)
}

let comInfo = ref(null)
let timeRest = ref(0)
let countDownText = ref('')
// 获取比赛详细信息
const getComInfoDetail = async () => {
  const res = await http({
    url: '/app/com/getComInfoByid?ID=' + comID.value,
  })
  comInfo.value = res.data.recomData
  maxTeamNum.value = comInfo.value.comMaxNumber
  minTeamNum.value = comInfo.value.comMinNumber
  getCountDown()
}
// 倒计时所需时间
let countDownDay = ref(0)
let countDownHour = ref(0)
let countDownMinute = ref(0)
// 获取倒计时
const getCountDown = () => {
  let differenceTime = getTimeDifference(new Date().getTime(), comInfo.value.comStart)
  // 现在已经超过了比赛开始时间
  if (differenceTime <= 0) {
    // 比赛过程中或者比赛已经结束了
    differenceTime = getTimeDifference(new Date().getTime(), comInfo.value.comEnd)
    if (differenceTime <= 0) {
      // 比赛已经结束
      countDownText.value = '比赛已结束!'
      timeRest.value = -1
    } else {
      countDownText.value = '距离比赛结束还有：'
      timeRest.value = differenceTime
      // 计算天数
      countDownDay.value = Math.floor(differenceTime / (1000 * 3600 * 24))
      // 计算小时数
      countDownHour.value = Math.floor((differenceTime % (1000 * 3600 * 24)) / (1000 * 3600))
      // 计算分钟数
      countDownMinute.value = Math.floor((differenceTime % (1000 * 3600)) / (1000 * 60))
    }
  } else {
    // 比赛还未开始
    countDownText.value = '距离比赛开始还有：'
    timeRest.value = differenceTime
    // 计算天数
    countDownDay.value = Math.floor(differenceTime / (1000 * 3600 * 24))
    // 计算小时数
    countDownHour.value = Math.floor((differenceTime % (1000 * 3600 * 24)) / (1000 * 3600))
    // 计算分钟数
    countDownMinute.value = Math.floor((differenceTime % (1000 * 3600)) / (1000 * 60))
  }
}
// 队伍ID
const teamID = ref(0)
// 弹窗ref
const alertDialog = ref()
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
      if (res.code === '0') {
        isSignUp.value = false
        successInfo.value.open()
      } else {
        errorInfo.value.open()
      }
    } catch (error) {
      errorInfo.value.open()
    }
  }
}
// 队伍信息
let teamInfo = ref({})
// 获取比赛参加队伍信息
const getComTeam = async () => {
  const res = await http({
    url: '/app/group/getGroupInfoList',
    data: {
      groupUsersId: userInfo.ID,
      comId: comID.value,
    },
  })
  if (res.data.list.length > 0) {
    isSignUp.value = true
  } else {
    isSignUp.value = false
    return
  }
  // 保存数据
  teamInfo.value = res.data.list[0]
  // 处理数据
  let arr = teamInfo.value.groupUsersId.split('-')
  arr.pop()
  arr.shift()
  teamInfo.value.userInfoList = []
  for (let i = 0; i < arr.length; i++) {
    teamInfo.value.userInfoList.push(await getTeamerInfo(arr[i]))
  }
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

let comTypeList = ref([])
let comType = ref('')
// 获取比赛种类
const getComType = async () => {
  comTypeList.value = []
  const res = await http({
    url: '/app/manager/getSysDictionaryDetailListPublic',
    data: {
      sysDictionaryID: 9,
    },
  })
  for (let i = 0; i < res.data.length; i++) {
    comTypeList.value.push(res.data[i])
  }
  comType.value = comTypeList.value[comInfo.value.comType].label
}

// 当前分类所有比赛
let comRatingList = ref([])
// 当前的比赛等级
let comRating = ref(0)
// 获取比赛等级列表
const getComRating = async () => {
  const res = await http({
    url: '/app/manager/getSysDictionaryDetailListPublic',
    data: {
      sysDictionaryID: 8,
    },
  })
  for (let i = 0; i < res.data.length; i++) {
    comRatingList.value.push(res.data[i])
  }
  comRating.value = comRatingList.value[comInfo.value.comModel].label
}

const toTeam = () => {
  uni.navigateTo({
    url: '/subpackage/myTeam/index',
  })
}
// 报名
const signUp = async () => {
  showLeft.value.open()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 10rpx 20rpx;
  .subscribe {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 410rpx;
    height: 70rpx;
    background-color: #2979ff;
    color: #fff;
    margin-top: 10rpx;
    margin-bottom: 50rpx;
    border: 1rpx solid #136fd1;
  }
  .subscribed {
    color: #a5d1ff;
    background-color: #ecf5ff;
    border: 1rpx solid #a5d1ff;
    &:active {
      background-color: #0553a7;
      transform: scale(1);
    }
  }
  .comImg {
    height: 320rpx;
    border-radius: 20rpx;
    box-shadow: 10rpx 10rpx 10rpx #eeeff3;
  }
  .countDown {
    .countDownTitle {
      display: flex;
      height: 100rpx;
      align-items: center;
      font-size: 26rpx;
      font-weight: 700;
      .comEnd {
        color: rgb(193, 0, 0);
      }
    }
  }
  .detailBox {
    align-self: flex-start;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    .comName {
      font-size: 26rpx;
      font-weight: 700;
      margin-left: 20rpx;
      color: #666;
      font-weight: 400;
      letter-spacing: 6rpx;
    }
    .detail {
      font-size: 26rpx;
      color: #444;
    }
  }
  .shortInfoBox {
    box-sizing: border-box;
    align-self: flex-start;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    text-align: justify;
    padding-right: 50rpx;
    .comSubTitle {
      font-size: 28rpx;
      margin-left: 20rpx;
      font-size: 26rpx;
      color: #444;
    }
  }
  .grade {
    align-self: flex-start;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    .postBox {
      .item {
        position: relative;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 0 10rpx;
        height: 180rpx;
        border-radius: 20rpx;
        background-color: #f1f1f1;
        margin-bottom: 20rpx;
        padding: 20rpx;
        overflow: hidden;
        .img {
          height: 150rpx;
          width: 160rpx;
          border-radius: 10rpx;
        }
        .content {
          height: 180rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0 20rpx;
          .titleBox {
            width: 55vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 28rpx;
            }
            .subTitle {
              color: #aaa;
              font-size: 24rpx;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        .extraBox {
          display: flex;
          width: 100%;
          font-size: 22rpx;
          .Tag {
            display: inline;
            background-color: rgb(255, 238, 241);
            padding: 4rpx 8rpx;
            border-radius: 2rpx;
            color: rgb(203, 7, 7);
          }
          // .date {
          //   padding: 4rpx 8rpx;
          //   color: #aaa;
          // }
          .readedNum {
            padding: 4rpx 8rpx;
            color: #aaa;
          }
          .liked {
            padding: 4rpx 8rpx;
            color: #aaa;
          }
          .followed {
            padding: 4rpx 8rpx;
            color: #aaa;
          }
        }
        .postStatus {
          position: absolute;
          transform: translateX(20px) translateY(16px) rotate(45deg);
          top: 0;
          right: 0;
          font-size: 26rpx;
        }
        .checked {
          padding: 4rpx 50rpx;
          background-color: rgb(251, 251, 126);
          color: rgb(23, 171, 230);
        }
        .error {
          padding: 4rpx 50rpx;
          background-color: rgb(247, 219, 223);
          color: rgb(212, 9, 9);
        }
        .success {
          padding: 4rpx 50rpx;
          background-color: rgb(220, 246, 247);
          color: rgb(29, 148, 35);
        }
      }
    }
  }
  .enter {
    align-self: flex-start;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    width: calc(100% - 40rpx);
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 410rpx;
      height: 80rpx;
      background-color: #2979ff;
      color: #fff;
      margin-top: 50rpx;
      margin-bottom: 50rpx;

      &:active {
        background-color: #0553a7;
        transform: scale(0.99);
      }
    }
    .teamInfo {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin: 30rpx 0;
      padding: 10rpx 0;
      border-radius: 20rpx;
      background-color: #efefef;
      .teamName {
        padding: 0 30rpx;
        font-weight: 700;
        color: #2979ff;
      }
      .teamers {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30rpx;
        justify-content: space-evenly;
        height: 140rpx;
        flex: 1;
        .teamItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 30rpx;
          .avatar {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
            background-color: skyblue;
          }
          .nickname {
            margin-top: 6rpx;
            font-size: 24rpx;
          }
        }
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70rpx;
          width: 180rpx;
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
      .status {
        position: absolute;
        top: 0;
        right: 0;
        align-self: flex-start;
        padding: 20rpx 20rpx;
        background-color: rgb(244, 244, 127);
        font-size: 24rpx;
        font-weight: 700;
        border-radius: 10rpx;
        margin: 10rpx;
      }
    }
  }
}
.line {
  padding-left: 20rpx;
  border-left: #2979ff 6rpx solid;
  margin-bottom: 20rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}
.drawerBox {
  height: 100vh;
  box-sizing: border-box;
  padding: 20rpx 20rpx;
  overflow: scroll;
  .title {
    text-align: center;
    font-size: 38rpx;
    font-weight: 700;
    margin-bottom: 20rpx;
  }
  .teamBox {
    display: flex;
    justify-content: space-around;
    margin: 30rpx 10rpx;
    .teamerItem {
      position: relative;
      margin: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: skyblue;
    }
    .nickname {
      font-size: 28rpx;
      color: #aaa;
    }
    .clear {
      position: absolute;
      top: -8rpx;
      right: -8rpx;
    }
  }
  .friendBox {
    display: flex;
    flex-direction: column;
    padding-bottom: 50rpx;
    .friendItem {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 140rpx;
      border-bottom: 2rpx solid #eee;
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        background-color: skyblue;
      }
      .contentBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 110rpx;
        margin: 0 20rpx;
        .nickname {
          font-size: 28rpx;
        }
        .introduction {
          width: 320rpx;
          font-size: 22rpx;
          color: #aaa;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .add {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background-color: orange;
      }
    }
  }
  .confirm {
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 410rpx;
      height: 80rpx;
      background-color: #2979ff;
      color: #fff;
      margin-top: 50rpx;
      margin-bottom: 50rpx;
      font-size: 28rpx;
      &:active {
        background-color: #0553a7;
        transform: scale(0.99);
      }
    }
  }
  .line {
    display: block;
    padding-left: 20rpx;
    border-left: #2979ff 6rpx solid;
    margin-top: 40rpx;
    font-weight: 700;
    margin-bottom: 40rpx;
  }
}
.btn-active:active {
  background-color: #696767;
}
</style>

<template>
  <view class="container" v-if="comInfo">
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
          :day="timeRest"
          :hour="0"
          :minute="0"
          background-color="#007AFF"
        />
        <view v-else-if="timeRest < 0" class="comEnd"> {{ countDownText }} </view>
      </view>
    </view>
    <!-- 比赛信息 -->
    <view class="detailBox">
      <view class="line">比赛信息</view>
      <p>
        <span class="comName">赛事名称：</span>
        <span class="detail">{{ comInfo.comTitle }}</span>
      </p>
      <p>
        <span class="comName">赛事时间：</span>
        <span class="detail"
          >{{ toLocalTime(comInfo.comStart).split(' ')[0] }} -
          {{ toLocalTime(comInfo.comEnd).split(' ')[0] }}</span
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
      <p class="comSubTitle">{{ comInfo.comSubTitle }}</p>
    </view>
    <!-- 比赛详细介绍 -->
    <view class="shortInfoBox">
      <view class="line">详细介绍</view>
      <p class="comSubTitle">{{ comInfo.comIntroduction }}</p>
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
      <button class="btn" v-if="!isSignUp" @tap="signUp">立即报名</button>
      <view class="teamInfo" v-if="isSignUp">
        <view class="teamName">{{ teamInfo.groupName }}</view>
        <view class="teamers">
          <view class="teamItem" v-for="(item, index) in teamInfo.userInfoList" :key="index">
            <image class="avatar" :src="item.userAvatarUrl"></image>
            <view class="nickname" v-if="index === 0" style="color: orange">{{
              item.userNickname
            }}</view>
            <view class="nickname" v-else>{{ item.userNickname }}</view>
          </view>
        </view>
        <view class="status" v-if="teamInfo.groupStatus === 2">待审核</view>
        <view
          class="status"
          style="background-color: lightseagreen; color: #fff"
          v-else-if="teamInfo.groupStatus === 3"
          >报名成功</view
        >
        <view class="status" v-else style="background-color: lightcyan; color: red">报名失败</view>
      </view>
    </view>
    <!-- 相关帖子 -->
    <view class="grade">
      <view class="line">相关帖子</view>
      <view class="postBox" v-if="postList.length > 0">
        <view class="item" v-for="item in postList" :key="item.ID" @tap="navigateTo(item.ID)">
          <image class="img" :src="item.disPicture ? item.disPicture[0] : ''" mode="scaleToFill" />
          <view class="content">
            <span class="titleBox">
              <h1 class="title">{{ item.disTitle }}</h1>
              <p class="subTitle">{{ item.disContent }}</p>
            </span>
            <span class="extraBox">
              <span class="Tag">原创</span>
              <!-- <span class="date">{{ toLocalTime(item.CreatedAt).split(' ')[0] }}</span> -->
              <span class="readedNum">{{ item.disHot }}阅读</span>
              <span class="liked">{{ item.disLoveNumber }}点赞</span>
              <span class="followed">{{ item.disCollectNumber }}收藏</span>
            </span>
          </view>
          <view class="postStatus">
            <span class="statusTag error">热门</span>
          </view>
        </view>
      </view>
      <view v-else>
        <image src="../../static/empty/emptyPost.png" mode="scaleToFill" />
      </view>
    </view>
    <!-- 抽屉 -->
    <uni-drawer ref="showLeft" mode="left" :width="320">
      <view class="drawerBox">
        <view class="title">{{ comInfo.comTitle }}</view>
        <view class="line">报名参赛</view>
        <!-- 输入框 -->
        <uni-easyinput
          trim="all"
          v-model="teamName"
          placeholder="请输入队伍名称"
          style="margin-bottom: 20rpx"
        ></uni-easyinput>
        <view style="margin: 20rpx 0; color: #666; font-size: 26rpx"
          ><span style="color: red">*</span> 比赛限制人数:{{ minTeamNum }}-{{
            maxTeamNum
          }}，默认第一位为队长</view
        >
        <!-- 队伍 -->
        <view class="teamBox">
          <view class="teamerItem" v-for="(item, index) in chosedTeamer" :key="index">
            <image class="avatar" :src="item.userAvatarUrl"></image>
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
            <image class="avatar" src="../../static/myExperience/add.png"></image>
            <view class="nickname">继续添加</view>
          </view>
        </view>
        <!-- 确认报名 -->
        <view class="confirm">
          <button class="btn" v-if="!isSignUp" @tap="createTeam">创建队伍并报名</button>
        </view>
        <!-- 选择好友 -->
        <view class="line">选择好友</view>
        <!-- 好友列表 -->
        <view class="friendBox">
          <view class="friendItem" v-for="(item, index) in friendList" :key="index">
            <image class="avatar" :src="item.userAvatarUrl"></image>
            <view class="contentBox">
              <view class="nickName">{{ item.userNickname }}</view>
              <view class="introduction">{{ item.userIntroduction }}</view>
            </view>
            <image
              class="add"
              src="../../static/myExperience/add.png"
              @tap="addToChosedTeamer(item)"
            ></image>
          </view>
        </view>
      </view>
    </uni-drawer>
  </view>
  <skeleton v-else></skeleton>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { getTimeDifference } from '@/utils/getTimeDifference'
import { useUserInfoStore } from '@/stores'
import skeleton from './components/skeleton.vue'
const { userInfo } = useUserInfoStore()
let comID = ref(0)
let isSignUp = ref(false)
onLoad(async (options) => {
  comID.value = options?.comID
  // 验证用户是否已报名
  await getComTeam()
  // 获取比赛详细信息
  await getComInfoDetail()
  // 获取比赛类别
  await getComType()
  // 获取比赛等级
  await getComRating()
  // 获取相关帖子信息
  await getPostList()
  // 获取好友列表
  await getFriendList()
})
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
  console.log(res.data, '好友列表')
}
// 获取帖子列表
const getPostList = async () => {
  const res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      disComId: comID.value,
      disStatus: 2,
    },
  })
  res.data.list.forEach((element) => {
    postList.value.push(element)
  })
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
  if (chosedTeamer.value.length <= maxTeamNum.value) {
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
// 帖子列表
const postList = ref([])
// 跳转到相应页面
const navigateTo = (disId: number) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${disId}`,
  })
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
    }
  } else {
    // 比赛还未开始
    countDownText.value = '距离比赛开始还有：'
    timeRest.value = differenceTime
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
  console.log(teamInfo.value, '处理完的队伍信息')
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
    url: 'http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic',
    data: {
      page: 1,
      pageSize: 100,
      sysDictionaryID: 9,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    comTypeList.value.push(res.data.list[i])
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
    url: 'http://jk.singleeeee.top/api/manager/getSysDictionaryDetailListPublic',
    data: {
      page: 1,
      pageSize: 100,
      sysDictionaryID: 8,
    },
  })
  for (let i = 0; i < res.data.list.length; i++) {
    comRatingList.value.push(res.data.list[i])
  }
  comRating.value = comRatingList.value[comInfo.value.comModel].label
}

// 报名
const signUp = async () => {
  showLeft.value.open()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 20rpx;
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
    align-self: flex-start;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
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
    align-items: center;
    margin-left: 20rpx;
    width: 100%;
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
      align-items: center;
      justify-content: space-between;
      margin: 30rpx 0;
      height: 220rpx;
      border-radius: 20rpx;
      background-color: #efefef;
      .teamName {
        padding: 0 30rpx;
        font-weight: 700;
        color: #2979ff;
      }
      .teamers {
        display: flex;
        justify-content: space-evenly;
        height: 140rpx;
        flex: 1;
        .teamItem {
          display: flex;
          flex-direction: column;
          align-items: center;
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
      }
      .status {
        align-self: flex-start;
        padding: 10rpx 20rpx;
        background-color: rgb(244, 244, 127);
        font-size: 20rpx;
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
  padding: 20rpx 10rpx;
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
    .friendItem {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 120rpx;
      margin: 10rpx 0;
      border-bottom: 2rpx solid #eee;
      .avatar {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
        background-color: skyblue;
      }
      .contentBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 110rpx;
        margin: 0 10rpx;
        .nickname {
          font-size: 26rpx;
        }
        .introduction {
          font-size: 24rpx;
          color: #aaa;
        }
      }
      .add {
        width: 80rpx;
        height: 80rpx;
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
    padding-left: 20rpx;
    border-left: #2979ff 6rpx solid;
    margin-top: 40rpx;
    font-weight: 700;
    margin-bottom: 40rpx;
  }
}
</style>

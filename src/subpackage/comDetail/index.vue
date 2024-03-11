<template>
  <view class="container">
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
      <button class="btn">立即报名</button>
    </view>
    <!-- 相关帖子 -->
    <view class="grade">
      <view class="line">相关帖子</view>
      <view class="postBox" v-if="postList.length > 0">
        <view class="item" v-for="item in postList" :key="item.ID" @tap="navigateTo(item.ID)">
          <image class="img" :src="item.disPicture[0]" mode="scaleToFill" />
          <view class="content">
            <span class="titleBox">
              <h1 class="title">{{ item.disTitle }}</h1>
              <p class="subTitle">{{ item.disContent }}</p>
            </span>
            <span class="extraBox">
              <span class="Tag">原创</span>
              <span class="date">{{ toLocalTime(item.CreatedAt).split(' ')[0] }}</span>
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
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { http } from '@/utils/http'
import { toLocalTime } from '@/utils/toLocalTime'
import { getTimeDifference } from '@/utils/getTimeDifference'
let comID = ref(0)
onLoad(async (options) => {
  comID.value = options?.comID
  await getComInfoDetail()
  await getComType()
  await getComRating()
  await getPostList()
})

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
// 帖子列表
const postList = ref([])
// 跳转到相应页面
const navigateTo = (disId: number) => {
  uni.navigateTo({
    url: `/subpackage/postDetail/index?disId=${disId}`,
  })
}

let comInfo = ref({})
let timeRest = ref(0)
let countDownText = ref('')
// 获取比赛详细信息
const getComInfoDetail = async () => {
  const res = await http({
    url: '/app/com/getComInfoByid?ID=' + comID.value,
  })
  comInfo.value = res.data.recomData
  let differenceTime = getTimeDifference(new Date().getTime(), comInfo.value.comStart)
  // 现在已经超过了比赛开始时间
  if (differenceTime <= 0) {
    // 比赛过程中或者比赛已经结束了
    differenceTime = getTimeDifference(new Date().getTime(), comInfo.value.comEnd)
    if (timeRest.value <= 0) {
      // 比赛已经结束
      countDownText.value = '比赛已结束!'
      timeRest.value = -1
    } else {
      countDownText.value = '距离比赛结束还有:'
      timeRest.value = differenceTime
    }
  } else {
    // 比赛还未开始
    countDownText.value = '距离比赛开始还有：'
    timeRest.value = differenceTime
  }
  console.log(timeRest.value, countDownText.value)
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
          .date {
            padding: 4rpx 8rpx;
            color: #aaa;
          }
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
  }
}
.line {
  padding-left: 20rpx;
  border-left: #2979ff 6rpx solid;
  margin-bottom: 10rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}
</style>

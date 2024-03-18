<template>
  <view class="container" v-if="userInfo">
    <view class="header">
      <image class="bg" src="https://s11.ax1x.com/2024/01/24/pFeshjA.jpg" />
    </view>
    <view class="body">
      <view class="avatarBox">
        <image
          class="avatar"
          @tap="onClickImg(userInfo.userAvatarUrl)"
          :src="userInfo.userAvatarUrl"
          mode="scaleToFill"
        />
        <view class="function">
          <view v-if="isSelf" class="edit" @tap="navigateToEdit">编辑资料</view>
          <view v-else style="display: flex">
            <view v-if="userInfo.isYourFollower" class="edit" @tap="cancelFollow">取消关注</view>
            <view v-else class="edit" @tap="follow">关注</view>
            <view class="edit" @tap="navigateToChat">私信</view>
          </view>
        </view>
      </view>
      <view class="infoBox">
        <view class="nickname"
          >{{ userInfo.userNickname }}
          <image
            v-if="userInfo.userGender === 1"
            class="gender"
            src="/static/personPage/man.png"
            mode="scaleToFill"
          />
          <image v-else class="gender" src="/static/personPage/woman.png" mode="scaleToFill" />
        </view>
        <view class="itemsBox">
          <view class="item">
            <view class="num">{{ shortenNum(userInfo.loveNumber) }}</view>
            <view class="text">获赞与收藏</view>
          </view>
          <view class="item">
            <view class="num">{{ shortenNum(userInfo.followerNumber) }}</view>
            <view class="text">关注</view>
          </view>
          <view class="item">
            <view class="num">{{ shortenNum(userInfo.fansNumber) }}</view>
            <view class="text">粉丝</view>
          </view>
        </view>
        <view class="information ellipsis">{{ userInfo.userIntroduction }}</view>
        <view class="tag">
          <view v-if="tagList.length > 0">
            <uni-tag
              v-for="(item, index) in tagList"
              :key="index"
              class="label"
              :text="item"
              :circle="true"
              type="primary"
              size="small"
            />
          </view>
          <view v-else>
            <uni-tag
              class="label"
              text="暂无标签"
              :circle="true"
              type="primary"
              size="small"
            ></uni-tag>
          </view>
        </view>
      </view>
      <view class="trends">
        <view class="topTap">
          <view :class="{ item: true, active: 0 === activeBar }" data-id="0" @tap="changeBar"
            >动态</view
          >
          <view :class="{ item: true, active: 1 === activeBar }" data-id="1" @tap="changeBar"
            >收藏</view
          >
          <view :class="{ item: true, active: 2 === activeBar }" data-id="2" @tap="changeBar"
            >帖子</view
          >
          <view :class="{ item: true, active: 3 === activeBar }" data-id="3" @tap="changeBar"
            >经历</view
          >
        </view>
      </view>
    </view>
    <swiper class="swiper" @change="swiperChange" :current="currentPage">
      <!-- 动态 -->
      <swiper-item class="Activity">
        <view class="item" v-for="(item, index) in activityList" :key="index">
          <!-- 发布帖子 -->
          <template v-if="item.pageType === 1">
            <view style="display: flex; flex-direction: column">
              <view>
                <NameTitle
                  :avatarUrl="item.data.userInfo.userAvatarUrl"
                  :author="item.data.userInfo.userNickname"
                  :date="toLocalTime(item.data.CreatedAt)"
                  rightText="发布了帖子"
                  :extra="' · ' + item.data.userInfo.userCity.split('/')[0]"
                  :border="true"
                />
              </view>
              <view class="contentBox">
                <image
                  class="img"
                  :src="item.data.disPicture.length > 0 ? item.data.disPicture[0] : ''"
                  mode="scaleToFill"
                />
                <view class="content">
                  <span class="titleBox">
                    <h1 class="title">{{ item.data.disTitle }}</h1>
                    <p class="subTitle">{{ item.data.disContent }}</p>
                  </span>
                  <span class="extraBox">
                    <span class="Tag">原创</span>
                    <span class="date">{{ toLocalTime(item.data.CreatedAt).split(' ')[0] }}</span>
                    <span class="readedNum">{{ item.data.disHot }}阅读</span>
                    <span class="liked">{{ item.data.disLoveNumber }}点赞</span>
                  </span>
                </view>
              </view>
            </view>
          </template>
          <!-- 组队信息 -->
          <template v-else-if="item.pageType === 3">
            <view class="teamBox">
              <image class="avatar" :src="userInfo.userAvatarUrl"></image>
              <view class="content">
                <view class="text"
                  >组建了队伍<span style="color: orange; margin-left: 10rpx"
                    >重生之带学妹拿奖</span
                  ></view
                >
                <view style="font-size: 24rpx">{{ toLocalTime(item.data.CreatedAt) }}</view>
              </view>
            </view>
          </template>
          <!-- 评论 -->
          <template v-else-if="item.pageType === 2">
            <view class="commentActivity">
              <NameTitle
                :avatarUrl="item.data.userInfo.userAvatarUrl"
                :author="item.data.userInfo.userNickname"
                :date="toLocalTime(item.data.CreatedAt)"
                :extra="' · ' + item.data.userInfo.userCity.split('/')[0]"
                :border="true"
              />
              <view style="font-size: 28rpx; padding: 10rpx 20rpx">发表了评论</view>
              <view class="comment">
                {{ item.data.userInfo.userNickname }} : {{ item.data.commentText }}
              </view>
            </view>
          </template>
        </view>
      </swiper-item>
      <!-- 收藏 -->
      <swiper-item class="container">
        <view v-for="(item, index) in collectionList" :key="index">
          <view class="item" @tap="switchToPostDetail(item.disId)">
            <view class="title">{{ item.disTitle }}</view>
            <view class="author-type">
              <view class="author">{{ item.disUserName }} | {{ item.disTopic }}</view>
            </view>
          </view>
        </view>
        <view class="text">没有更多内容了</view>
      </swiper-item>
      <!-- 发表过的帖子 -->
      <swiper-item class="postList">
        <view
          class="item"
          v-for="item in postList"
          :key="item.ID"
          @tap="switchToPostDetail(item.ID)"
        >
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
        </view>
      </swiper-item>
      <!-- 个人经历 -->
      <swiper-item class="steps">
        <view style="background-color: #fff; width: 90vw; padding: 4vh 5vw">
          <uni-steps
            :options="expList"
            active-color="#007AFF"
            :active="active"
            active-icon="medal"
            direction="column"
          />
        </view>
      </swiper-item>
    </swiper>
  </view>
  <view v-else> <skeleton></skeleton> </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { http } from '@/utils/http'
import { shortenNum } from '@/utils/shortenNum'
import { myDebounce } from '@/utils/myDebounce'
import { toLocalTime } from '@/utils/toLocalTime'
import skeleton from '../components/skeleton.vue'
import type { CollectList } from '@/types/global'
import { useUserInfoStore } from '@/stores'
import NameTitle from '@/components/nameTitle.vue'
const UserInfoStore = useUserInfoStore()
// 是否用户本人
const isSelf = ref(false)
// 用户信息
const userInfo = ref()
// 页面的ID
const userID = ref()
onLoad(async (options) => {
  userID.value = options?.userID
  // 获取用户信息
  await getCollectList()
  await gerUserinfo(options?.userID)
  // 获取帖子列表
  await getPostList()
  // 获取用户经历
  await getUserExperience()
  // 获取用户动态
  await getUserTrend()
  // 转换标签
  stringToTag()
  // 判断是否用户本人
  if (+options?.userID === JSON.parse(uni.getStorageSync('UserInfo')).userInfo.ID) {
    isSelf.value = true
  }
})

// 用户数组
const activityList = ref([])
// 获取用户动态
const getUserTrend = async () => {
  const res = await http({
    url: '/app/user/showUserHomePage',
    data: {
      userID: userInfo.value.ID,
    },
  })
  activityList.value = res.data.Activity
  console.log(res.data.Activity, '用户动态')
}
// 点击图片预览
const onClickImg = (tempFilePaths: string) => {
  let fileUrlArray = [tempFilePaths]
  uni.previewImage({
    urls: fileUrlArray,
    success: (result) => {},
    fail: (error) => {
      console.log(error)
    },
  })
}

// 获取用户经历
const getUserExperience = async () => {
  const res = await http({
    url: '/app/user/showUserHistory',
    data: {
      userID: UserInfoStore.userInfo.ID,
    },
  })
  let arr: any = res.data.list.reverse().forEach((item) => {
    const obj = {
      ID: item.ID,
      desc: item.time,
      title: item.desc,
    }
    expList.value.push(obj)
  })
}

const collectionList = ref<CollectList>([])
// 获取收藏列表
const getCollectList = async () => {
  const res = await http<CollectList[]>({
    url: '/app/dis/userShowCollectDis',
    data: {
      userid: userID.value,
    },
  })
  collectionList.value = res.data.disList
}
// 跳转到帖子详情页
const switchToPostDetail = (disId: number) => {
  if (disId) {
    console.log('disId', disId)
    uni.navigateTo({
      url: `/subpackage/postDetail/index?disId=${disId}`,
    })
  } else {
    uni.showToast({
      url: '帖子不存在!',
      icon: 'none',
    })
  }
}

// 帖子列表
const postList = ref([])
// 获取帖子列表
const getPostList = async () => {
  const res = await http({
    url: '/app/dis/getDisInfoList',
    data: {
      disStatus: 2,
      disUserId: userInfo.value.ID,
    },
  })
  res.data.list.forEach((element) => {
    postList.value.push(element)
  })
}

// 私聊
const navigateToChat = () => {
  uni.navigateTo({
    url: `/pages/community/chatRoom/index?targetID=${userID.value}`,
  })
}
// 关注
const follow = myDebounce(async () => {
  const res = await http({
    url: '/app/user/followUser',
    data: {
      followUserId: userInfo.value.ID,
    },
  })
  uni.showToast({
    title: '关注成功',
    icon: 'none',
    mask: true,
    duration: 500,
  })
  console.log('关注')
  userInfo.value.fansNumber += 1
  userInfo.value.isYourFollower = true
}, 200)
// 取消关注
const cancelFollow = myDebounce(async () => {
  const res = await http({
    url: `/app/user/unFollowUser?unFollowUserId=${userInfo.value.ID}`,
    method: 'DELETE',
  })
  console.log('取消关注')
  userInfo.value.fansNumber -= 1
  userInfo.value.isYourFollower = false
}, 200)
// 获取用户信息
const gerUserinfo = async (ID) => {
  const res = await http({
    url: '/app/user/getUserInfoByid',
    data: {
      ID,
    },
  })
  userInfo.value = res.data.reuserData
}

// 跳转到个人资料修改
const navigateToEdit = () => {
  uni.navigateTo({
    url: '/subpackage/personal_data/index',
  })
}

// tab栏切换
const changeBar = (e: any) => {
  activeBar.value = +e.currentTarget.dataset.id
  currentPage.value = +e.currentTarget.dataset.id
}

//swiper切换事件
const swiperChange = (e: any) => {
  activeBar.value = e.detail.current
}
const currentPage = ref(0)

const activeBar = ref(0)

// tag数组
let tagList = ref<string[]>([])

const stringToTag = () => {
  if (userInfo.value.userLabel.includes('-')) {
    tagList.value = userInfo.value.userLabel.split('-')
  } else if (userInfo.value.userLabel !== '') tagList.value.push(userInfo.value.userLabel)
}

// 经历数组
let expList = ref([])
// 当前经历步骤
let active = ref(expList.value.length - 1)
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  height: 100vh;
  background-color: #eee;
  overflow: scroll;
}
.container .header {
  height: 20vh;
}
.container .header .bg {
  width: 100%;
}
.container .body {
  position: relative;
  display: flex;
  flex-direction: column;
  top: -40rpx;
  z-index: 999;
  height: 38vh;
  border-radius: 30rpx 30rpx 0 0;
  padding: 20rpx 20rpx 0 20rpx;
  background-color: #ffffff;
}
.container .body .avatarBox {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.container .body .avatarBox .avatar {
  position: absolute;
  top: -100rpx;
  left: 10rpx;
  width: 140rpx;
  height: 140rpx;
  background-color: orange;
  border-radius: 50%;
}
.container .body .avatarBox .function {
  position: absolute;
  right: 40rpx;
  width: 70vw;
  display: flex;
  justify-content: flex-end;
}
.container .body .avatarBox .edit {
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  font-size: 24rpx;
  border: 1rpx solid #999;
  font-weight: 700;
  background-color: #fff;
  margin-right: 20rpx;
}
.container .body .infoBox {
  flex: 5;
  box-sizing: border-box;
  padding: 10rpx 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.container .body .infoBox .nickname {
  font-size: 36rpx;
  font-weight: 700;
}
.container .body .infoBox .itemsBox {
  display: flex;
  margin: 10rpx 0;
}
.container .body .infoBox .itemsBox .item {
  margin-right: 80rpx;
}
.container .body .infoBox .itemsBox .item .num {
  text-align: center;
  font-size: 40rpx;
  font-weight: 700;
}
.container .body .infoBox .itemsBox .item .text {
  color: #ccc;
  font-size: 24rpx;
}
.container .body .infoBox .information {
  max-height: 100rpx;
  padding: 8rpx 0;
  color: #888;
  font-size: 28rpx;
}
.container .body .infoBox .tag .label {
  padding-right: 20rpx;
  font-size: 24rpx;
}
.container .body .trends {
  flex: 1;
  display: flex;
  align-items: center;
}
.container .body .trends .topTap {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10rpx 0;
}
.container .body .trends .topTap .item {
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  color: #ccc;
}
.container .body .trends .topTap .active {
  color: #000;
  border-bottom: 4rpx solid #000;
}
.container .swiper {
  height: 42vh;
  margin-top: -38rpx;
  overflow-y: scroll;
  .container {
    width: 100%;
    .item {
      height: 130rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20rpx;
      margin: 20rpx 20rpx;
      border-radius: 20rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
      .title {
        font-size: 28rpx;
      }
      .author-type {
        display: flex;
        font-size: 22rpx;
        color: #aaa;
      }
    }
    .text {
      font-size: 28rpx;
      color: #000;
      text-align: center;
    }
  }
  .postList,
  .Activity {
    overflow-y: scroll;
    .item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin: 0 20rpx;
      background-color: #fff;
      margin-top: 10rpx;
      margin-bottom: 40rpx;
      border-radius: 10rpx;
      overflow: hidden;
      padding: 0 10rpx;
      .teamBox {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        height: 160rpx;
        .avatar {
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
          background-color: skyblue;
        }
        .content {
          height: 100rpx;
          .text {
            font-size: 28rpx;
            color: #aaa;
          }
        }
      }
      .commentActivity {
        width: 100%;
        .comment {
          background-color: #eee;
          padding: 10rpx 20rpx;
          margin: 20rpx 30rpx;
          color: #aaa;
          border-radius: 10rpx;
          font-size: 26rpx;
        }
      }
      .contentBox {
        height: 180rpx;
        display: flex;
        justify-content: space-around;
        background-color: #eee;
        width: 100%;
        margin: 30rpx 20rpx;
        padding: 10rpx;
        align-items: center;
      }
      .img {
        height: 150rpx;
        width: 150rpx;
        background-color: skyblue;
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
          background-color: rgb(252, 235, 238);
          padding: 4rpx 8rpx;
          border-radius: 2rpx;
          color: rgb(202, 7, 7);
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
        .commentNum {
          padding: 4rpx 8rpx;
          color: #aaa;
        }
      }
    }
  }
  .steps {
    background-color: #fff;
    overflow-y: scroll;
  }
}
.container .gender {
  margin-top: 10rpx;
  width: 30rpx;
  height: 30rpx;
}
.ellipsis {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>

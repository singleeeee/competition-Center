<template>
  <view class="container">
    <view class="UserList">
      <view class="title">
        <view>我的关注({{ userList.length }}人)</view>
        <view class="sort">排序</view>
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in userList" :key="index">
          <view class="friendBox">
            <view>
              <image class="avatar" @tap="toPersonPage(item.userID)" :src="item.userAvatarUrl" mode="scaleToFill" />
            </view>
            <view class="ContentBox" @tap="toPersonPage(item.userID)">
              <view class="nickname">{{ item.userNickname }}</view>
              <view class="introduction">{{ item.userIntroduction }}</view>
            </view>
            <view class="chat">
              <span v-if="item.isisOnline" class="online" style="color: green">在线</span>
              <span v-else class="online">离线</span>
              <button plain v-if="item.followed" @tap="cancelFollow(item.userID, index)">
                取消关注
              </button>
              <button plain v-else @tap="Follow(item.userID, index)" style="width: 120rpx">
                关注
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getUserFollowers, followUser, unfollowUser } from '@/api/user/follow'
import { onLoad } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'

onLoad(() => {
  getUserList()
})
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

const userList = ref([])

// 点击头像
const toPersonPage = (userID: number) => {
  uni.navigateTo({ url: `/pages/mine/personPage/index?userID=${userID}` })
}
// 关注
const Follow = async (userID: number, index: number) => {
  const res = await followUser(userID)
  if (res.msg === '关注用户成功') {
    userList.value[index].followed = true
    uni.showToast({
      title: '关注成功',
      icon: 'none',
      mask: true,
      duration: 500,
    })
  } else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
      mask: true,
      duration: 500,
    })
  }
}

// 取消关注
const cancelFollow = async (targetID: number, index: number) => {
  console.log(typeof index, index)
  const res = await unfollowUser(targetID)
  if (res.msg === '取消关注成功') {
    userList.value[index].followed = false
    uni.showToast({
      title: '取消关注成功!',
      icon: 'none',
      mask: true,
      duration: 500,
    })
  } else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
      mask: true,
      duration: 500,
    })
  }
}

// 当前分组
const currentGroup = ref(0)

// 获取关注列表
const getUserList = async () => {
  const res = await getUserFollowers(userInfo.value.ID)
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].followed = true
    userList.value.push(res.data[i])
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20rpx;

  .UserList {
    .title {
      display: flex;
      justify-content: space-between;
      color: #aaa;
      font-size: 26rpx;
      margin: 20rpx 0;
      font-family: '楷体';
      font-weight: 700;
    }

    .list {
      .item {
        height: 120rpx;
        margin: 20rpx 0;

        .friendBox {
          height: 120rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .avatar {
            width: 110rpx;
            height: 110rpx;
            background-color: skyblue;
            border-radius: 50%;
          }

          .ContentBox {
            padding-left: 18rpx;
            display: flex;
            justify-content: space-around;
            height: 100rpx;
            flex: 1;
            flex-direction: column;

            .nickname {
              font-size: 30rpx;
              font-weight: 700;
              color: #000;
            }

            .introduction {
              color: #ccc;
              font-size: 24rpx;
              overflow: hidden;
              -webkit-line-clamp: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }

          .chat {
            height: 100rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

            .online {
              color: #ccc;
              font-size: 24rpx;
              margin-bottom: 10rpx;
            }

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              font-size: 24rpx;
              height: 30px;
              border-radius: 0;
              border: 1rpx solid #222;
              background-color: #fff;
            }
          }
        }
      }
    }

    .group {
      display: flex;
      flex-wrap: wrap;

      .button {
        background-color: #eee;
        font-size: 22rpx;
        padding: 12rpx 18rpx;
        margin-right: 30rpx;
        color: #aaa;
      }

      .active {
        color: #000;
      }
    }
  }
}
</style>

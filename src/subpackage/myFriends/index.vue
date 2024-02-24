<template>
  <view class="container">
    <view class="UserList">
      <view class="title">
        <view>我的粉丝({{ userList.length }}人)</view>
        <view class="sort">排序</view>
      </view>
      <!-- <view class="group">
        <view
          v-for="(item, index) in groupList"
          :key="index"
          :data-id="index"
          @tap="changeGroup"
          :class="{ button: true, active: index === currentGroup }"
          >{{ item }}</view
        >
      </view> -->
      <view class="list">
        <view class="item" v-for="(item, index) in userList" :key="index">
          <view class="friendBox">
            <view>
              <image
                class="avatar"
                @tap="toPersonPage(item.userID)"
                :src="item.userAvatarUrl"
                mode="scaleToFill"
              />
            </view>
            <view class="ContentBox" @tap="toPersonPage(item.userID)">
              <view class="nickname">{{ item.userNickname }}</view>
              <view class="introduction">{{ item.userIntroduction }}</view>
            </view>
            <view class="chat">
              <span v-if="item.isisOnline" class="online" style="color: green">在线</span>
              <span v-else class="online">离线</span>
              <button plain @tap="toChat(item.userID)">私聊</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { http } from '@/utils/http'
import { onLoad } from '@dcloudio/uni-app'
import { useUserInfoStore } from '@/stores'
import { storeToRefs } from 'pinia'
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)

onLoad((options) => {
  // options.id && (currentGroup.value = options.id)
  getUserList()
})
// 点击头像
const toPersonPage = (userID: number) => {
  uni.navigateTo({ url: `/pages/mine/personPage/index?userID=${userID}` })
}

// 当前分组
const currentGroup = ref(0)
const groupList = ref(['全部', '关注', '粉丝'])
// 改变分组
const changeGroup = (e) => {
  currentGroup.value = e.currentTarget.dataset.id
}
// 获取粉丝列表
const getUserList = async () => {
  const res = await http({
    url: '/app/user/showUserFans',
    data: {
      userID: userInfo.value.ID,
    },
  })
  for (let i = 0; i < res.data.length; i++) {
    userList.value.push(res.data[i])
  }
  console.log(userList.value)
}
// 私聊
const toChat = (targetID: number) => {
  uni.navigateTo({ url: `/pages/community/chatRoom/index?targetID=${targetID}` })
}

const userList = ref([])
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
              width: 120rpx;
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

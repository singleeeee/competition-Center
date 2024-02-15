<template>
  <view class="container">
    <view class="UserList">
      <view class="title">
        <view>我的关注({{ userList.length }}人)</view>
        <view class="sort">排序</view>
      </view>
      <view class="group">
        <view
          v-for="(item, index) in groupList"
          :key="index"
          :data-id="index"
          @tap="changeGroup"
          :class="{ button: true, active: index === currentGroup }"
          >{{ item }}</view
        >
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in userList" :key="index">
          <nameTitle
            :author="item.userNickname"
            :avatar-url="item.userAvatarUrl"
            :user-i-d="item.userID"
            :date="item.userIntroduction"
            @tapAvatar="tapAvatar"
            icon="paperplane-filled"
          ></nameTitle>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import nameTitle from '@/components/nameTitle.vue'
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
const tapAvatar = (userID) => {
  uni.navigateTo({ url: `/pages/mine/personPage/index?userID=${userID}` })
}

// 当前分组
const currentGroup = ref(0)
const groupList = ref(['全部', '关注', '粉丝'])

const changeGroup = (e) => {
  currentGroup.value = e.currentTarget.dataset.id
}
// 获取关注or粉丝列表
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

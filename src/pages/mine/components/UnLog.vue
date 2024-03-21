<template>
  <view class="avatarBox" @tap="Login">
    <view class="avatar">
      <uni-icons type="person-filled" color="#ddd" size="54" />
    </view>
    <view class="nickname">登录/注册</view>
    <view class="info">一起见证更精彩的世界！ </view>
  </view>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores'
import { http } from '@/utils/http'
import type { UserInfo } from '@/types/global'
import { useChatHistoryStore } from '@/stores/modules/chatHistoryStore'
const emit = defineEmits(['changeIsLog'])
const Login = async () => {
  uni.showLoading()
  try {
    // 获取code
    const { code } = await uni.login({
      provider: 'weixin',
    })
    // 获取token和用户信息
    const resUserInfo = await http({
      url: `/app/login?code=${code}`,
      header: {},
    })
    const token = resUserInfo.data.jwt
    const userInfoStore = useUserInfoStore()
    // 更新仓库
    userInfoStore.changeUserInfo('token', token)

    // 解构需要的数据
    const {
      ID,
      userNickname,
      userAvatarUrl,
      userGender,
      userGrade,
      userProfession,
      userIntroduction,
      userLabel,
      userCity,
      loveNumber,
      fansNumber,
      followerNumber,
      userClass,
      userName,
      userPersonalId,
      userPhone,
      userStudentId,
    } = resUserInfo.data.user as UserInfo
    // 自己封装需要的数据结构
    const serviceUserInfo: UserInfo = {
      ID,
      token,
      userNickname,
      userAvatarUrl,
      userGender,
      userGrade,
      userProfession,
      userIntroduction,
      userLabel,
      userCity,
      loveNumber,
      fansNumber,
      followerNumber,
      userClass,
      userName,
      userPersonalId,
      userPhone,
      userStudentId,
    }
    // 更新本地仓库
    userInfoStore.updateUserInfo(serviceUserInfo)
    // 开启websocket连接
    useChatHistoryStore().websocketInit()
    emit('changeIsLog', true)
    uni.hideLoading()
  } catch (error) {
    console.log(error)
    uni.showToast({
      title: '登录或注册失败',
      icon: 'error',
    })
    uni.hideLoading()
  }
  uni.hideLoading()
}
</script>
<style lang="scss" scoped>
.avatarBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 380rpx;
  background: linear-gradient(to right bottom, #7bd686, #4c9872);
  margin: 30rpx 40rpx;
  margin-top: 90rpx;
  border-radius: 100rpx;
  .avatar {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #ccc;
  }

  .nickname {
    margin-top: 20rpx;
    font-family: '微软雅黑';
    font-size: 40rpx;
    color: #000;
    font-weight: 700;
  }
  .info {
    margin-top: 20rpx;
    font-size: 26rpx;
    padding-right: 10rpx;
  }
}
</style>

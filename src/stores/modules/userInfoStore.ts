import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/global'
import { ref } from 'vue'
import { http } from '@/utils/http'

// 定义 Store
export const useUserInfoStore = defineStore(
  'UserInfo',
  () => {
    // 默认用户信息
    const userInfo = ref<UserInfo>({
      ID: 0,
      // token
      token: '',
      //wxopenid
      userWxopenid: '',
      // 昵称
      userNickname: '微信用户',
      // 性别
      userGender: 0,
      // 头像
      userAvatarUrl: 'https://s11.ax1x.com/2024/02/02/pFQmajg.png',
      // 简介
      userIntroduction: '这个人很懒~',
      //所在地区
      userCity: '未知',
      // 用户标签
      userLabel: '新用户',
      //年级
      userGrade: 0, //1900-2100
      //专业
      userProfession: '考古学',
      // 获赞个数
      loveNumber: 0,
    })

    // 修改某项属性
    const changeUserInfo = <K extends keyof UserInfo>(property: K, value: UserInfo[K]) => {
      userInfo.value[property] = value
      if (userInfo.value.token) {
        http({
          url: `/app/user/updateUserInfo`,
          method: 'POST',
          data: {
            [property]: value,
          },
          fail: () => {
            uni.showToast({
              title: '修改失败',
              icon: 'error',
              mask: true,
            })
          },
        })
      } else {
        uni.showToast({
          title: '请重新登录',
          icon: 'error',
          mask: true,
        })
        uni.switchTab({ url: '/pages/mine/index' })
      }
    }
    // 清除用户信息
    const clearUserInfo = () => {
      // // ID
      // userInfo.value.ID = 0
      // // token
      // ;(userInfo.value.token = ''),
      //   //wxopenid
      //   (userInfo.value.userWxopenid = ''),
      //   // 昵称
      //   (userInfo.value.userNickname = '微信用户'),
      //   // 性别
      //   (userInfo.value.userGender = 0),
      //   // 头像
      //   (userInfo.value.userAvatarUrl = 'https://s11.ax1x.com/2024/02/02/pFQmajg.png'),
      //   // 简介
      //   (userInfo.value.userIntroduction = '无'),
      //   //所在地区
      //   (userInfo.value.userCity = '广东'),
      //   // 用户标签
      //   (userInfo.value.userLabel = ''),
      //   //年级
      //   (userInfo.value.userGrade = 0),
      //   //专业
      //   (userInfo.value.userProfession = ''),
      //   // 获赞个数
      //   (userInfo.value.loveNumber = 0),
      uni.removeStorageSync('UserInfo')
      // console.log('清除本地仓库后的pinia', userInfo)
      // console.log('本地仓库', uni.getStorageSync('UserInfo'))
    }

    // 整体更新仓库
    const updateUserInfo = (value: UserInfo) => {
      const res = JSON.parse(JSON.stringify(value))
      userInfo.value = res
    }
    // 记得 return
    return {
      userInfo,
      changeUserInfo,
      clearUserInfo,
      updateUserInfo,
    }
  },
  // TODO: 持久化
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)

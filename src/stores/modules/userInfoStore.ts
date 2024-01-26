import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/global'
import { reactive } from 'vue'
import { http } from '@/utils/http'

// 定义 Store
export const useUserInfoStore = defineStore(
  'UserInfo',
  () => {
    let userInfo = reactive<UserInfo>({
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
      userAvatarUrl:
        'https://jk-competition.oss-cn-guangzhou.aliyuncs.com/yourBasePath/uploads/2024-01-24/mcl.jpg',
      // 简介
      userIntroduction: '',
      //所在地区
      userCity: '',
      // 用户标签
      userLabel: '',
      //年级
      userGrade: 0, //1900-2100
      //专业
      userProfession: '',
      // 获赞个数
      loveNum: 0,
    })

    // 修改某项属性
    const changeUserInfo = <K extends keyof UserInfo>(property: K, value: UserInfo[K]) => {
      userInfo[property] = value

      if (userInfo.token) {
        http({
          url: `/app/user/updateUserInfo`,
          method: 'POST',
          data: {
            ID: userInfo.ID,
            [property]: value,
          },
        })
      }
    }
    // 清除用户信息
    const clearUserInfo = () => {
      ;(userInfo = {
        ID: 0,
        // token
        token: '',
        //wxopenid
        userWxopenid: '',
        // 昵称
        userNickname: '',
        // 性别
        userGender: 0,
        // 头像
        userAvatarUrl: '',
        // 简介
        userIntroduction: '',
        //所在地区
        userCity: '',
        // 用户标签
        userLabel: '',
        //年级
        userGrade: 0, //1900-2100
        //专业
        userProfession: '',
        // 获赞个数
        loveNUm: 0,
      }),
        uni.removeStorageSync('UserInfo')
    }

    // 记得 return
    return {
      userInfo,
      changeUserInfo,
      clearUserInfo,
    }
  },
  // TODO: 持久化
  {
    //网页端配置
    // persist: true,
    // 小程序端
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

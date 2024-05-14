import { http } from '@/utils/http'
import type { Data } from '@/utils/http'
import type { otherUserInfo } from '@/api/user/follow'

// 更新用户信息的请求参数
export type UndateRequest = {
  loveNumber?: number
  sessionKey?: string
  userAvatarUrl?: string
  userCity?: string
  userGender?: number
  userGrade?: number
  userIntroduction?: string
  userLabel?: string
  userModel?: null
  userNickname?: string
  userProfession?: string
}

export type nullResponse = {}
// 更新用户信息
export const updateUserInfo: (data: UndateRequest) => Promise<Data<nullResponse>> = (
  data: UndateRequest,
) => {
  return http<nullResponse>({
    url: '/app/user/updateUserInfo',
    method: 'POST',
    data,
  })
}

// 根据用户ID获取指定用户信息
export type ReuserData = {
  CreatedAt: string
  ID: number
  loveNumber: null
  sessionKey: string
  UpdatedAt: string
  userAvatarUrl: string
  userCity: string
  userGender: number
  userGrade: null
  userIntroduction: string
  userLabel: string
  userModel: null
  userNickname: string
  userProfession: string
  userWxopenid: string
}

export type userDataByID = {
  reuserData: ReuserData
}

export const getUserInfoByID: (ID: string) => Promise<Data<userDataByID>> = (ID: string) => {
  return http<userDataByID>({
    url: '/app/user/getUserInfoByid',
    data: {
      ID,
    },
  })
}

//  修改用户个人主页的经历
export type updateUserExperienceRequest = {
  ID: number
  desc: string
}

export const updateUserExperience: (
  data: updateUserExperienceRequest,
) => Promise<Data<nullResponse>> = (data: updateUserExperienceRequest) => {
  return http<nullResponse>({
    url: '/app/user/updateUserHistory',
    method: 'POST',
    data,
  })
}

// 根据某条经历的ID删除该条经历

export const deleteUserExperience: (ID: string) => Promise<Data<nullResponse>> = (ID: string) => {
  return http<nullResponse>({
    url: `/app/user/deleteUserHistory?ID=${ID}`,
    method: 'DELETE',
  })
}

// 添加用户经历
export type addUserExperienceRequest = {
  userID: number
  time: string
  desc: string
}

export type addUserExperienceResponse = {
  ID: number
}
export const addUserExperience: (
  data: addUserExperienceRequest,
) => Promise<Data<nullResponse>> = async (data: addUserExperienceRequest) => {
  return http<nullResponse>({
    url: '/app/user/addUserHistory',
    method: 'POST',
    data,
  })
}

// 获取用户经历用于个人主页展示
export type getUserExperienceRequest = {
  userID: number
  page?: string
  pageSize?: string
}

export type getUserExperienceResponse = {
  list: userExperience[]
  page: number
  pageSize: number
  total: number
}

export type userExperience = {
  CreatedAt: string
  desc: string
  ID: number
  time: string
  UpdatedAt: string
  userID: number
}
export const getUserExperience: (
  data: getUserExperienceRequest,
) => Promise<Data<getUserExperienceResponse>> = (data: getUserExperienceRequest) => {
  return http<getUserExperienceResponse>({
    url: '/app/user/showUserHistory',
    data,
  })
}

// 获取用户所有朋友的信息
export const getUserFriends: (userID: string) => Promise<Data<otherUserInfo[]>> = (
  userID: string,
) => {
  return http<otherUserInfo[]>({
    url: '/app/user/showUserFriend',
    data: {
      userID,
    },
  })
}

// 获取用户列表
export type GetUserListRequest = {
  /**
   * 非必须 页码  没有页码默认全输出
   */
  page?: string
  /**
   * 每页大小 需要与page成对出现
   */
  pageSize?: string
  /**
   * 非必须 模糊查找地区含有广东的人
   */
  userCity?: string
  /**
   * 非必须 精确查找性别为男的人 男1女2
   */
  userGender?: string
  /**
   * 非必须 精确查找年级为2023的人
   */
  userGrade?: string
  /**
   * 非必须 精确查找管理员还是普通人 管理员9 普通人0
   */
  userModel?: string
  /**
   * 非必须 模糊查找含有userNickname的人
   */
  userNickname?: string
  /**
   * 非必须 模糊查找专业为计算机的人
   */
  userProfession?: string
}

export type UserInfoListResponse = {
  list: UserInfoList[]
  page: number
  pageSize: number
  total: number
}

export type UserInfoList = {
  CreatedAt: string
  fansNumber: number
  followerNumber: number
  friendNumber: number
  ID: number
  isOnline: boolean
  isYourFans: boolean
  isYourFollower: boolean
  isYourFriend: boolean
  loveNumber: number
  sessionKey: string
  UpdatedAt: string
  userAvatarUrl: string
  userCity: string
  userClass: string
  userGender: number
  userGrade: number
  userIntroduction: string
  userLabel: string
  userModel: number
  userName: string
  userNickname: string
  userPersonalId: string
  userPhone: string
  userProfession: string
  userStudentId: string
  [property: string]: any
}
export const getUserList: (data: GetUserListRequest) => Promise<Data<UserInfoListResponse>> = (
  data: GetUserListRequest,
) => {
  return http<UserInfoListResponse>({
    url: '/app/user/getUserInfoList',
    method: 'GET',
    data,
  })
}

// 获取用户主页动态
/**
 * Request
 */
export type Request = {
  code: string
  data: RequestData
  msg: string
  [property: string]: any
}

export type RequestData = {
  Activity: Activity[]
  Total: number
  userId: number
  [property: string]: any
}

export type Activity = {
  data: ActivityData
  pageType: number
  [property: string]: any
}

export type ActivityData = {
  comId?: number
  comInfo: DatacomInfo
  commentDisId?: number
  commentLikeNumber?: number
  commentSons?: null
  commentText?: string
  commentUserId?: number
  CreatedAt: string
  disCollectNumber: number
  disComId: number
  disCommentNumber: number
  disContent: string
  disHot: number
  disInfo?: DisInfo
  disLookNumber: number
  disLoveNumber: number
  disModel: number
  disPicture: string[]
  disStatus: number
  disTitle: string
  disUserId: number
  groupCaptainId?: number
  groupName?: string
  groupStatus?: number
  groupUsersId?: string
  ID: number
  isCollected: boolean
  isLiked: boolean
  UpdatedAt: string
  userInfo: DataUserInfo
  [property: string]: any
}

export type DatacomInfo = {
  comEnd: string
  comHot: number
  comIntroduction: string
  comMaxNumber: null
  comMinNumber: null
  comModel: number
  comNumber: number
  comPicture: string
  comStart: string
  comStatus: number
  comSubTitle: string
  comTitle: string
  comType: number
  CreatedAt: string
  extra: string
  ID: number
  UpdatedAt: string
  [property: string]: any
}

export type DisInfo = {
  comInfo: DisInfocomInfo
  CreatedAt: string
  disCollectNumber: number
  disComId: number
  disCommentNumber: number
  disContent: string
  disHot: number
  disLookNumber: number
  disLoveNumber: number
  disModel: number
  disPicture: string[]
  disStatus: number
  disTitle: string
  disUserId: number
  ID: number
  isCollected: boolean
  isLiked: boolean
  UpdatedAt: string
  userInfo: DisInfoUserInfo
  [property: string]: any
}

export type DisInfocomInfo = {
  comEnd: string
  comHot: number
  comIntroduction: string
  comMaxNumber: null
  comMinNumber: null
  comModel: number
  comNumber: number
  comPicture: string
  comStart: string
  comStatus: number
  comSubTitle: string
  comTitle: string
  comType: number
  CreatedAt: string
  extra: string
  ID: number
  UpdatedAt: string
  [property: string]: any
}

export type DisInfoUserInfo = {
  CreatedAt: string
  fansNumber: number
  followerNumber: number
  friendNumber: number
  ID: number
  isOnline: boolean
  isYourFans: boolean
  isYourFollower: boolean
  isYourFriend: boolean
  loveNumber: number
  sessionKey: string
  UpdatedAt: string
  userAvatarUrl: string
  userCity: string
  userClass: string
  userGender: number
  userGrade: number
  userIntroduction: string
  userLabel: string
  userModel: number
  userName: string
  userNickname: string
  userPersonalId: string
  userPhone: string
  userProfession: string
  userStudentId: string
}

export type DataUserInfo = {
  CreatedAt: string
  fansNumber: number
  followerNumber: number
  friendNumber: number
  ID: number
  isOnline: boolean
  isYourFans: boolean
  isYourFollower: boolean
  isYourFriend: boolean
  loveNumber: number
  sessionKey: string
  UpdatedAt: string
  userAvatarUrl: string
  userCity: string
  userClass: string
  userGender: number
  userGrade: number
  userIntroduction: string
  userLabel: string
  userModel: number
  userName: string
  userNickname: string
  userPersonalId: string
  userPhone: string
  userProfession: string
  userStudentId: string
  [property: string]: any
}
export const getUserDynamic: (data: Request) => Promise<Data<RequestData>> = async (
  data: Request,
) => {
  return http<RequestData>({
    url: '/app/user/showUserHomePage',
    data,
  })
}

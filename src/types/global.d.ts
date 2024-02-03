// 用户数据
export type UserInfo = {
  // ID
  ID: number
  // token
  token: string
  //wxopenid
  userWxopenid: string
  // 昵称
  userNickname: String
  // 性别
  userGender: number //01
  // 头像
  userAvatarUrl: string
  // 简介
  userIntroduction: string
  //所在地区
  userCity: string
  // 用户标签
  userLabel: string
  //年级
  userGrade: number //1900-2100
  //专业
  userProfession: string
  // 获赞个数
  loveNumber: number
}

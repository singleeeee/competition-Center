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
// 帖子列表
export type PostList = {
  // 帖子ID
  ID: number
  // 是否点赞
  isLike: boolean
  // 关联的比赛
  disComId?: number
  // 帖子的头像
  avatarUrl: string
  // 帖子的作者昵称
  author: string
  // 帖子的标题
  title: string
  // 帖子的发布时间
  time: string
  // 帖子的内容
  content: string
  // 帖子的图片数组
  imageUrl: string[]
  // 帖子被收藏的数量
  collectedNum: number
  // 帖子被点赞的数量
  likedNum: number
  // 帖子的阅读量
  disLookNum: number
  // 帖子的评论数量
  disCommentNum: number
}

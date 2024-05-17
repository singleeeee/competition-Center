// 用户数据
export type UserInfo = {
  // ID
  ID: number
  // token
  token: string
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
  // 关注个数
  followerNumber: number
  // 粉丝个数
  fansNumber: number
  // 真实姓名
  userName: string
  // 学号
  userStudentId: string
  // 班级
  userClass: string
  // 手机号码
  userPhone: string
  // 身份证号码
  userPersonalId: string
  // 创建时间
  CreatedAt?: string
  [property: string]: any
}
// 帖子列表
export type PostList = {
  // 帖子ID
  ID: number
  // 是否点赞
  isLiked: boolean
  // 是否收藏
  isCollected: boolean
  // 关联的比赛
  disComId?: number
  // 帖子的作者ID
  userInfoID: number
  // 帖子的作者头像
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
// 收藏列表
export type CollectList = {
  // 帖子ID
  disId: number
  // 帖子标题
  disTitle: string
  // 帖子所属话题（比赛）
  disTopic?: string
  // 作者姓名
  disUserName: string
}

// 比赛列表
export type CompetitionInfo = {
  comEnd: string
  comHot: number
  comIntroduction: string
  comMaxNumber: number
  comMinNumber: number
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

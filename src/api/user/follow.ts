import { http } from '@/utils/http'
import type { Data } from '@/utils/http'

type response = {}
// 关注用户
export const followUser: (followUserId: number) => Promise<Data<response>> = (
  followUserId: number,
) => {
  return http<response>({
    url: '/app/user/followUser',
    data: {
      followUserId,
    },
  })
}

// 取消关注用户
export const unfollowUser: (unFollowUserId: number) => Promise<Data<response>> = (
  unFollowUserId: number,
) => {
  return http<response>({
    url: `/app/user/unFollowUser?unFollowUserId=${unFollowUserId}`,
    method: 'DELETE',
  })
}

export type otherUserInfo = {
  isOnline: boolean
  userAvatarUrl: string
  userCity: string
  userID: number
  userIntroduction: string
  userNickname: string
  [property: string]: any
}

// 获取用户所有关注用户
export const getUserFollowers: (userID: number) => Promise<Data<otherUserInfo[]>> = (
  userID: number,
) => {
  return http<otherUserInfo[]>({
    url: '/app/user/showUserFollower',
    data: {
      userID,
    },
  })
}

// 获取用户所有粉丝
export const getUserFans: (userID: number) => Promise<Data<otherUserInfo[]>> = async (
  userID: number,
) => {
  return http<otherUserInfo[]>({
    url: '/app/user/showUserFans',
    data: {
      userID,
    },
  })
}

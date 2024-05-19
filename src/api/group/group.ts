import { http } from '@/utils/http'
import type { Data } from '@/utils/http'

type ApifoxModel = {
  /**
   * 非必须 绑定关联比赛
   */
  comId?: string
  /**
   * 非必须 精确搜索
   */
  groupCaptainId?: string
  /**
   * 非必须 模糊搜索队名
   */
  groupName?: string
  /**
   * 非必须 查询比赛状态
   */
  groupStatus?: string
  /**
   * 非必须 搜索队员名
   */
  groupUsersId?: string
  /**
   * 非必须 分液器
   */
  page?: string
  /**
   * 非必须 分液器
   */
  pageSize?: string
  [property: string]: any
}

type resData = {
  list: groupInfo[]
  page: number
  pageSize: number
  total: number
}
export type groupInfo = {
  comId: number
  CreatedAt: string
  groupCaptainId: number
  groupName: string
  groupStatus: number
  groupUsersId: string
  ID: number
  UpdatedAt: string
  [property: string]: any
}

export const getGroupInfoList: (data: ApifoxModel) => Promise<Data<resData>> = (
  data: ApifoxModel,
) => {
  return http({
    url: '/app/group/getGroupInfoList',
    data,
  })
}

// 踢人
type delTeamerRequest = {
  userId: string
  groupId: string
}

export const deleteGroupUser: (data: delTeamerRequest) => Promise<Data<resData>> = (
  data: delTeamerRequest,
) => {
  return http({
    url: `/app/groupInvite/deleteGroupUser?userId=${data.userId}&groupId=${data.groupId}`,
    method: 'DELETE',
    data,
  })
}

export const deleteGroup: (ID: number) => Promise<Data<resData>> = (ID: number) => {
  return http({
    url: `/app/group/deleteGroup?ID=${ID}`,
    method: 'DELETE',
  })
}

// 邀请好友
type inviteTeamerRequest = {
  userId: number
  grougroupId: number
}
export const inviteUser: (ID: inviteTeamerRequest) => Promise<Data<resData>> = (
  data: inviteTeamerRequest,
) => {
  return http({
    url: `/app/groupInvite/inviteUser`,
    method: 'POST',
    data,
  })
}

// 查询邀请情况
type invitationRequest = {
  /**
   * 非必填 查询这个比赛邀请的队伍
   */
  comId?: number
  /**
   * 非必填 查询这个队伍邀请的人
   */
  groupId?: number
  page?: string
  pageSize?: string
  /**
   * 非必填 邀请状态 1待邀请 2邀请成功 3 邀请失败
   */
  status?: number
  /**
   * 非必填 查询邀请这个人的队伍
   */
  userId?: number
  [property: string]: any
}
type invitationResponse = {
  list: invitationData[]
  total: number
  page: number
  pageSize: number
}

type invitationData = {
  ID: number
  userId: number
  groupId: number
  comId: number
  status: number
  CreatedAt: string
  UpdatedAt: string
}
export const getInvitation: (data: invitationRequest) => Promise<Data<invitationResponse>> = (
  data: invitationRequest,
) => {
  return http({
    url: '/app/groupInvite/getGroupInviteInfoList',
    data,
  })
}
// 根据队伍id获取队伍信息

/**
 * Request
 */

export type responsebById = {
  regroupInfo: RegroupInfo
  [property: string]: any
}

export type RegroupInfo = {
  comId: number
  CreatedAt: string
  groupCaptainId: number
  groupName: string
  groupStatus: number
  groupUsersId: string
  ID: number
  UpdatedAt: string
  [property: string]: any
}
export const getGroupInfoByID: (id: string) => Promise<Data<responsebById>> = (id: string) => {
  return http({
    url: '/app/group/getGroupInfoByid',
    data: {
      ID: id,
    },
  })
}

// 同意邀请
export const acceptInvitation: (id: string) => Promise<Data<resData>> = (id: string) => {
  return http({
    url: `/app/groupInvite/agreeInvite?groupId=${id}`,
    method: 'POST',
  })
}
// 拒绝邀请

export const refuseInvitation: (id: string) => Promise<Data<resData>> = (id: string) => {
  return http({
    url: `/app/groupInvite/refuseInvite?groupId=${id}`,
    method: 'POST',
    data: {
      groupId: id,
    },
  })
}

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

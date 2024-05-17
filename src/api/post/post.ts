import { http } from '@/utils/http'
import type { Data } from '@/utils/http'
import type { UserInfo } from '@/types/global'
import type { CompetitionInfo } from '@/types/global'

export type RequestData = {
  /**
   * 非必须 精确查找某个比赛关联的帖子
   */
  disComId?: string
  /**
   * 非必须 精确查找帖子类型1普通 2公告 3比赛
   */
  disModel?: string
  /**
   * 非必须 精确查找帖子类型 1待审核 2 展示中 3 有问题
   */
  disStatus?: string
  /**
   * 非必须 模糊查找帖子标题
   */
  disTitle?: string
  /**
   * 非必须 精确查找某个人的发表的帖子
   */
  disUserId?: string
  /**
   * 需要与sort一起存在 ascending升序排序 descending 降序排序 没有则ascending
   */
  order?: string
  page?: string
  pageSize?: string
  /**
   * 要排序的字段 标识为json转_连接，默认按时间最早降序
   */
  sort?: string
  [property: string]: any
}

export type ResponseData = {
  list: List[]
  page: number
  pageSize: number
  total: number
  [property: string]: any
}

export type List = {
  comInfo?: CompetitionInfo
  CreatedAt?: string
  disCollectNumber?: number
  disComId?: number
  disCommentNumber?: number
  disContent?: string
  disHot?: number
  disLookNumber?: number
  disLoveNumber?: number
  disModel?: number
  disPicture?: string[]
  disStatus?: number
  disTitle?: string
  disUserId?: number
  ID?: number
  isCollected?: boolean
  isLiked?: boolean
  UpdatedAt?: string
  userInfo?: UserInfo
  [property: string]: any
}

export const getDisInfoList: (data: RequestData) => Promise<Data<ResponseData>> = (
  data: RequestData,
) => {
  return http({
    url: '/app/dis/getDisInfoList',
    data,
  })
}

import { getUserInfoByID } from '@/api/user/userInfo'

export const toTeamList = async (str: string) => {
  const idList = str.split('-')
  idList.pop()
  idList.shift()
  const result = []
  for (const i of idList) {
    const res = await getUserInfoByID(i)
    result.push(res.data.reuserData)
  }
  return result
}

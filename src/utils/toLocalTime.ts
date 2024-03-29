export const toLocalTime = (resource: string | number, type: boolean = true): string => {
  // 传过来的数据
  const data = new Date(resource)
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  const hours = data.getHours()
  let minutes: number | string = data.getMinutes()
  // 将minutes转为string类型
  if (minutes < 10) minutes = `0${minutes}`
  else if (minutes === 0) {
    minutes = '00'
  }
  const time = `${year}/${month}/${day} ${hours}:${minutes}`
  if (type) {
    return time
  } else {
    const now = new Date()
    const nowYear = now.getFullYear()

    if (nowYear !== year) return time
    const nowMonth = now.getMonth() + 1
    if (nowMonth !== month) {
      return `${nowMonth - month} 个月前`
    }
    const nowDay = now.getDate()
    if (nowDay !== day) {
      return `${nowDay - day} 天前`
    }
    const nowHours = now.getHours()
    if (nowHours !== hours) {
      return `${nowHours - hours} 小时前`
    }
    const nowMinutes = now.getMinutes()
    if (nowMinutes !== Number(minutes)) {
      return `${nowMinutes - +minutes} 分钟前`
    }
    return `刚刚`
  }
}

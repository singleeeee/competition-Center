export const getTimeDifference = (startTime: string, endTime: string): number => {
  // 将日期字符串转换为日期对象
  const firstDate = new Date(startTime)
  const secondDate = new Date(endTime)

  // 计算两个日期之间的毫秒差异
  const timeDifference = secondDate.getTime() - firstDate.getTime()

  // 将毫秒差异转换为天数
  // const daysDifference = timeDifference / (1000 * 3600 * 24)

  return Math.floor(timeDifference)
}

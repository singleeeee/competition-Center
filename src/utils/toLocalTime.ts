export const toLocalTime = (resource: string): string => {
  //
  const data = new Date(resource)
  const year = data.getFullYear()
  const month = data.getMonth() + 1
  const day = data.getDate()
  const hours = data.getHours()
  const minutes = data.getMinutes()
  const time = `${year}/${month}/${day} ${hours}:${minutes}`
  return time
}

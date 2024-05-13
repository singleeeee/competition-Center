// 对过长的数字进行缩短
export const shortenNum = (resource: number) => {
  if (resource > 100000) {
    return (resource / 100000).toFixed(1) + 'w'
  } else return resource
}

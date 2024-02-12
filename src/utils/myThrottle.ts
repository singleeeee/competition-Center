export const myThrottle = (fn: Function, delay: number = 1000) => {
  let flag = false
  return (...args: any[]) => {
    if (flag) return
    else {
      flag = true
      setTimeout(() => {
        fn(...args)
        flag = false
      }, delay)
    }
  }
}

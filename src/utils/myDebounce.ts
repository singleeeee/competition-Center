export const myDebounce = (func: Function, delay: number = 500) => {
  let timer: number
  return function (...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

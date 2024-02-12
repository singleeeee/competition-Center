export const myDebounce = (func: Function, delay: number = 500) => {
  let timer: number
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

// import { useMemberStore } from '@/stores'
// // 接口基地址
// const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'

// // 添加拦截器
// const httpInterceptor = {
//   //拦截前触发
//   invoke(options: UniApp.RequestOptions) {
//     // 1. 非http开头需要拼接地址
//     if (!options.url.startsWith('http')) {
//       options.url = baseURL + options.url
//     }
//     // 2. 设置超时时间，默认60s
//     options.timeout = 10000
//     // 3. 添加客户端类型
//     // 4. 添加token请求头标识
//     const memberStore = useMemberStore()
//     if (memberStore.profile?.token) {
//       options.header.Authorization = memberStore.profile.token
//     }
//   },
// }

// // 拦截 request 请求
// uni.addInterceptor('request', httpInterceptor)
// // 拦截 uploadFile 文件上传
// uni.addInterceptor('uploadFile', httpInterceptor)

// // 添加类型，支持泛型
// interface Data<T> {
//   code: string
//   msg: string
//   result: T
// }

// // 添加请求拦截器
// export const http = <T>(options: UniApp.RequestOptions) => {
//   return new Promise<Data<T>>((resolve, reject) => {
//     uni.request({
//       ...options,
//       // 响应成功
//       success(res) {
//         // 状态码 2xx，参考 axios 的设计
//         if (res.statusCode >= 200 && res.statusCode < 300) {
//           // 2.1 提取核心数据 res.data
//           resolve(res.data as Data<T>)
//         } else if (res.statusCode === 401) {
//           // 401错误  -> 清理用户信息，跳转到登录页
//           const memberStore = useMemberStore()
//           memberStore.clearProfile()
//           uni.navigateTo({ url: '/pages/community/community' })
//           reject(res)
//         } else {
//           // 其他错误 -> 根据后端错误信息轻提示
//           uni.showToast({
//             icon: 'none',
//             title: (res.data as Data<T>).msg || '请求错误',
//           })
//           reject(res)
//         }
//       },
//       // 响应失败
//       fail(err) {
//         uni.showToast({
//           icon: 'none',
//           title: '网络错误，换个网络试试',
//         })
//         reject(err)
//       },
//     })
//   })
// }

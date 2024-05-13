import { http } from '@/utils/http'
import type { Data } from '@/utils/http'

// 参数
type parameter = {
  file: File
}

// 响应参数
type response = {
  name: string
  url: string
  tag: string
  key: string
}

// 文件上传
export const upLoadFile: (data: parameter) => Promise<Data<response>> = (data: parameter) => {
  return http<response>({
    method: 'POST',
    url: '/app/upload/file',
    data,
  })
}

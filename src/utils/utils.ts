import { message } from 'antd'
import { AxiosError } from 'axios'
// export { default as uuidv4 } from 'uuid/dist/umd/uuidv4.min'

export function errorHandle(error: any) {
  if (error?.response) {
    // AxiosError
    const { response } = error as AxiosError
    switch (response?.status) {
      case 401:
        message.error({ key: '401', content: '401' })

        break
      case 400:
        message.error(response?.data?.message || response?.statusText)
        break
      default:
        message.error(response?.statusText || error.message)
        break
    }
  } else if (error?.message) {
    // Error
    message.error({
      content: error.message,
      duration: 2,
    })
  } else {
    message.error({
      content: error,
      duration: 2,
    })
  }
  return error
}

export const isNumberFunc = (arg: any): boolean => {
  return typeof arg === 'number'
}

export const getDataType = (data: any): string => {
  return (
    Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[]
  )[1]
}

export const overrideRequire = (path: string) => {
  const env = process.env.IS_VITE
  debugger
  const prefix = '/src/'
  if (!env) {
    // return require(path)
  } else {
    return `${prefix}${path}`
  }
}

/**
 * UUID生成器
 * @param len 长度 number
 * @param radix 随机数基数 number
 * @returns {string}
 */
export const uuid = (len: number, radix: number = 62) => {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[Math.floor(Math.random() * radix)]
    }
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = Math.floor(Math.random() * 16)
        uuid[i] = chars[i === 19 ? ((r % 4) % 8) + 8 : r]
      }
    }
  }
  return uuid.join('')
}

export function pickText(text: string) {
  const reg = /<a[^>]*>([^<]+)<\/a>/g
  const result = reg.exec(text)
  return Array.isArray(result) ? result[1] : text
}

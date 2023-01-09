import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

// 格式化时长
export function durationTs(milliseconds: string, format = 'HH:mm:ss') {
  return dayjs.duration(milliseconds).format(format)
}

// 格式化日期
export function datefmtFn(date: string, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export const email_regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
export const password_regx =
  /^(?![\da-z]+$)(?![\dA-Z]+$)(?![\d!！@#$%^&*~{}【】;；:：""”“‘《》，。,<>/?？|\\+-.]+$)(?![a-zA-Z]+$)(?![a-z!！@#$%^&*~{}【】;；:：""”“‘《》，。,<>/?？|\\+-.]+$)(?![A-Z!！@#$%^&*~{}【】;；:：""”“‘《》，。,<>/?？|\\+-.]+$)[\da-zA-z!！@#$%^&*~{}【】;；:：""”“‘《》，。,<>/?？|\\+-.]{6,18}$/

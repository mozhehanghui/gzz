import axios, { AxiosRequestConfig } from 'axios'
import { APIResponse } from 'types'
const baseURL = ''

export const instance = axios.create({
  baseURL,
  validateStatus(status) {
    return status < 400 // 约束http status<400 的进入resolved
  },
})

export function request<T>(
  url: string | AxiosRequestConfig,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> {
  const axiosPromise =
    typeof url === 'string' ? instance(url, config) : instance(url)
  return axiosPromise.then(response => response.data as APIResponse<T>)
}

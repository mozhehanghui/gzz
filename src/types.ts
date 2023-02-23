import { UserState } from 'pages/App/slice/types'
import { CSSProp } from 'styled-components'
declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp
  }
}

export interface RootState {
  user?: UserState
}

export interface IPagination {
  page?: number
  pageSize?: number
  totalPage?: number
  totalRecord?: number
}

export interface APIResponse<T> {
  status?: number
  message?: string
  result: T
  pagination: IPagination
  payload: T
}

export interface ICallback<P = any, R = any> {
  resolve?: (val?: P) => R
}

export const tuple = <T extends string[]>(...args: T) => args
export const tupleNumber = <T extends number[]>(...args: T) => args
export enum CommonFormTypes {
  Create = 'create',
  Update = 'update',
  Retrieve = 'retrieve',
}

export const CommonFormTitle = {
  [CommonFormTypes.Create]: '新建',
  [CommonFormTypes.Update]: '修改',
  [CommonFormTypes.Retrieve]: '查看',
}

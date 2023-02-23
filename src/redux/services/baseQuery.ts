import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: '',
})

export const fetchWithIntercept: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> =
    await baseQuery(args, api, extraOptions)
  const { data, error, meta } = result

  // 如果遇到httpStatus!=200-300错误的时候
  if (error) {
    // 根据状态来处理错误
    console.error('服务器错误')
    return { error: '服务器错误' }
  }

  // 正确的时候，根据各自后端约定来写的
  if (Object.is(data?.status, 0)) {
    return { data: data?.result, meta }
  }

  console.error(data.message)
  return { error: data.message }
}

export const baseQueryApi = createApi({
  reducerPath: 'baseQueryApi',
  keepUnusedDataFor: 10,
  baseQuery: fetchWithIntercept,
  tagTypes: ['Post', 'App'],
  endpoints: () => ({}),
})

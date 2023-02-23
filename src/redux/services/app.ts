import { baseQueryApi } from 'redux/services/baseQuery'

interface IResultApps {
  data: Array<{ id: number }>
  count: any
  label_columns: any
}
export const AppsApi = baseQueryApi.injectEndpoints({
  endpoints: builder => ({
    getApps: builder.query<IResultApps, { page?: number; pageSize?: number }>({
      query: ({ page, pageSize }) => ({
        url: '/app/',
        method: 'GET',
        params: {
          form_data: JSON.stringify({
            filters: [
              {
                col: 'labels',
                opr: 'ct',
                value: '"kind": "job"',
              },
            ],
            page: page || 0,
            page_size: pageSize || 20,
          }),
        },
      }),
      transformResponse: (response: IResultApps, meta, arg) => {
        return {
          data: response.data,
          count: response.count,
          label_columns: response.label_columns,
        }
      },

      providesTags: (result, error, arg) => {
        return result && result.data
          ? [
              { type: 'App', id: 'LIST' },
              ...result?.data.map(({ id }) => ({
                type: 'App' as const,
                id,
              })),
            ]
          : [{ type: 'App', id: 'LIST' }]
      },
      // 该函数将在请求开始时调用，在处理程序中运行其他逻辑
      onQueryStarted: () => {},
    }),

    addNewApps: builder.mutation({
      query: initialPost => {
        return {
          url: '/app/training',
          method: 'POST',
          body: initialPost,
        }
      },
      invalidatesTags: ['App'],
    }),

    deleteApps: builder.mutation<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/app/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['App'],
    }),

    stopApps: builder.mutation<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/app/stop/${id}`,
          method: 'POST',
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'App', id: arg.id }],
    }),
  }),
})

export const {
  useGetAppsQuery,
  useLazyGetAppsQuery,
  useAddNewAppsMutation,
  useDeleteAppsMutation,
  useStopAppsMutation,
} = AppsApi

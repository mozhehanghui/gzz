import { baseQueryApi } from 'redux/services/baseQuery'
interface IJobsParams {}
interface IResultTrainingJobs {
  data: Array<{ id: number }>
  count: any
  label_columns: any
}
export const trainingJobsApi = baseQueryApi.injectEndpoints({
  endpoints: builder => ({
    getTrainingJobs: builder.query<
      IResultTrainingJobs,
      { page?: number; pageSize?: number }
    >({
      query: ({ page, pageSize }) => ({
        url: '/workflow_modelview/api/',
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
      transformResponse: (response: IResultTrainingJobs, meta, arg) => {
        return {
          data: response.data,
          count: response.count,
          label_columns: response.label_columns,
        }
      },

      providesTags: (result, error, arg) => {
        return result && result.data
          ? [
              { type: 'TrainingJob', id: 'LIST' },
              ...result?.data.map(({ id }) => ({
                type: 'TrainingJob' as const,
                id,
              })),
            ]
          : [{ type: 'TrainingJob', id: 'LIST' }]
      },
      // 该函数将在请求开始时调用，在处理程序中运行其他逻辑
      onQueryStarted: () => {},
    }),

    addNewTrainingJobs: builder.mutation({
      query: initialPost => {
        return {
          url: '/workflow_modelview/api/training',
          method: 'POST',
          body: initialPost,
        }
      },
      invalidatesTags: ['TrainingJob'],
    }),

    deleteTrainingJobs: builder.mutation<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/workflow_modelview/api/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['TrainingJob'],
    }),

    stopTrainingJobs: builder.mutation<any, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/workflow_modelview/api/stop/${id}`,
          method: 'POST',
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'TrainingJob', id: arg.id },
      ],
    }),

    getTrainingJobParamsById: builder.query<IJobsParams, { id: number }>({
      query: ({ id }) => ({
        url: `workflow_modelview/api/${id}`,
        method: 'GET',
      }),
    }),

    getTrainingEngine: builder.query<IResultTrainingJobs, string | number>({
      query: () => ({
        url: '/workflow_modelview/api/training/engine',
        method: 'GET',
      }),
    }),
    getTrainingResource: builder.query<IResultTrainingJobs, string | number>({
      query: () => ({
        url: '/workflow_modelview/api/training/resource',
        method: 'GET',
      }),
    }),

    getTrainingLog: builder.query({
      query: ({ id }) => ({
        url: `/workflow_modelview/api/training/log/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetTrainingJobsQuery,
  useLazyGetTrainingJobsQuery,
  useAddNewTrainingJobsMutation,
  useGetTrainingEngineQuery,
  useGetTrainingResourceQuery,
  useDeleteTrainingJobsMutation,
  useStopTrainingJobsMutation,
  useLazyGetTrainingJobParamsByIdQuery,
  useGetTrainingJobParamsByIdQuery,
  useGetTrainingLogQuery,
} = trainingJobsApi

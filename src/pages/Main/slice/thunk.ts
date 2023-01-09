import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICallback, IPagination, RootState } from 'types'
import { request } from 'utils/request'
import { errorHandle } from 'utils/utils'
import {
  ICreateGroup,
  ICreatePool,
  IDeleteGroup,
  IDeletePool,
  IGroupsListByPoolParams,
  IK8sClusters,
  IResourceGroup,
  IResourceGroupListItem,
  IResourcePool,
  IResourcePoolListItem,
  IUpdateGroup,
  IUpdatePool,
  LoginParams,
  User,
} from './types'

// export declare function createAsyncThunk1<Returned, ThunkArg = void>(
//   typePrefix: string,
//   payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {}>,
//   options?: AsyncThunkOptions<ThunkArg, {}>,
// ): AsyncThunk<Returned, ThunkArg, {}>
interface IPoolResult {
  result: IResourcePoolListItem[]
  pagination: IPagination
}
export const getPools = createAsyncThunk<
  IPoolResult,
  {
    page?: number
    pageSize?: number
    poolName?: string
    groupName?: string
  } & ICallback
>(
  'resource/getPools',

  async ({ page, pageSize, poolName, groupName, resolve }) => {
    try {
      const { result, pagination } = await request<IResourcePoolListItem[]>({
        url: '/resources/pool/list',
        method: 'GET',
        params: {
          page,
          pageSize,
          poolName,
          groupName,
        },
      })
      resolve && resolve()
      return { result, pagination }
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

// delegationPools
export const getDelegationPools = createAsyncThunk<
  IResourcePoolListItem[],
  { page?: number; pageSize?: number; poolName?: string; groupName?: string }
>(
  'resource/getDelegationPools',

  async ({ page, pageSize, poolName, groupName }) => {
    try {
      const { result } = await request<IResourcePoolListItem[]>({
        url: '/resources/pool/list',
        method: 'GET',
        params: {
          page,
          pageSize,
          poolName,
          groupName,
        },
      })
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const getK8sClusters = createAsyncThunk<IK8sClusters[]>(
  'resource/getK8sClusters',
  async () => {
    try {
      const { result } = await request<IK8sClusters[]>({
        url: '/clusters',
        method: 'GET',
      })
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const getDCUByCluster = createAsyncThunk<
  IK8sClusters,
  { clusterName?: string } & ICallback
>('resource/getDCUByCluster', async ({ clusterName, resolve }) => {
  try {
    const { result } = await request<IK8sClusters>({
      url: `/clusters/${clusterName}`,
      method: 'GET',
    })
    return result
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

export const createPool = createAsyncThunk<
  IResourcePool,
  ICreatePool & ICallback,
  { state: RootState }
>(
  'resource/createPool',
  async (
    { description, clusters, capacity, name, resolve },
    { getState, dispatch },
  ) => {
    try {
      const { result } = await request<IResourcePool>({
        url: `/resources/pool/${name}`,
        method: 'POST',
        data: {
          description,
          clusters,
          capacity,
        },
      })
      if (resolve) {
        resolve()
        dispatch(getPools({}))
        dispatch(getDelegationPools({}))
      }
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const updatePool = createAsyncThunk<
  IResourcePool,
  IUpdatePool & ICallback,
  { state: RootState }
>(
  'resource/updatePool',
  async (
    { description, clusters, capacity, name, resolve },
    { getState, dispatch },
  ) => {
    try {
      const { result } = await request<IResourcePool>({
        url: `/resources/pool/${name}`,
        method: 'PUT',
        data: {
          description,
          clusters,
          capacity,
        },
      })
      if (resolve) {
        resolve()
        dispatch(getPools({}))
      }
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const createGroup = createAsyncThunk<
  IResourcePool,
  ICreateGroup & ICallback
>(
  'resource/createGroup',
  async ({ description, capacity, clusters, name, poolName, resolve }) => {
    try {
      const { result } = await request<IResourcePool>({
        url: `/resources/group/${name}`,
        method: 'POST',
        params: {
          poolName,
        },
        data: {
          description,
          clusters,
          capacity,
        },
      })
      if (resolve) {
        resolve()
      }
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const updateGroup = createAsyncThunk<
  IResourceGroup,
  IUpdateGroup & ICallback,
  { state: RootState }
>(
  'resource/updateGroup',
  async (
    { description, clusters, poolName, capacity, name, id, type, resolve },
    { getState, dispatch },
  ) => {
    try {
      const { result } = await request<IResourceGroup>({
        url: `/resources/group/${name}`,
        method: 'PUT',
        params: {
          poolName,
        },
        data: {
          description,
          clusters,
          capacity,
        },
      })
      if (resolve) {
        resolve()
        dispatch(getPools({}))
      }
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const deletePool = createAsyncThunk<
  IResourcePool,
  IDeletePool,
  { state: RootState }
>('resource/deletePool', async ({ type, name }, { dispatch }) => {
  try {
    const { result } = await request<IResourcePool>({
      url: `/resources/${type}/${name}`,
      method: 'DELETE',
      params: {
        poolName: name,
      },
    })
    dispatch(getPools({}))
    dispatch(getDelegationPools({}))
    return result
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

type IDetail = { resource: IResourcePool }
export const getPoolDetail = createAsyncThunk<IDetail, IDeletePool & ICallback>(
  'resource/getPoolDetail',
  async ({ name, resolve }) => {
    try {
      const { result } = await request<IDetail>({
        url: `/resources/pool/${name}/detail`,
        method: 'GET',
      })
      resolve && resolve(result.resource)
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const getGroupsByPool = createAsyncThunk<
  { list: IResourceGroupListItem[]; poolName: string },
  IGroupsListByPoolParams
>('resource/getGroupsByPool', async ({ poolName, groupName }) => {
  try {
    const { result } = await request<IResourceGroupListItem[]>({
      url: '/resources/group/list',
      method: 'GET',
      params: {
        poolName,
        groupName,
      },
    })
    return { list: result, poolName }
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

export const deleteGroup = createAsyncThunk<
  IResourcePool,
  IDeleteGroup & ICallback
>('resource/deleteGroup', async ({ poolName, name, resolve }) => {
  try {
    const { result } = await request<IResourcePool>({
      url: `/resources/group/${name}`,
      method: 'DELETE',
      params: {
        poolName,
      },
    })
    resolve && resolve()
    return result
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

export const getGroupDetail = createAsyncThunk<IResourceGroup, IDeleteGroup>(
  'resource/getGroupDetail',
  async ({ name, poolName }) => {
    try {
      const { result } = await request<IResourceGroup>({
        url: `/resources/group/${name}/detail`,
        method: 'GET',
        params: {
          poolName,
        },
      })
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export const login = createAsyncThunk<User, LoginParams>(
  'app/login',
  async ({ params, resolve }) => {
    try {
      //   const { result } = await request<User>({
      const { payload: result } = await request<User>({
        url: '/login',
        method: 'POST',
        data: params,
      })
      resolve()
      return result
    } catch (error) {
      errorHandle(error)
      throw error
    }
  },
)

export interface IGetSomeSystemMetricReturn {
  [key: string]: string
}
export const getSomeSystemMetrics = createAsyncThunk<
  IGetSomeSystemMetricReturn,
  ICallback
>('app/getSomeSystemMetrics', async ({ resolve }) => {
  try {
    const { result } = await request<IGetSomeSystemMetricReturn>({
      url: '/clusters/all/details',
      method: 'GET',
    })
    resolve && resolve()
    return result
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

export interface IGetGroupsAndPoolReturn {
  GroupTotal: IResourceGroupListItem[]
  PoolTotal: number
}
export const getGroupsAndPools = createAsyncThunk<
  IGetGroupsAndPoolReturn,
  ICallback
>('app/getGroupsAndPools', async ({ resolve }) => {
  try {
    const { result } = await request<IGetGroupsAndPoolReturn>({
      url: '/resources/all/details',
      method: 'GET',
    })
    resolve && resolve()
    return result
  } catch (error) {
    errorHandle(error)
    throw error
  }
})

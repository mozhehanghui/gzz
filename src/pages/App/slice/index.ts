import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getDCUByCluster,
  getDelegationPools,
  getGroupsAndPools,
  getGroupsByPool,
  getK8sClusters,
  getPools,
  getSomeSystemMetrics,
  IGetGroupsAndPoolReturn,
  IGetSomeSystemMetricReturn,
  login,
} from './thunk'
import { User, UserState } from './types'

export const initialState: UserState = {
  username: '',
  loginLoading: false,
  collapsed: false,
  pools: [],
  poolsPagination: {},
  delegationPools: [],
  k8sClusters: [],
  systemMetrics: {} as IGetSomeSystemMetricReturn,
  PoolAndGroups: {} as IGetGroupsAndPoolReturn,
  validDCUToCreatePool: 0,
  storageMap: {},
  routeMeta: {},
}

const mainSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCollapsed(state) {
      state.collapsed = !state.collapsed
      sessionStorage.setItem('collapsed', state.collapsed ? 'true' : '') // 记录用户操作
    },
    updateUser(state, { payload }: PayloadAction<User>) {
      state.username = payload.username
    },
    updateStorage(state, { payload }: PayloadAction<User>) {
      state.storageMap = {
        ...state.storageMap,
        ...payload,
      }
    },
    updateRouteMeta(state, { payload }: PayloadAction<any>) {
      const collapsed = !!sessionStorage.getItem('collapsed')

      state.routeMeta = payload
      state.collapsed = collapsed || !!payload?.collapsed
    },
    searchResourceByPoolName(
      state,
      { payload }: PayloadAction<{ poolName: string }>,
    ) {
      if (payload.poolName === undefined) {
        state.pools = state.delegationPools
      } else {
        state.pools = state.delegationPools.filter(
          pool => pool.name === payload.poolName,
        )
      }
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, (state, action) => {
      state.loginLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false
      state.username = action.payload.username
    })

    //  list
    builder.addCase(getPools.pending, state => {})
    builder.addCase(getPools.rejected, state => {})
    builder.addCase(getPools.fulfilled, (state, action) => {
      state.pools = action.payload.result
      state.poolsPagination = action.payload.pagination
    })

    builder.addCase(getDelegationPools.pending, state => {})
    builder.addCase(getDelegationPools.rejected, state => {})
    builder.addCase(getDelegationPools.fulfilled, (state, action) => {
      state.delegationPools = action.payload
    })

    builder.addCase(getGroupsByPool.pending, state => {})
    builder.addCase(getGroupsByPool.rejected, state => {})
    builder.addCase(getGroupsByPool.fulfilled, (state, action) => {
      const { list, poolName } = action.payload
      const currentPool = state.pools.find(pool => pool.name === poolName)
      const currentDelegationPool = state.delegationPools.find(
        pool => pool.name === poolName,
      )
      if (currentPool) {
        currentPool.groups = list
      }
      if (currentDelegationPool) {
        currentDelegationPool.groups = list
      }
    })

    // k8s
    builder.addCase(getK8sClusters.pending, state => {})
    builder.addCase(getK8sClusters.rejected, state => {})
    builder.addCase(getK8sClusters.fulfilled, (state, action) => {
      state.k8sClusters = action.payload
    })
    // metrics
    builder.addCase(getSomeSystemMetrics.pending, state => {})
    builder.addCase(getSomeSystemMetrics.rejected, state => {
      state.systemMetrics = {}
    })
    builder.addCase(getSomeSystemMetrics.fulfilled, (state, action) => {
      state.systemMetrics = action.payload
    })
    // groupAndPool
    builder.addCase(getGroupsAndPools.pending, state => {})
    builder.addCase(getGroupsAndPools.rejected, state => {
      state.PoolAndGroups = {} as IGetGroupsAndPoolReturn
    })
    builder.addCase(getGroupsAndPools.fulfilled, (state, action) => {
      state.PoolAndGroups = action.payload
    })
    // getDCUByCluster
    builder.addCase(getDCUByCluster.pending, state => {})
    builder.addCase(getDCUByCluster.rejected, state => {
      state.validDCUToCreatePool = 0
    })
    builder.addCase(getDCUByCluster.fulfilled, (state, action) => {
      const { capacity, allocated } = action.payload
      if (capacity && allocated) {
        state.validDCUToCreatePool = Math.ceil(capacity - allocated)
      }
    })
  },
})

export const { actions: mainActions, reducer } = mainSlice
export default mainSlice.reducer

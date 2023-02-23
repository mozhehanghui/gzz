import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'
import { initialState } from '.'

export const userSelector = (state: RootState) => state.user || initialState
export const selectDomain = (state: RootState) => state.user || initialState

export const selectPools = createSelector([selectDomain], state => state.pools)
export const selectDelegationPools = createSelector(
  [selectDomain],
  state => state.delegationPools,
)
export const selectPoolsPagination = createSelector(
  [selectDomain],
  state => state.poolsPagination,
)
export const selectK8sClusters = createSelector(
  [selectDomain],
  state => state.k8sClusters,
)

export const selectSystemMetrics = createSelector(
  [selectDomain],
  state => state.systemMetrics,
)

export const selectGroupsAndPools = createSelector(
  [selectDomain],
  state => state.PoolAndGroups,
)

export const selectValidDCUToCreatePool = createSelector(
  [selectDomain],
  state => state.validDCUToCreatePool,
)

export const selectCollapsed = createSelector(
  [selectDomain],
  state => state.collapsed,
)

export const selectStorage = createSelector(
  [selectDomain],
  state => state.storageMap,
)

export const selectRouteMeta = createSelector(
  [selectDomain],
  state => state.routeMeta,
)

export const selectUsername = createSelector(
  [selectDomain],
  state => state.username,
)

export const selectDrawing = createSelector(
  [selectDomain],
  state => state.drawing,
)

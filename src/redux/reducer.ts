/**
 * Combine all reducers in this file and export the combined reducers.
 */
import userReduce from 'pages/Main/slice'
import { combineReducers } from '@reduxjs/toolkit'
import { InjectedReducersType } from 'utils/types/injector-typings'
import { baseQueryApi } from 'redux/services/baseQuery'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state
  }
  return combineReducers({
    ...injectedReducers,
  })
}

const appCombineReducers = {
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
  user: userReduce,
}
export default appCombineReducers

import { configureStore } from '@reduxjs/toolkit'
import { InjectedReducersType } from 'utils/types/injector-typings'
import { createReducer } from './reducer'
import { baseQueryApi } from './services/baseQuery'

export default function createConfigureStore(reducers?: InjectedReducersType) {
  const store = configureStore({
    reducer: createReducer(reducers),
    // @ts-ignore
    middleware: gDM => gDM().concat([baseQueryApi.middleware]),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
  })
  return store
}

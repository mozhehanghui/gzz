import { defaultLazyLoad } from 'utils/loadable'

export const MainPageLazy = defaultLazyLoad(
  () => import(/* webpackChunkName: "mainPage" */ './index'),
  module => module.App,
)

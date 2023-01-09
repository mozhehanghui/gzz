import { tuple } from 'types'
interface IBreadcrumb {
  name: string
  title: string
  key: string
  relativePath: string
  absolutePath: string
  routePath: string
}

// 新注册路由添加至tuple函数中；

export const IMAGEHUB = 'imageHub'
export const IMAGEMANAGE = 'imageManage'

export const breadcrumbsRegister = tuple(IMAGEHUB, IMAGEMANAGE)

export type oneOfbreadcrumbsRegister = typeof breadcrumbsRegister[number]
type IBreadcrumbs = {
  [k in oneOfbreadcrumbsRegister]: IBreadcrumb
}

const breadcrumbs: IBreadcrumbs = {
  imageHub: {
    name: 'hub',
    title: '镜像仓库',
    key: 'hub',
    absolutePath: `${window.location.origin}/#/images/hub`,
    relativePath: 'hub',
    routePath: '/images/hub',
  },
  imageManage: {
    name: 'imageManage',
    title: '镜像管理',
    key: 'imageManage',
    absolutePath: `${window.location.origin}/#/images/manage`,
    relativePath: 'manage',
    routePath: '/images/manage',
  },
}

export function generateBreadcrumbs(
  name: oneOfbreadcrumbsRegister,
): IBreadcrumb | false {
  if (!breadcrumbsRegister.includes(name)) {
    return false
  }
  return breadcrumbs[name]
}

export default breadcrumbs

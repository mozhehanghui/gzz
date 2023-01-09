import React from 'react'
import type { MenuProps } from 'antd'
import { useDispatch } from 'react-redux'

import { mainActions } from 'pages/Main/slice'
import { config, dynamicRoutes, whiteRolelist } from './config'

import { get } from 'lodash'

// import { selectUsername } from 'pages/Main/slice/selector'

export type MenuItem = Required<MenuProps>['items'][number]

/**
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const onRouteBefore = ({ pathname, meta }: any) => {
  // console.log('pathname: ', pathname)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const username = useSelector(selectUsername)

  dispatch(mainActions.updateRouteMeta(meta))
  // if (!username) {
  dispatch(
    mainActions.updateUser({
      username: localStorage.getItem('USER_NICKNAME') || '',
    }),
  )
  // }

  if (whiteRolelist.includes(pathname)) return
}

const lazy2Compont = (
  factory: () => Promise<{
    default: () => JSX.Element
  }>,
  props?: any,
) => {
  const Element = React.lazy(() => factory())

  const lazyElement = (
    <React.Suspense>
      <Element {...props} />
    </React.Suspense>
  )
  return lazyElement
}

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const generateRoutes = (routes: any) => {
  if (!routes) return routes

  return routes
    .filter((route: any) => judgeRoleAuth(route))
    .map((route: any) => {
      const { path, component, children, index, element, meta } = route

      return {
        path,
        index,
        element:
          element ??
          (component
            ? lazy2Compont(() => import(`../pages/${component}/index`), {
                meta,
              })
            : undefined),
        children: generateRoutes(children),
      }
    })
}

const generateMenus = (routes: any, parentPath = '') => {
  if (!routes) return routes

  return routes
    .filter((route: any) => !!route.name && judgeRoleAuth(route))
    .map((route: any) => {
      const { path, name, icon, children } = route
      const currentPath = [parentPath, path].filter(Boolean).join('/')
      return getItem(
        name,
        currentPath,
        <span className={icon} />,
        generateMenus(children, currentPath),
      )
    })
}

const judgeRoleAuth = (route: any) => {
  const permission = get(route, 'meta.permission')
  const USER_ROLE = localStorage.getItem('USER_ROLE')
  return permission ? permission.includes(USER_ROLE) : true
}

export const routerConfig = generateRoutes(config)
export const menuConfig = generateMenus(dynamicRoutes)

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { menuConfig } from 'routes'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Menus = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [current, setCurrent] = React.useState('/index/experience')

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    if (e.key !== '') {
      navigate(`/${e.key}`, { replace: false })
    }
  }

  useEffect(() => {
    const { pathname } = location
    if (pathname && pathname === '/') {
      setCurrent('isBreadcrumb3')
    }
  }, [location])

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      // defaultOpenKeys={['index']}
      defaultSelectedKeys={['index/experience']}
      style={{ height: '100%', userSelect: 'none' }}
      items={menuConfig}
    />
  )
}

export default Menus

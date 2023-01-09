import styled from 'styled-components'
import { WHITE, SPACE_TIMES } from 'assets/styles/styledcom/StyleConstants'
import { useSelector } from 'react-redux'
import { selectCollapsed } from 'pages/Main/slice/selector'
import React, { memo, useMemo } from 'react'
import {
  generateBreadcrumbs,
  oneOfbreadcrumbsRegister,
} from 'routes/breadcrumb'
import { Breadcrumb, Button, Space } from 'antd'
import { Link } from 'react-router-dom'

export interface IContainerDetailWrapper {
  children?: React.ReactNode
  hasNoFooter?: boolean
  onOK?: (values?: any) => void
  onReset?: (values?: any) => void
  breadcrumb?: Array<oneOfbreadcrumbsRegister>
}
const ContainerDetailWrapper: React.FC<IContainerDetailWrapper> = memo(
  ({ children, breadcrumb, hasNoFooter = false, onOK, onReset }) => {
    const collapsed = useSelector(selectCollapsed)

    const footers = useMemo(() => {
      if (!hasNoFooter) {
        return (
          <Space>
            <Button onClick={onReset}>重置</Button>
            <Button onClick={onOK} type="primary">
              提交
            </Button>
          </Space>
        )
      }
    }, [hasNoFooter, onOK, onReset])

    return (
      <>
        <div className="mb-3">
          <Breadcrumb separator=">">
            {breadcrumb ? breadcrumbs(breadcrumb) : []}
          </Breadcrumb>
        </div>
        {children}
        {!hasNoFooter && (
          <>
            <div style={{ height: '40px' }}></div>
            <Footer collapsed={collapsed}>{footers}</Footer>
          </>
        )}
      </>
    )
  },
)

export function breadcrumbs(breadcrumb: Array<oneOfbreadcrumbsRegister>) {
  return breadcrumb?.map(bc => {
    const breadcrumbObj = generateBreadcrumbs(bc)
    if (!breadcrumbObj) {
      return <Breadcrumb.Item key={bc}>{bc}</Breadcrumb.Item>
    } else {
      const { title, routePath } = breadcrumbObj
      return (
        <Breadcrumb.Item key={bc}>
          <Link to={routePath}>{title}</Link>
        </Breadcrumb.Item>
      )
    }
  })
}

interface IFooter {
  collapsed: boolean
}
const Footer = styled.footer<IFooter>`
  width: ${props =>
    props.collapsed ? 'calc(100% - 48px)' : 'calc(100% - 200px)'};
  position: fixed;
  height: ${SPACE_TIMES(16)};
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-left: 12%;
  line-height: 44px;
  background: ${WHITE};
  box-shadow: 0px -8px 12px -8px rgba(25, 70, 185, 0.1);
  transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
`

export default ContainerDetailWrapper

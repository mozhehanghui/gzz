import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { SPACE_TIMES, WHITE } from 'assets/styles/styledcom/StyleConstants'
import { selectCollapsed } from 'pages/Main/slice/selector'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
interface IContainerListWrapper {
  children?: React.ReactNode
  pagination?: PaginationProps
  hasNoPagination?: boolean
  hasNoFooter?: boolean
}
interface IWrapperPagination {
  pagination?: PaginationProps
}

function ContainerListWrapper({
  children,
  pagination,
  hasNoFooter = false,
  hasNoPagination = false,
}: IContainerListWrapper) {
  const collapsed = useSelector(selectCollapsed)
  // const paginationProps: React.ReactNode = useMemo(() => {
  //   if (!hasNoPagination && typeof pagination === 'object') {
  //     return (
  //       <>
  //         <div className="showTotal">第1-20条 / 共 101 项数据</div>
  //         <Pagination showQuickJumper {...pagination} />
  //       </>
  //     )
  //   }
  //   return []
  // }, [hasNoPagination, pagination])
  return (
    <Wrapper collapsed={collapsed}>
      {children}
      {!hasNoFooter && (
        <>
          <div style={{ height: '40px' }}></div>
          <footer>
            {!hasNoPagination && (
              <WrapperPagination pagination={pagination}></WrapperPagination>
            )}
          </footer>
        </>
      )}
    </Wrapper>
  )
}

export const WrapperPagination = React.memo(
  ({ pagination }: IWrapperPagination) => {
    const { total = 0, current = 1, pageSize = 10 } = pagination || {}
    const rangeStart = pageSize * (current - 1)
    const range = total
      ? [
          rangeStart + 1,
          rangeStart + pageSize > total ? total : rangeStart + pageSize,
        ]
      : [0, 0]

    return (
      <div className="w-full h-full flex items-center justify-between">
        <div className="showTotal">
          第{range[0]}-{range[1]}条 / 共 {total} 项数据
        </div>
        <Pagination showQuickJumper {...pagination} />
      </div>
    )
  },
)

interface IFooter {
  collapsed: boolean
}

const Wrapper = styled.div<IFooter>`
  .tool {
    text-align: right;
    background-color: ${WHITE};
    height: ${SPACE_TIMES(12)};
    line-height: ${SPACE_TIMES(12)};
    padding-right: ${SPACE_TIMES(6)};
  }
  .table {
    width: 100%;
    height: 100%;
  }

  footer {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    width: ${props =>
      props.collapsed ? 'calc(100% - 96px)' : 'calc(100% - 248px)'};
    position: fixed;
    height: ${SPACE_TIMES(16)};
    right: ${SPACE_TIMES(6)};
    bottom: 0;
    z-index: 1;
    // display: flex;
    // align-items: center;
    padding: 0 24px;
    // line-height: 44px;
    background: ${WHITE};
    box-shadow: 0px -8px 12px rgba(25, 70, 185, 0.1);
    transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    .showTotal {
      color: #666666;
    }
  }
`

export default ContainerListWrapper

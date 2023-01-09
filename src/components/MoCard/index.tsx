/**
 * 该TaiCard组件 继承了 antd Card所有功能，只是更改了原生card  body部分的padding；
 * 该组件用于 表单详情页；
 */

import styled from 'styled-components'
import { SPACE_TIMES } from 'assets/styles/styledcom/StyleConstants'
import { Card, CardProps } from 'antd'
import React, { useMemo } from 'react'
interface ITaiCard {
  title?: string | React.ReactNode
  children?: React.ReactNode
}
function TaiCard({ children, title, ...cardProps }: ITaiCard & CardProps) {
  const titleToRender = useMemo(() => {
    let titleToRender: React.ReactNode
    if (typeof title === 'string') {
      titleToRender = <div className="title">{title}</div>
    } else if (React.isValidElement(title)) {
      titleToRender = title
    } else {
      titleToRender = []
    }

    return titleToRender
  }, [title])

  return (
    <Card {...cardProps}>
      <Wrapper>
        {titleToRender}
        {children}
      </Wrapper>
    </Card>
  )
}

const Wrapper = styled.div`
  padding: 16px 48px;
  .title {
    font-size: ${SPACE_TIMES(4)};
    line-height: ${SPACE_TIMES(6)};
    margin: 0 0 ${SPACE_TIMES(5)} ${SPACE_TIMES(2)};
    font-weight: 700;
    color: #1f1f1f;
  }
`

export default TaiCard

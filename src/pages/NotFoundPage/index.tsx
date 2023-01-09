import { Button, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import noresult from 'assets/images/noresult.png'

const Noresult = () => {
  return <img src={noresult} alt="" />
}

export const NotFoundPage: React.FC = () => (
  <Result
    icon={<Noresult />}
    title="404"
    subTitle="对不起，该页面不存在"
    extra={
      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
    }
  />
)

export default NotFoundPage

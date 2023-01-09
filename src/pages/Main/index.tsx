import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, { useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Menus from './Menus'
import { Layout } from 'antd'

import { selectRouteMeta } from 'pages/Main/slice/selector'
import styled from 'styled-components'
import {
  BLUE,
  logo_text_color,
  SPACE_TIMES,
} from 'assets/styles/styledcom/StyleConstants'
import { useSelector, useDispatch } from 'react-redux'
import { mainActions } from 'pages/Main/slice'
import SiteHeader from 'components/SiteHeaders'
import { selectCollapsed } from './slice/selector'
const { Content, Sider } = Layout

export const MainPage: React.FC = () => {
  const routeMeta = useSelector(selectRouteMeta)
  const collapsed = useSelector(selectCollapsed)
  const dispatch = useDispatch()

  const setCollapsed = useCallback(
    () => dispatch(mainActions.updateCollapsed()),
    [dispatch],
  )
  return (
    <RootContainer collapsed={collapsed}>
      <SiteHeader />
      <div className="rootContainer">
        <Layout hasSider>
          <Sider
            theme="light"
            width={200}
            className="sider"
            collapsible
            trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            collapsedWidth={48}
            collapsed={collapsed}
            onCollapse={setCollapsed}
          >
            <div className="layoutSiderContent">
              {/* {!collapsed ? (
                <div className="logo">
                  <Link to="/">
                    <div className="normal">
                      <img height={32} src={logo} alt="" />
                      <span className="title">紫东太初</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="thin">
                  <Link to="/">
                    <img height={32} src={logo} alt="" />
                  </Link>
                </div>
              )} */}

              <div className="h60"></div>
              <div className="menu">
                <Menus />
              </div>
            </div>
          </Sider>
          <div className="anchor"></div>
          <Layout className="mainContent">
            <Content
              id="app-container"
              className="site-layout-background"
              style={{
                padding: routeMeta.layout === false ? 0 : 24,
                minHeight: 280,
                overflowY: 'overlay' as any,
              }}
            >
              <div className="h-14"></div>
              <div
                className="w-full"
                style={{ minHeight: 'calc(100% - 56px)' }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </RootContainer>
  )
}

export default MainPage

const RootContainer = styled.div<{ collapsed: boolean }>`
  .rootContainer {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1f1f1f;
    :global(.ant-layout-sider-trigger) {
      box-shadow: inset 0px 1px 0px #f0f0f0;
    }
    .sider {
      /* box-shadow: 8px 0px 12px rgba(25, 70, 185, 0.1); */
      box-shadow: 1px 0px 0px rgba(25, 70, 185, 0.1);

      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
    .anchor {
      width: ${props => (props.collapsed ? '48px' : '200px')};
      transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  .layoutSiderContent {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .h60 {
      height: ${SPACE_TIMES(15)};
    }
    .logo {
      flex: 0 0 auto;
      display: flex;
      height: ${SPACE_TIMES(12.5)};
      line-height: ${SPACE_TIMES(11)};
      padding-left: ${SPACE_TIMES(4)};
      margin-bottom: ${SPACE_TIMES(2)};
      color: ${BLUE};
      font-size: ${SPACE_TIMES(5)};
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      a {
        color: ${BLUE};
      }
      .title {
        color: ${logo_text_color};
        font-size: ${SPACE_TIMES(4.5)};
        margin-left: ${SPACE_TIMES(3)};

        .dot {
          margin: 0 2px;
          font-size: ${SPACE_TIMES(6)};
        }
      }
    }
    .thin {
      display: flex;
      margin: ${SPACE_TIMES(4)};
      justify-content: center;
      align-items: center;
    }
    .menu {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
`

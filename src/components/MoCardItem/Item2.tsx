import {
  BarsOutlined,
  BulbOutlined,
  FieldTimeOutlined,
  FormOutlined,
} from '@ant-design/icons'
import { Space } from 'antd'
import bg7 from 'assets/images/bg7.png'
import styled from 'styled-components'
import {
  BLUE,
  block_box_shadow,
  block_active_box_shadow,
  WHITE,
} from 'assets/styles/styledcom/StyleConstants'

export default function Item2() {
  return (
    <Unit className="unit">
      <div className="thumbnail" style={{ backgroundImage: `url(${bg7})` }}>
        <div className="linearWrapper">
          <header>
            <h3 className="title">标注任务名称标注任务名称标注任务名称</h3>
            <div className="tags">
              <Space>
                <FormOutlined />
                <BulbOutlined />
                <BarsOutlined />
              </Space>
            </div>
          </header>
          <p className="descs">
            工作流描述工作流描述工作流描述工作流描述工作流描述工作流描述工作流描述工作流描述工作流描述。。。。。
          </p>
        </div>
      </div>
      <div className="itemToolbar">
        <div className="timestamp">
          <FieldTimeOutlined />
          <span className="ml-1"> 2022/09/07 09:08:07</span>
        </div>
        <div className="user">
          <span>{'小初'}</span>
        </div>
      </div>
    </Unit>
  )
}

const Unit = styled.div`
  height: 134px;
  background-color: #fff;
  margin-bottom: 16px;
  box-shadow: ${block_box_shadow};
  cursor: pointer;
  transform: translate3d(0, 0, 0);
  transition: transform 200ms linear, box-shadow 200ms linear,
    background-size 500ms linear;
  &:hover {
    box-shadow: ${block_active_box_shadow};
  }
  .thumbnail {
    height: 100px;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms linear, box-shadow 200ms linear,
      background-size 500ms linear;
    position: relative;
    &:hover {
      background-size: 110%;
      transform: translate3d(0, -5px, 0);
      .createIcon {
        color: ${BLUE};
      }
      .createText {
        color: ${BLUE};
      }
    }
    .linearWrapper {
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.35) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }

    header {
      display: flex;
      justify-content: space-between;
      color: ${WHITE};
      padding: 4px 8px 0 8px;
      .title {
        font-size: 1.15em;
        font-weight: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: ${WHITE};
      }
    }

    .descs {
      padding: 8px 12px 24px;
      color: ${WHITE};
      font-size: 0.85em;

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .itemToolbar {
    height: 34px;
    background-color: ${WHITE};
    font-size: 12px;
    display: flex;
    padding: 0 6px 0 8px;
    justify-content: space-between;
    align-items: center;
  }
`

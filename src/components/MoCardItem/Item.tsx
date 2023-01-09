import styled from 'styled-components'
import {
  block_active_box_shadow,
  WHITE,
} from 'assets/styles/styledcom/StyleConstants'
import { ITaiItem } from './type'
import { useMemo } from 'react'

const Item: React.FC<ITaiItem> = ({
  title,
  description,
  actions,
  clickHandle,
  footers,
}) => {
  const getFooters = useMemo(() => {
    if (footers) {
      return footers
    }
    return []
  }, [footers])
  const getActions = useMemo(() => {
    if (actions) {
      return actions
    }
    return []
  }, [actions])
  return (
    <Unit
      className="unit flex flex-col cursor-pointer shadow"
      onClick={clickHandle ? clickHandle : f => f}
    >
      <div className="thumbnail">
        <header>
          <h3 className="title truncate">{title}</h3>
          <div>{getActions}</div>
        </header>
        <p className="descs truncate">{description}</p>
      </div>
      <div className="itemToolbar w-full">{getFooters}</div>
    </Unit>
  )
}

const Unit = styled.div`
  height: 134px;
  padding: 16px 16px 0 16px;
  border-radius: 4px;
  background-color: ${WHITE};
  margin-bottom: 16px;
  transform: translate3d(0, 0, 0);
  transition: transform 200ms linear, box-shadow 200ms linear,
    background-size 500ms linear;
  &:hover {
    background-image: linear-gradient(to bottom, #f0f5fb, ${WHITE});
    box-shadow: ${block_active_box_shadow};
  }
  .thumbnail {
    height: 100px;
    flex: 1;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
    transform: translate3d(0, 0, 0);
    transition: transform 200ms linear, box-shadow 200ms linear,
      background-size 500ms linear;
    border-bottom: 1px solid #d9d9d9;
    header {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 1.15em;
      }
    }
    .descs {
      font-size: 0.85em;
    }
  }
  .itemToolbar {
    height: 34px;
    color: #595959;
  }
`

export default Item

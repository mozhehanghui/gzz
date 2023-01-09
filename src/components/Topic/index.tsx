import styled from 'styled-components'
import { SPACE_TIMES, WHITE } from 'assets/styles/styledcom/StyleConstants'

interface ITopic {
  topic: string
  description: string
}

function Topic({ topic, description }: ITopic) {
  return (
    <Wrapper className="topic">
      <div className="panel">
        <div className="category">{topic}</div>
        <div className="desc">{description}</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  height: ${SPACE_TIMES(64)};
  mix-blend-mode: normal;
  border: 1px solid ${WHITE};
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f0f5fb, #ffffff);
  background-size: 800px 100%;
  background-color: #fff;
  position: relative;
  .panel {
    height: 100%;
    padding-top: ${SPACE_TIMES(17)};
    padding-left: ${SPACE_TIMES(18)};
    .category {
      font-size: ${SPACE_TIMES(6)};
      color: #1a1a1a;
      font-weight: 700;
    }
    .desc {
      font-size: 14px;
      color: #999999;
      margin-top: ${SPACE_TIMES(3)};
      width: 476px;
    }
  }
`

export default Topic

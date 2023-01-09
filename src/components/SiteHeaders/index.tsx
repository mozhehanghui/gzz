import {
  BLUE,
  FONT_SIZE_12,
  G40,
  G60,
  SPACE_TIMES,
} from 'assets/styles/styledcom/StyleConstants'
import styled from 'styled-components'

export default () => {
  return (
    <LayoutHeader>
      <div className="nav">
        <div className="logo">
          <div>Logo</div>
        </div>
      </div>
      <div className="userinfo"></div>
    </LayoutHeader>
  )
}

const LayoutHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;

  flex: 0 0 auto;
  z-index: 3;
  display: flex;
  height: ${SPACE_TIMES(13.5)};
  line-height: ${SPACE_TIMES(13.5)};
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  box-shadow: 0px 4px 12px rgba(25, 70, 185, 0.1);
  transition: left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
  .nav {
    flex: 1;
    margin-left: ${SPACE_TIMES(2)};
    .logo {
      flex: 0 0 auto;
      display: flex;
      color: ${BLUE};
      font-size: ${SPACE_TIMES(5)};
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
  }
  .userinfo {
    padding: 0 ${SPACE_TIMES(4)} 0 0;
    flex: 0 0 auto;
    display: flex;
    color: ${G40};
    justify-content: space-around;
    align-items: center;
    a {
      color: ${G60};
    }
    .username {
      font-size: ${FONT_SIZE_12};
      color: ${G60};
      font-weight: 400;
      user-select: none;
      cursor: pointer;
      span {
        margin-left: ${SPACE_TIMES(2)};
      }
    }
  }
`

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Divider, Stack } from '@mui/material'
import logo from 'assets/images/huoying.jpeg'

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'
import { useLocation, useNavigate } from 'react-router-dom'
const NavBar = memo(() => {
  const navigate = useNavigate()
  let location = useLocation()

  const [itemSelected, setItemSelected] = useState<number>(0)

  const changeRoute = useCallback(
    (path: string, index: number) => () => {
      if (path === 'preview') return
      navigate(`/${path}`)
      setItemSelected(index)
    },
    [navigate],
  )

  useEffect(() => {
    let routeIndex: number = 0

    if (location.pathname.indexOf('home') > 0) {
      routeIndex = 0
    } else if (location.pathname.indexOf('draw') > 0) {
      routeIndex = 1
    } else if (location.pathname.indexOf('preview') > 0) {
      routeIndex = -1
    }
    setItemSelected(routeIndex)
  }, [location.pathname])

  useEffect(() => {}, [])
  return (
    <Wrapper>
      <Stack spacing={2}>
        <Stack
          sx={{
            padding: '24px 24px 0 24px',
          }}
          spacing={2}
        >
          <img src={logo} alt="huoying" className="logo" />
          <Divider className="line" />
        </Stack>
        <Stack>
          {[
            { icon: <HomeOutlinedIcon className="icon" />, path: 'home' },
            { icon: <ColorLensOutlinedIcon className="icon" />, path: 'draw' },
            // { icon: <ChatBubbleOutlineIcon className="icon" />, path: 'chat' },
            {
              icon: <ChatBubbleOutlineIcon className="icon" />,
              path: 'preview',
            },
          ].map(
            (item: { icon: React.ReactNode; path: string }, index: number) => {
              return (
                <div
                  className={`tool ${itemSelected === index ? 'selected' : ''}`}
                  key={item.path}
                  onClick={changeRoute(item.path, index)}
                >
                  {item.icon}
                </div>
              )
            },
          )}
        </Stack>
      </Stack>
    </Wrapper>
  )
})

const Wrapper = styled('div')`
  box-sizing: border-box;
  position: absolute;
  width: 80px;
  height: 340px;
  left: 40px;
  top: 20vh;

  /* transform: translateY(-50%); */
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #b9cfed;
  box-shadow: 0px 229px 92px rgba(20, 97, 219, 0.01),
    0px 129px 77px rgba(20, 97, 219, 0.05),
    0px 57px 57px rgba(20, 97, 219, 0.09), 0px 14px 31px rgba(20, 97, 219, 0.1),
    0px 0px 0px rgba(20, 97, 219, 0.1);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 12px;
  /* padding: 24px; */
  .logo {
    height: 30px;
    width: 30px;
    margin-bottom: 24px;
  }

  .tool {
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .icon {
      font-size: 32px;
    }
  }
  .selected {
    /* width: 78px; */
    background-color: #fff;
    border-radius: 12px;
  }
`

export default NavBar

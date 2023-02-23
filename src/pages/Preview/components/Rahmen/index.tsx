import styled from '@emotion/styled'
import { Button, Divider, Stack, Typography } from '@mui/material'
import bg7 from 'assets/images/huoying.jpeg'
import { memo, useCallback } from 'react'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { useNavigate } from 'react-router-dom'
interface IRahmen {
  setOpenModal: () => void
  url: string
}
export const Rahmen: React.FC<IRahmen> = memo(({ setOpenModal, url }) => {
  const navigate = useNavigate()

  const goRoute = useCallback(
    (path: 'home' | 'draw') => () => {
      setOpenModal && setOpenModal()
      navigate(`/${path}`)
    },
    [navigate, setOpenModal],
  )

  return (
    <Wrapper>
      <Stack>
        <img src={url} className="img" />
        <Stack
          direction="row"
          sx={{
            height: '56px',
            width: '512px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div className="item">
            <Typography variant="button" sx={{ fontWeight: 400 }}>
              <Stack direction="row" spacing={1} onClick={goRoute('home')}>
                <HomeOutlinedIcon />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  返回首页
                </Typography>
              </Stack>
            </Typography>
          </div>
          <div className="item">
            <Typography variant="button" sx={{ fontWeight: 400 }}>
              <Stack direction="row" spacing={1} onClick={goRoute('draw')}>
                <ColorLensOutlinedIcon />
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  开始创作
                </Typography>
              </Stack>
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Wrapper>
  )
})

const Wrapper = styled('div')`
  width: 512px;
  height: 568px;
  min-width: 512px;
  min-height: 568px;
  box-sizing: border-box;
  background-color: #fff;

  .img {
    width: 512px;
    height: 512px;
    object-fit: cover;
  }
  .item {
    display: flex;
    height: 100%;
    width: 100%;
    cursor: pointer;
    user-select: none;
    justify-content: center;
    align-items: center;
    &:first-of-type {
      border-right: 1px solid #d9d9d9;
    }
  }
`
export default Rahmen

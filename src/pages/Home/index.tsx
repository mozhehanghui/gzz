import { Helmet } from 'react-helmet-async'
// @mui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import styled from 'styled-components/macro'

import MasonryImageList from './component/ImgList'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPictureList } from 'services/main'
import { useSelector } from 'react-redux'
import { selectDrawing } from 'pages/App/slice/selector'
import { uuid } from 'utils/utils'
import classNames from 'classnames'
import { Rahmen } from 'pages/Preview/components/Rahmen'
import { itemData } from './component/ImgList copy'

export interface imageItem {
  img: string
  title: string
}

export function Home() {
  const navigate = useNavigate()
  const [animationTop, setAnimationTop] = useState<number>(0)
  const [animationType, setAnimationType] = useState<boolean>(false)
  const drawingState = useSelector(selectDrawing)
  const [imageList, setImageList] = useState<imageItem[]>([])
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [curImage, setCurImage] = useState<string>('')

  const timer = useRef<any>(null)
  const changeRoute = useCallback(() => {
    navigate(`/draw`)
  }, [navigate])

  const loadPictureList = useCallback(() => {
    async function fn() {
      const data = await getPictureList()
      const { result } = data as any
      let urls = result.pictures_url.map((url: any) => {
        return {
          img: url,
          title: url,
        }
      })
      setImageList(itemData)
    }
    fn()
  }, [])

  useEffect(() => {
    loadPictureList && loadPictureList()
  }, [loadPictureList])

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    timer.current = setInterval(() => {
      if (!animationType) {
        setAnimationType(true)
      }
      let top = animationTop - 3
      setAnimationTop(top)

      if (animationTop < -2000) {
        setAnimationType(false)
        top = -20
        setAnimationTop(top)
      }
    }, 100)
    return () => {
      clearInterval(timer.current)
    }
  }, [animationTop, animationType, imageList, timer])

  const toggleOpenModal = useCallback(() => {
    setOpenModel(!openModel)
  }, [openModel])

  const setCurImageHandle = useCallback(
    (url: string) => {
      toggleOpenModal()
      setCurImage(url)
    },
    [toggleOpenModal],
  )

  return (
    <>
      {/* <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet> */}

      <Wrapper>
        <main>
          <article>
            <div className="content">
              <Stack spacing={12}>
                <Stack spacing={4}>
                  <Typography variant="h2" sx={{ fontWeight: 700 }}>
                    一级标题
                  </Typography>
                  <Stack
                    spacing={2}
                    sx={{
                      width: '440px',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                      这是第一段描述
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                      这是第二段描述
                    </Typography>
                  </Stack>
                </Stack>

                <Button
                  variant="contained"
                  size="large"
                  onClick={changeRoute}
                  sx={{
                    borderRadius: '12px',
                    width: '280px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400, padding: '6px' }}
                  >
                    Button
                  </Typography>
                </Button>
              </Stack>
            </div>
          </article>
          <aside>
            <div className="imgListWrapper">
              <Box
                sx={{ overflowY: 'scroll' }}
                className={classNames({
                  imageLists: true,
                  transitions: animationType,
                })}
                style={{ top: `${animationTop}px` }}
              >
                <MasonryImageList
                  imageList={imageList}
                  setCurImage={setCurImageHandle}
                />
              </Box>
            </div>
          </aside>
        </main>

        {drawingState ? (
          <div className="loadingStatus">
            <Fab
              variant="extended"
              sx={{ p: 1, fontSize: '12px' }}
              size="small"
              // color="primary"
              color="default"
              aria-label="add"
            >
              <CircularProgress
                size={18}
                sx={{
                  textAlign: 'center',
                  marginRight: '6px',
                }}
              />

              <Typography variant="caption">创作中...</Typography>
            </Fab>
          </div>
        ) : null}
        <Modal
          open={openModel}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Rahmen url={curImage} setOpenModal={toggleOpenModal} />
        </Modal>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: 'Exo', Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* background-color: #ebf2fa; */
  .loadingStatus {
    position: absolute;
    bottom: 16px;
    left: 16px;
  }

  .shell {
    height: 100%;
    width: 100%;
    border: 1px solid orange;
    background-color: orange;
  }

  .content {
    color: #1946b9;
    margin-left: 6rem;
    margin-top: 20vh;
  }

  main {
    flex: 1 1 0%;
    min-height: 0;
    display: flex;
    gap: 1px;
  }

  aside {
    width: 47.2vw;
    /* overflow-y: auto; */
    overflow-y: hidden;
    position: relative;

    .imgListWrapper {
      height: 100%;
      width: 100%;
      position: relative;
      mask-image: linear-gradient(
        180deg,
        transparent,
        #000 20%,
        #000 50%,
        #000 80%,
        transparent
      );

      /* padding: 0 40px; */

      .imageLists {
        width: 100%;
        padding-right: 2.8vw;
        position: absolute;

        .listWrapper {
          width: 100%;
          display: flex;
          /* justify-content: space-between; */
          gap: 2.03vh;
          .secondLine {
            margin-top: -6.94vw;
          }
        }
      }
      .transitions {
        transition: top 1.6s;
      }
    }
  }

  article {
    flex: 1 1 0%;
    min-width: 0;
    /* background-color: #ebf2fa; */
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    padding-left: 120px;
  }
`

export default Home

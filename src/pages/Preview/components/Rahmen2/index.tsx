import styled from '@emotion/styled'
import {
  Button,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import bg7 from 'assets/images/huoying.jpeg'
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import {
  IApplication,
  ICurrentRehmen,
  ImageResultProps,
  ISelectedImageType,
} from 'pages/Preview'
import ErrorIcon from '@mui/icons-material/Error'
import CloseIcon from '@mui/icons-material/Close'

import { useNavigate } from 'react-router-dom'
import CommonDialog from 'components/publicDialog'
import { updateState } from 'pages/Preview/utils'
export const Rahmen: React.FC<{
  currentRehmen: ICurrentRehmen | undefined
  setCurrentRehmen: Dispatch<SetStateAction<ICurrentRehmen>>
  imageResults: ImageResultProps[]
  applications: IApplication[]
  setImageResults: Dispatch<SetStateAction<ImageResultProps[]>>
  setApplications: Dispatch<SetStateAction<IApplication[]>>
}> = memo(
  ({
    currentRehmen,
    setCurrentRehmen,
    imageResults,
    applications,
    setImageResults,
    setApplications,
  }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const computeDisabled = useMemo(() => {
      let flag = 0
      let length = currentRehmen?.sets.length || 1

      currentRehmen?.sets.forEach((set, index: number) => {
        if (currentRehmen.type === ISelectedImageType.APPLICATION) {
          if (set.templateUrl === currentRehmen.imgurl) {
            flag = index
          }
        } else if (currentRehmen.type === ISelectedImageType.RESULT) {
          if (set.imgUrl === currentRehmen.imgurl) {
            flag = index
          }
        }
      })
      return {
        index: flag + 1,
        length,
      }
    }, [currentRehmen])

    const fn = useCallback(() => {
      if (!currentRehmen) return
      const { type, sets } = currentRehmen
      if (type === ISelectedImageType.RESULT) {
        // const { id, imgUrl } = item as ImageResultProps
        // const result = updateState(id, imageResults)
        // setCurrentRehmen({
        //   type,
        //   imgurl: imgUrl,
        //   sets: result,
        // })
        // setImageResults(result)
      } else if (type === ISelectedImageType.APPLICATION) {
        const { imgurl } = currentRehmen
        const item = sets.find((set: any) => set.templateUrl === imgurl)
        const { id, templateUrl } = item as IApplication
        const result = updateState(id, applications)
        // setCurrentRehmen({
        //   type,
        //   imgurl: templateUrl,
        //   sets: result,
        // })
        setApplications(result)
      }
    }, [applications, currentRehmen, setApplications])

    // const goNext = useCallback(
    //   (direction: 'prev' | 'next') => () => {
    //     const { index, length } = computeDisabled
    //     if (direction === 'prev' && currentRehmen) {
    //       const { type } = currentRehmen
    //       const getUrlField =
    //         type === ISelectedImageType.APPLICATION ? 'templateUrl' : 'imgUrl'
    //       setCurrentRehmen({
    //         ...currentRehmen,
    //         imgurl: currentRehmen?.sets[index - 2][getUrlField],
    //       })
    //     } else if (direction === 'next' && currentRehmen) {
    //       const { type } = currentRehmen
    //       const getUrlField =
    //         type === ISelectedImageType.APPLICATION ? 'templateUrl' : 'imgUrl'
    //       setCurrentRehmen({
    //         ...currentRehmen,
    //         imgurl: currentRehmen?.sets[index][getUrlField],
    //       })
    //     }

    //     // fn()
    //   },
    //   [computeDisabled, currentRehmen, setCurrentRehmen],
    // )

    const goNext = useCallback(
      (direction: 'prev' | 'next') => () => {
        const { index } = computeDisabled
        if (!currentRehmen) return
        const { type, sets } = currentRehmen
        let imgUrl: string = ''
        let resultSets: any = []

        if (direction === 'prev' && currentRehmen) {
          const getUrlField =
            type === ISelectedImageType.APPLICATION ? 'templateUrl' : 'imgUrl'
          imgUrl = currentRehmen?.sets[index - 2][getUrlField]
        } else if (direction === 'next' && currentRehmen) {
          const getUrlField =
            type === ISelectedImageType.APPLICATION ? 'templateUrl' : 'imgUrl'
          imgUrl = currentRehmen?.sets[index][getUrlField]
        }

        if (type === ISelectedImageType.RESULT) {
          // const { id, imgUrl } = item as ImageResultProps
          // const result = updateState(id, imageResults)
          // setCurrentRehmen({
          //   type,
          //   imgurl: imgUrl,
          //   sets: result,
          // })
          // setImageResults(result)
        } else if (type === ISelectedImageType.APPLICATION) {
          const { imgurl } = currentRehmen
          const item = sets.find((set: any) => set.templateUrl === imgurl)
          const { id } = item as IApplication
          resultSets = updateState(id, applications)
          // setCurrentRehmen({
          //   type,
          //   imgurl: templateUrl,
          //   sets: result,
          // })
          setApplications(resultSets)
        }

        setCurrentRehmen({
          ...currentRehmen,
          imgurl: imgUrl,
          sets: resultSets,
        })

        // fn()
      },
      [
        applications,
        computeDisabled,
        currentRehmen,
        setApplications,
        setCurrentRehmen,
      ],
    )

    const ArrowButton = useCallback(
      (
        node: React.ReactNode,
        direction: 'prev' | 'next',
        disabled: boolean,
      ) => {
        return (
          <Paper
            sx={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: '8px',
              color: disabled ? '#ccc' : '#000',
            }}
            onClick={disabled ? f => f : goNext(direction)}
          >
            {node}
          </Paper>
        )
      },
      [goNext],
    )

    const getShadowItem = useMemo(() => {
      const item = imageResults.find((image: ImageResultProps) => {
        return image.selected
      })
      return item
    }, [imageResults])

    const getShadowImage = useMemo(() => {
      const item = getShadowItem
      return item?.imgUrl
    }, [getShadowItem])

    const goHome = useCallback(() => {
      navigate(`/home`)
    }, [navigate])

    function downloadImageFile(link: any, picName?: any) {
      let img = new Image()
      img.setAttribute('crossOrigin', 'Anonymous')
      img.onload = function () {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d') as CanvasRenderingContext2D
        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0, img.width, img.height)
        canvas.toBlob((blob: any) => {
          let url = URL.createObjectURL(blob)
          let a = document.createElement('a')
          let event = new MouseEvent('click')
          a.download = picName || 'default.png'
          a.href = url
          a.dispatchEvent(event)
          URL.revokeObjectURL(url)
          // 内存管理,注释掉上一行,则将以 blob:http 开头的url复制到浏览器地址栏有效,否则无效.
        })
      }
      img.src = link + '?v=' + Date.now()
    }

    const downloadImage = useCallback(() => {
      const img = getShadowImage
      downloadImageFile(img, 'taichu_luoshen.png')
    }, [getShadowImage])

    const handleClose = useCallback(
      (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (reason !== 'backdropClick') {
          setOpen(false)
        }
      },
      [],
    )

    const toggleDialog = useCallback(() => {
      setOpen(!open)
    }, [open])

    const getShadowImageStyle = useMemo(() => {
      if (currentRehmen?.type === 'application') {
        let item = currentRehmen.sets.find((se: any) => se.selected)
        if (item && item.defaultShadow) {
          return item.defaultShadow
        }
      }
      return {}
    }, [currentRehmen])

    console.log('🚀 ~ file: index.tsx:72 ~ currentRehmen', currentRehmen)
    console.log(
      '🚀 ~ file: index.tsx:166 ~ getShadowImageStyle ~ getShadowImageStyle',
      getShadowImageStyle,
    )

    return (
      <>
        <CommonDialog
          handleClose={handleClose}
          open={open}
          ctitle={
            <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <ErrorIcon color="primary" />
                <Typography variant="h6">注意</Typography>
              </Stack>
              {
                <IconButton
                  aria-label="close"
                  onClick={toggleDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
            </DialogTitle>
          }
          ccontent={
            <>
              <DialogContentText>
                返回首页后当前创作不做保存；
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                可点击下载图片后继续浏览网站。
              </DialogContentText>
            </>
          }
          cfooter={
            <>
              <Button size="small" variant="outlined" onClick={toggleDialog}>
                取消
              </Button>
              <Button
                size="small"
                variant="contained"
                autoFocus
                onClick={goHome}
              >
                返回首页
              </Button>
            </>
          }
        />

        <Stack direction="row" alignItems="center" spacing={4}>
          {/* {ArrowButton(
            <ArrowBackIosNewOutlinedIcon />,
            'prev',
            computeDisabled.index === 1,
          )} */}
          <Wrapper>
            <Stack>
              <div className="imgWrapper">
                <img
                  className="shadowImage"
                  style={getShadowImageStyle}
                  src={getShadowImage}
                  alt=""
                />
                <img src={currentRehmen?.imgurl} className="img" />
              </div>

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
                    <Stack direction="row" spacing={1} onClick={toggleDialog}>
                      <HomeOutlinedIcon />
                      <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                        返回首页
                      </Typography>
                    </Stack>
                  </Typography>
                </div>
                <div className="item">
                  <Typography variant="button" sx={{ fontWeight: 400 }}>
                    <Stack direction="row" spacing={1} onClick={downloadImage}>
                      <SaveAltIcon />
                      <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                        下载图片
                      </Typography>
                    </Stack>
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Wrapper>
          {/* 
          {ArrowButton(
            <ArrowForwardIosOutlinedIcon />,
            'next',
            !(computeDisabled.index < computeDisabled.length),
          )} */}
        </Stack>
      </>
    )
  },
)

const Wrapper = styled('div')`
  width: 512px;
  height: 568px;
  min-width: 512px;
  min-height: 568px;
  box-sizing: border-box;
  background-color: #fff;

  .imgWrapper {
    width: 512px;
    height: 512px;
    position: relative;
    .shadowImage {
      position: absolute;
      z-index: 1;
      /* z-index: 3; */
    }
    .img {
      position: absolute;
      z-index: 2;
      object-fit: cover;
    }
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

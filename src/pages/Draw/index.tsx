import { Helmet } from 'react-helmet-async'
// @mui
import { useTheme } from '@mui/material/styles'
import styled from 'styled-components/macro'
import ParamsSection from './components/Panel'
import Waiting from './components/Waiting'
import { memo, useCallback, useRef, useState } from 'react'
import { createTask, loadResultImage } from 'services/main'
import moren from 'assets/images/style/moren.png'
import xieshi from 'assets/images/style/xieshi.png'
import youhua from 'assets/images/style/youhua.png'
import manhua from 'assets/images/style/manhua.png'
import shuicai from 'assets/images/style/shuicai.png'
import zhongguohua from 'assets/images/style/zhongguohua.png'
import sumiao from 'assets/images/style/sumiao.png'
import saibopengke from 'assets/images/style/saibopengke.png'
import zhengqipengke from 'assets/images/style/zhengqipengke.png'
import chahua from 'assets/images/style/chahua.png'
import dongman from 'assets/images/style/dongman.png'
import tuya from 'assets/images/style/tuya.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions } from 'pages/App/slice'
import { selectDrawing } from 'pages/App/slice/selector'
import CommonDialog from 'components/publicDialog'
import CloseIcon from '@mui/icons-material/Close'

import {
  Button,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

export interface IStyleProps {
  imgUrl: string
  selected: boolean
  templateDesc: string
  id: string
}

export interface ILabelProps {
  selected: boolean
  id: string
  label: string
}

export const Draw = memo(() => {
  const [advancedSetup, setadvancedSetup] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const [numImages, setNumImages] = useState<number>(1)
  const [scale, setScale] = useState<number>(7.5)
  const [steps, setSteps] = useState<number>(50)
  const [desc, setDesc] = useState<string>('')
  const [types, setTypes] = useState<IStyleProps[]>([
    {
      imgUrl: moren,
      selected: true,
      templateDesc: '不限',
      id: 'moren',
    },
    {
      imgUrl: xieshi,
      selected: false,
      templateDesc: 'type',
      id: 'xieshi',
    },
    {
      imgUrl: youhua,
      selected: false,
      templateDesc: 'type',
      id: 'youhua',
    },
    {
      imgUrl: manhua,
      selected: false,
      templateDesc: 'type',
      id: 'manhua',
    },
    {
      imgUrl: shuicai,
      selected: false,
      templateDesc: 'type',
      id: 'shuicai',
    },
    {
      imgUrl: zhongguohua,
      selected: false,
      templateDesc: 'type',
      id: 'zhongguohua',
    },
    {
      imgUrl: sumiao,
      selected: false,
      templateDesc: 'type',
      id: 'sumiao',
    },
    {
      imgUrl: saibopengke,
      selected: false,
      templateDesc: 'type',
      id: 'saibopengke',
    },
    {
      imgUrl: zhengqipengke,
      selected: false,
      templateDesc: 'type',
      id: 'zhengqipengke',
    },
    {
      imgUrl: chahua,
      selected: false,
      templateDesc: 'type',
      id: 'chahua',
    },
    {
      imgUrl: dongman,
      selected: false,
      templateDesc: 'type',
      id: 'dongman',
    },
    {
      imgUrl: tuya,
      selected: false,
      templateDesc: 'type',
      id: 'tuya',
    },
  ])
  const [labels, setLabels] = useState<ILabelProps[]>([
    {
      selected: true,
      id: 'gaoqing',
      label: 'label',
    },
    {
      selected: false,
      id: 'weimei',
      label: 'label',
    },
    {
      selected: false,
      id: 'langman',
      label: 'label',
    },
    {
      selected: false,
      id: 'yishu',
      label: 'label',
    },
  ])
  const navigate = useNavigate()
  let drawingState = useSelector(selectDrawing)
  const reference: any = useRef()
  reference.current = drawingState

  const getSelectItem = useCallback((array: any[]) => {
    return array.find(arr => arr.selected)
  }, [])

  const getResultImage = useCallback(
    async (id: string) => {
      const data = await loadResultImage({
        task_id: id,
      })

      const { message, result, status } = data as any
      if (result) {
        localStorage.setItem(
          'result_images_app',
          JSON.stringify({
            text: result.input_text,
            url: result.output_image_url,
          }),
        )
      }

      console.log(
        '🚀 ~ file: index.tsx:157 ~ Draw ~ drawingState',
        reference.current,
      )

      if ((status && status === 21050001) || status === 21050002) {
        setTimeout(() => {
          // 当drawing 状态正常时，继续轮训，否则打算
          reference.current && getResultImage(id)
        }, 1500)
      } else if (status && status === 21050000) {
        navigate(`/preview`)
        dispatch(mainActions.updateDrawing({ drawing: false }))
      } else {
        // 服务端异常
        dispatch(mainActions.updateDrawing({ drawing: false }))

        setOpen(true)
      }
    },
    [dispatch, navigate, reference],
  )

  const createTaskhandle = useCallback(() => {
    async function fn(params: any) {
      const data = await createTask(params)
      if (data) {
        const { message, result, status } = data as any
        let { task_id } = result as any
        console.log('🚀 ~ file: index.tsx:148 ~ fn ~ task_id', task_id)
        await getResultImage(task_id)
      }
    }

    let params: any = {
      text: desc,
      style: getSelectItem(types).templateDesc,
      label: getSelectItem(labels).label,
      num_images: numImages,
    }
    if (advancedSetup) {
      params = {
        ...params,
        scale: scale,
        steps: steps,
      }
    }
    dispatch(mainActions.updateDrawing({ drawing: true }))
    fn(params)
  }, [
    advancedSetup,
    desc,
    dispatch,
    getResultImage,
    getSelectItem,
    labels,
    numImages,
    scale,
    steps,
    types,
  ])
  const toggleDialog = useCallback(() => {
    setOpen(!open)
  }, [open])

  const goDraw = useCallback(() => {
    navigate('/draw')
    toggleDialog && toggleDialog()
  }, [navigate, toggleDialog])

  const goHome = useCallback(() => {
    navigate('/home')
    toggleDialog && toggleDialog()
  }, [navigate, toggleDialog])

  return (
    <>
      {/* <Helmet>
          <title> Dashboard | Minimal UI </title>
        </Helmet> */}

      <Wrapper>
        <main>
          <article>
            <div className="picDefault">
              <Waiting drawing={drawingState} />
            </div>
          </article>
          <aside>
            <ParamsSection
              advancedSetup={advancedSetup}
              setadvancedSetup={setadvancedSetup}
              numImages={numImages}
              setNumImages={setNumImages}
              scale={scale}
              setScale={setScale}
              steps={steps}
              setSteps={setSteps}
              desc={desc}
              setDesc={setDesc}
              labels={labels}
              setLabels={setLabels}
              setTypes={setTypes}
              types={types}
              draw={createTaskhandle}
              drawing={drawingState}
            />
          </aside>
        </main>
      </Wrapper>
      {open && (
        <CommonDialog
          handleClose={toggleDialog}
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
                作品创作失败，请重新创作试试哦。
              </DialogContentText>
            </>
          }
          cfooter={
            <>
              <Button
                size="small"
                variant="contained"
                autoFocus
                onClick={goHome}
              >
                返回首页
              </Button>
              <Button
                size="small"
                variant="contained"
                autoFocus
                onClick={goDraw}
              >
                确定
              </Button>
            </>
          }
        />
      )}
    </>
  )
})

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: 'Exo', Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 1 0%;
    min-height: 0;
    display: flex;
    gap: 1px;
  }

  aside {
    min-width: 580px;
    max-width: 580px;
    background-color: #fff;
    overflow-y: auto;
  }

  article {
    flex: 1 1 0%;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 120px;
    .picDefault {
      width: 512px;
      height: 512px;
      min-width: 512px;
      min-height: 512px;
      box-sizing: border-box;
      border: 2px dashed #595959;
      /* border: 2px dashed rgb(187, 187, 187); */
    }
  }
`

export default Draw

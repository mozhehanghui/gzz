import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Stack,
  Button,
  Typography,
  CircularProgress,
  LinearProgress,
  DialogTitle,
  DialogContentText,
  IconButton,
} from '@mui/material'

import { linearProgressClasses } from '@mui/material/LinearProgress'
import { CommonDialog } from 'components/publicDialog'
import { mainActions } from 'pages/App/slice'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'

interface IWaiting {
  drawing: boolean
}

const Waiting: React.FC<IWaiting> = ({ drawing }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const defaultText = useMemo(() => {
    return (
      <DefaultText>
        <Typography variant="body2">快来开始创作吧！</Typography>
      </DefaultText>
    )
  }, [])

  const handleClose = useCallback(
    (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      if (reason !== 'backdropClick') {
        setOpen(false)
      }
    },
    [],
  )

  const hideDialog = useCallback(() => {
    setOpen(false)
    navigate('/draw')
    // todo 改变drawing 状态， 通过服务端kill task

    dispatch(mainActions.updateDrawing({ drawing: false }))
  }, [dispatch, navigate])

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [])

  const executeBackup = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const cancelTask = useCallback(() => {
    setOpen(true)
  }, [])

  const generate = useMemo(() => {
    return (
      <Generate>
        <Stack spacing={18}>
          <Stack className="content" spacing={3}>
            <CircularProgress
              size={30}
              sx={{
                textAlign: 'center',
              }}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                }}
              >
                AI创作中，走心的作品正在路上，请耐心等待...
              </Typography>
              <Typography variant="caption">
                创作支持后台生成，如等待太久可以去其他地方看看哦
              </Typography>
            </Stack>
          </Stack>
          {/* <div className="progress">
          <BorderLinearProgress variant="determinate" value={100} />
        </div> */}

          <Stack
            spacing={2}
            direction="row"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant="outlined" size="large" onClick={cancelTask}>
              <Typography variant="button">取消创作</Typography>
            </Button>
            <Button variant="contained" size="large" onClick={executeBackup}>
              <Typography variant="button">后台生成</Typography>
            </Button>
          </Stack>
        </Stack>
      </Generate>
    )
  }, [executeBackup, cancelTask])

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
                onClick={closeDialog}
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
            <DialogContentText>取消创作后不做保存；</DialogContentText>
            <DialogContentText id="alert-dialog-description">
              点击后台生成则可继续浏览网站。
            </DialogContentText>
          </>
        }
        cfooter={
          <>
            <Button size="small" variant="outlined" onClick={hideDialog}>
              取消创作
            </Button>
            <Button
              size="small"
              variant="contained"
              autoFocus
              onClick={executeBackup}
            >
              后台生成
            </Button>
          </>
        }
      />
      {drawing ? generate : defaultText}
    </>
  )
}

const DefaultText = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  user-select: none;
`

const Generate = styled('div')`
  display: flex;
  flex-direction: column;

  .content {
    margin-top: 188px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .progress {
    width: 60%;
    margin: 24px auto;
  }
`

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}))

export default Waiting

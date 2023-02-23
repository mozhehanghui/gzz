import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'

import bg5 from 'assets/images/huoying.jpeg'

import classnames from 'classnames'
import {
  IApplication,
  ICurrentRehmen,
  ImageResultProps,
  ISelectedImageType,
} from '..'
import { updateState } from '../utils'

const ProfileSection: React.FC<{
  resultText: string
  currentRehmen: ICurrentRehmen
  imageResults: ImageResultProps[]
  applications: IApplication[]
  setImageResults: Dispatch<SetStateAction<ImageResultProps[]>>
  setApplications: Dispatch<SetStateAction<IApplication[]>>
  setCurrentRehmen: Dispatch<SetStateAction<ICurrentRehmen>>
}> = memo(
  ({
    resultText,
    currentRehmen,
    imageResults,
    applications,
    setImageResults,
    setApplications,
    setCurrentRehmen,
  }) => {
    const navigate = useNavigate()

    const currentSelected = useCallback(
      <T,>(type: ISelectedImageType, item: T) =>
        () => {
          if (type === ISelectedImageType.RESULT) {
            const { id, imgUrl } = item as ImageResultProps
            const result = updateState(id, imageResults)
            setCurrentRehmen({
              type,
              imgurl: imgUrl,
              sets: result,
            })
            setImageResults(result)
          } else if (type === ISelectedImageType.APPLICATION) {
            const { id, templateUrl } = item as IApplication
            const result = updateState(id, applications)
            setCurrentRehmen({
              type,
              imgurl: templateUrl,
              sets: result,
            })
            setApplications(result)
          }
        },
      [
        applications,
        imageResults,
        setApplications,
        setCurrentRehmen,
        setImageResults,
      ],
    )

    const getShadowImage = useMemo(() => {
      const item = imageResults.find((image: ImageResultProps) => {
        return image.selected
      })
      return item?.imgUrl
    }, [imageResults])

    const getApplications = useCallback(
      (apps: IApplication[]) => {
        return apps.map((image: IApplication) => {
          const { templateUrl, selected, templateDesc, smallShadow } = image
          const classNames = classnames({ selected, 'padding-4': true })
          return (
            <span key={templateDesc}>
              <Stack
                className={classNames}
                alignItems="center"
                onClick={currentSelected<IApplication>(
                  ISelectedImageType.APPLICATION,
                  image,
                )}
              >
                <div className="imgContainer">
                  <img className="pureImg" src={templateUrl} alt="" />
                  <img
                    className="shadowImg"
                    style={smallShadow}
                    src={getShadowImage}
                    alt=""
                  />
                </div>

                <Typography fontSize={14}>{templateDesc}</Typography>
              </Stack>
            </span>
          )
        })
      },
      [currentSelected, getShadowImage],
    )

    const toDraw = useCallback(() => {
      navigate('/draw')
    }, [navigate])

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack>
          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                描述
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                {resultText}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                选项一
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                512*512
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400, pl: 2 }}>
                result
              </Typography>
              <Zoom>
                {imageResults.map((image: ImageResultProps) => {
                  const { selected, imgDesc, imgUrl } = image
                  const classNames = classnames({ selected, 'padding-4': true })
                  return (
                    <span key={imgDesc}>
                      <Stack
                        className={classNames}
                        onClick={currentSelected<ImageResultProps>(
                          ISelectedImageType.RESULT,
                          image,
                        )}
                        alignItems="center"
                      >
                        <img src={imgUrl} alt="" />
                        <Typography fontSize={14}>{imgDesc}</Typography>
                      </Stack>
                    </span>
                  )
                })}
              </Zoom>
            </Stack>
          </Box>

          <Box sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400, pl: 2 }}>
                场景
              </Typography>
              <Stack spacing={2}>
                <Zoom>{getApplications(applications.slice(0, 3))}</Zoom>
                <Zoom>{getApplications(applications.slice(3))}</Zoom>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Stack>
          <Divider />
          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack direction="row" spacing={4}>
              {/* <Button
              variant="outlined"
              size="large"
              style={{
                width: '100%',
              }}
            >
              <Typography variant="button" sx={{ fontWeight: 400 }}>
                修改描述
              </Typography>
            </Button> */}
              <Button
                variant="contained"
                onClick={toDraw}
                size="large"
                style={{
                  width: '100%',
                }}
              >
                <Typography variant="button" sx={{ fontWeight: 400 }}>
                  button
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Stack>
      </div>
    )
  },
)

const Zoom = styled('div')`
  display: flex;
  /* color: #fff; */
  /* span {
    display: inline-flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-decoration: none;
  } */

  span {
    flex: 1;
    padding-left: 14px;
    gap: 4px;
    min-width: 0;
    /* align-items: center; */
    align-items: flex-start;

    display: inline-flex;
    text-decoration: none;
    flex-direction: column;
    justify-content: center;
  }

  .selected {
    background-color: #1946b9;
    /* background-image: url(${bg5}); */

    color: #fff;
    border-radius: 12px;
  }

  .padding-4 {
    padding: 4px;
  }

  .imgContainer {
    width: 144px;
    height: 144px;
    border-radius: 12px;
    position: relative;
  }

  img {
    width: 144px;
    height: 144px;
    border-radius: 12px;
    object-fit: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .pureImg {
    position: absolute;
    z-index: 2;
  }

  .shadowImg {
    position: absolute;
    z-index: 1;
    /* z-index: 3; */
  }
`

export default ProfileSection

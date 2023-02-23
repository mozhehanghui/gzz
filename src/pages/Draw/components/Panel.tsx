import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme, styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'

import bg5 from 'assets/images/huoying.jpeg'
import classnames from 'classnames'
import { ILabelProps, IStyleProps } from '..'
import { SlideButtonGroup } from './SlideButtonGroup'

interface IParamsSection {
  desc: string
  drawing: boolean
  draw: () => void
  types: IStyleProps[]
  labels: ILabelProps[]
  setDesc: Dispatch<SetStateAction<string>>
  setLabels: Dispatch<SetStateAction<ILabelProps[]>>
  setTypes: Dispatch<SetStateAction<IStyleProps[]>>
  numImages: number
  setNumImages: Dispatch<SetStateAction<number>>
  scale: number
  setScale: Dispatch<SetStateAction<number>>
  steps: number
  setSteps: Dispatch<SetStateAction<number>>
  advancedSetup: boolean
  setadvancedSetup: Dispatch<SetStateAction<boolean>>
}

export interface IDefaultDesc {
  label: string
}
const defaultDesc: IDefaultDesc[] = [
  { label: 'desc1' },
  { label: 'desc2' },
  { label: 'desc3' },
  { label: 'desc4' },
]

export const ParamsSection: React.FC<IParamsSection> = memo(
  ({
    draw,
    drawing,
    types,
    setTypes,
    setDesc,
    labels,
    desc,
    setLabels,
    numImages,
    setNumImages,
    advancedSetup,
    setadvancedSetup,
    scale,
    setScale,
    steps,
    setSteps,
  }) => {
    const updateState = useCallback(
      <T extends { id: string; selected: boolean }>(
        id: string,
        apps: T[],
        setState: Dispatch<SetStateAction<T[]>>,
      ) => {
        const results = apps.map(app => {
          if (app.id === id) {
            return {
              ...app,
              selected: true,
            }
          } else {
            return {
              ...app,
              selected: false,
            }
          }
        })

        if (results && results.length) {
          setState(results)
        }
      },
      [],
    )

    const currentSelected = useCallback(
      <T,>(item: T) =>
        () => {
          const { id } = item as IStyleProps
          updateState(id, types, setTypes)
        },
      [setTypes, types, updateState],
    )

    const getStyles = useCallback(
      (apps: IStyleProps[]) => {
        return apps.map((image: IStyleProps) => {
          const { imgUrl, selected, templateDesc, id } = image
          const classNames = classnames({ selected, 'padding-2': true })
          return (
            <span key={templateDesc}>
              <Stack
                className={classNames}
                alignItems="center"
                onClick={currentSelected<IStyleProps>(image)}
              >
                <img src={imgUrl} alt="" />
                <Typography fontSize={14}>{templateDesc}</Typography>
              </Stack>
            </span>
          )
        })
      },
      [currentSelected],
    )

    const selectLabel = useCallback(
      (id: string) => () => {
        const newlabels = labels.map((label: ILabelProps) => {
          if (label.id === id) {
            return {
              ...label,
              selected: true,
            }
          } else {
            return {
              ...label,
              selected: false,
            }
          }
        })
        setLabels(newlabels)
      },
      [labels, setLabels],
    )

    const setDescHandle = useCallback(
      (event: any) => {
        const val = event?.target?.value
        setDesc(val ? val : '')
      },
      [setDesc],
    )

    const setDefaultDesc = useCallback(
      (val: string) => () => {
        setDesc(val ? val : '')
      },
      [setDesc],
    )

    const changeAdvanceSetup = useCallback(() => {
      setadvancedSetup(!advancedSetup)
    }, [advancedSetup, setadvancedSetup])

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

              <TextField
                color="primary"
                id="outlined-multiline-static"
                multiline
                onChange={setDescHandle}
                value={desc}
                rows={6}
                placeholder="请描述想生成的画面，描述越准确画面越清晰哦！"
                focused
              />

              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  可以试试：
                </Typography>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {defaultDesc.map((desc: IDefaultDesc) => {
                    return (
                      <Typography
                        key={desc.label}
                        variant="subtitle2"
                        onClick={setDefaultDesc(desc.label)}
                        sx={{ fontWeight: 400 }}
                      >
                        {desc.label}
                      </Typography>
                    )
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                图像标签
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                {labels.map((label: ILabelProps) => {
                  return label.selected ? (
                    <Button
                      onClick={selectLabel(label.id)}
                      key={label.id}
                      variant="contained"
                      size="small"
                    >
                      {label.label}
                    </Button>
                  ) : (
                    <Button
                      onClick={selectLabel(label.id)}
                      key={label.id}
                      variant="outlined"
                      size="small"
                    >
                      {label.label}
                    </Button>
                  )
                })}
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400, pl: 2 }}>
                选择风格
              </Typography>
              <Stack spacing={2}>
                <Zoom>{getStyles(types.slice(0, 6))}</Zoom>
                <Zoom>{getStyles(types.slice(6))}</Zoom>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                图片尺寸
              </Typography>

              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="512*512"
                />
              </RadioGroup>
            </Stack>
          </Box>

          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                图片数量
              </Typography>
              <SlideButtonGroup
                val={numImages}
                setValue={setNumImages}
                aria-label="Custom marks"
                defaultValue={1}
                getAriaValueText={(value: number) => {
                  return `${value}`
                }}
                step={1}
                valueLabelDisplay="auto"
                marks={[
                  {
                    value: 1,
                    label: '1',
                  },
                  {
                    value: 2,
                    label: '2',
                  },
                  {
                    value: 3,
                    label: '3',
                  },
                ]}
                max={3}
                min={1}
              />
            </Stack>
          </Box>

          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 0 }}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                高级设置
              </Typography>

              <FormControlLabel
                label=""
                control={
                  <Switch
                    checked={advancedSetup}
                    onChange={changeAdvanceSetup}
                  />
                }
              />
            </Stack>
          </Box>

          {advancedSetup && (
            <>
              <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                    选项一
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#595959' }}>
                    这是选项一描述
                  </Typography>
                </Stack>

                <SlideButtonGroup
                  aria-label="Custom marks"
                  val={scale}
                  setValue={setScale}
                  defaultValue={7.5}
                  min={7.5}
                  max={10.0}
                  getAriaValueText={(value: number) => {
                    return `${value}`
                  }}
                  step={0.5}
                  valueLabelDisplay="auto"
                  marks={[
                    {
                      value: 7.5,
                      label: '7.5',
                    },
                    {
                      value: 8.0,
                      label: '8.0',
                    },
                    {
                      value: 8.5,
                      label: '8.5',
                    },
                    {
                      value: 9.0,
                      label: '9.0',
                    },
                    {
                      value: 9.5,
                      label: '9.5',
                    },
                    {
                      value: 10.0,
                      label: '10.0',
                    },
                  ]}
                />
              </Box>
              <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                    选项二
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#595959' }}>
                    这是选项二描述
                  </Typography>
                </Stack>

                <SlideButtonGroup
                  val={steps}
                  setValue={setSteps}
                  aria-label="Custom marks"
                  defaultValue={50}
                  min={50}
                  max={100}
                  getAriaValueText={(value: number) => {
                    return `${value}`
                  }}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    {
                      value: 50,
                      label: '50',
                    },
                    {
                      value: 60,
                      label: '60',
                    },
                    {
                      value: 70,
                      label: '70',
                    },
                    {
                      value: 80,
                      label: '80',
                    },
                    {
                      value: 90,
                      label: '90',
                    },
                    {
                      value: 100,
                      label: '100',
                    },
                  ]}
                />
              </Box>
            </>
          )}
        </Stack>

        <Stack>
          <Divider />
          <Box sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
            <Button
              disabled={drawing}
              variant="contained"
              size="large"
              style={{
                width: '100%',
              }}
              onClick={draw}
            >
              <Typography variant="button" sx={{ fontWeight: 400 }}>
                button
              </Typography>
            </Button>
          </Box>
        </Stack>
      </div>
    )
  },
)

const Zoom = styled('div')`
  display: flex;
  /* color: #fff; */
  span {
    display: inline-flex;
    flex-direction: column;
    flex: 1;

    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-decoration: none;
    cursor: pointer;
  }

  .selected {
    background-color: #1946b9;
    /* background-image: url(${bg5}); */

    color: #fff;
    border-radius: 12px;
  }
  .padding-2 {
    padding: 2px;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    object-fit: cover;
    background-size: cover;
    background-repeat: no-repeat;
  }
`

export default ParamsSection

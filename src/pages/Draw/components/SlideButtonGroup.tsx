import { Button, Slider, SliderProps, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Dispatch, memo, SetStateAction, useCallback } from 'react'
interface ISlideButtonGroupProps {
  val: number
  setValue?: Dispatch<SetStateAction<number>>
}
export const SlideButtonGroup: React.FC<SliderProps & ISlideButtonGroupProps> =
  memo(props => {
    const { max, min, val, setValue, step } = props
    const toggle = useCallback(
      (type: 'minus' | 'add') => () => {
        if (step) {
          const result = type === 'add' ? val + step : val - step
          setValue && setValue(result)
        }
      },
      [setValue, step, val],
    )
    const isComputeAbled = useCallback(
      (type: 'minus' | 'add') => {
        if (max && min) {
          return type === 'add' ? val < max : val > min
        }
        return false
      },
      [max, min, val],
    )
    const sliderChange = useCallback(
      (val: any) => {
        let value = val.target.value
        if (typeof value === 'number') {
          setValue && setValue(value as number)
        }
      },
      [setValue],
    )
    return (
      <Stack spacing={4} direction="row">
        <Slider {...props} value={val} onChange={sliderChange} />
        <Stack direction="row" spacing={0.5} alignItems="center">
          {isComputeAbled('minus') ? (
            <Button variant="outlined" size="medium" onClick={toggle('minus')}>
              <RemoveIcon fontSize="medium" />
            </Button>
          ) : (
            <Button variant="outlined" size="medium">
              <RemoveIcon fontSize="medium" />
            </Button>
          )}

          <TextField
            value={val}
            id="demo-helper-text-misaligned-no-helper"
            size="small"
          />

          {isComputeAbled('add') ? (
            <Button variant="contained" size="medium" onClick={toggle('add')}>
              <AddIcon fontSize="medium" />
            </Button>
          ) : (
            <Button variant="contained" size="medium">
              <AddIcon fontSize="medium" />
            </Button>
          )}
        </Stack>
      </Stack>
    )
  })

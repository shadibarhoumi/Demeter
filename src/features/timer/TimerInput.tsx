import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@d/store'
import { setTargetDuration, TimerStatus } from './timerSlice'

export const TimerInput = () => {
  const dispatch = useDispatch()
  const targetDuration = useSelector((state: RootState) => state.timer.targetDuration)
  const status = useSelector((state: RootState) => state.timer.status)
  const minutesRemaining = targetDuration ? targetDuration / 60 : 0
  if (status !== TimerStatus.STOPPED) return null
  return (
    <>
      <Slider
        colorScheme="teal"
        flex="1"
        step={5}
        defaultValue={minutesRemaining}
        value={minutesRemaining}
        min={0.05}
        max={45}
        maxWidth="250px"
        focusThumbOnChange={false}
        onChange={(valueAsNumber: number) => {
          dispatch(setTargetDuration(valueAsNumber * 60))
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={minutesRemaining} />
      </Slider>
    </>
  )
}

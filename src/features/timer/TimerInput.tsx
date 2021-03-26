import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { setTargetDuration, TimerStatus } from './timerSlice'
import { useDispatch } from 'react-redux'
import { useTimer } from './useTimer'

export const TimerInput = () => {
  const dispatch = useDispatch()
  const { status, targetDuration } = useTimer()
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

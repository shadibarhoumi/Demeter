import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { TimerStatus } from './useTimer'

interface Props {
  status: TimerStatus
  targetDuration: number
  setTargetDuration: (duration: number) => void
}

export const TimerInput = ({ status, targetDuration, setTargetDuration }: Props) => {
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
          setTargetDuration(valueAsNumber * 60)
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

import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'

type SecondsSetter = React.Dispatch<React.SetStateAction<number | undefined>>

export const TimeInput = ({
  secondsRemaining,
  setSecondsRemaining,
}: {
  secondsRemaining: number | undefined
  setSecondsRemaining: SecondsSetter
}) => {
  const minutesRemaining = secondsRemaining ? secondsRemaining / 60 : 0
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
          setSecondsRemaining(valueAsNumber * 60)
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

import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const formatTimeForDisplay = (time: number) =>
  time.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

type SecondsSetter = React.Dispatch<React.SetStateAction<number | undefined>>

export const TimeDisplay = ({
  secondsRemaining = 0,
  setSecondsRemaining,
  running,
  stopped,
  description,
}: {
  secondsRemaining: number | undefined
  setSecondsRemaining: SecondsSetter
  running: boolean
  stopped: boolean
  description: string
}) => {
  const minutesDisplay = formatTimeForDisplay(Math.floor(secondsRemaining / 60))
  const secondsDisplay = formatTimeForDisplay(secondsRemaining % 60)
  const cancelTimer = React.useRef<() => void>()
  React.useEffect(() => {
    if (running) {
      const timer = setInterval(
        () => setSecondsRemaining((previousValue: number | undefined) => (previousValue ? previousValue - 1 : 0)),
        1000,
      )
      cancelTimer.current = () => clearInterval(timer)
      return cancelTimer.current
    } else {
      if (cancelTimer.current) {
        cancelTimer.current()
      }
    }
  }, [secondsRemaining, running])

  return (
    <Box width="240px" display="flex" flexDirection="column">
      {!stopped && secondsRemaining ? <Text>Working on: {description}</Text> : null}
      <Text fontSize="90px" color={!running && secondsRemaining === 0 ? 'green' : 'teal.500'}>
        {minutesDisplay}&#58;{secondsDisplay}
      </Text>
    </Box>
  )
}

import React from 'react'
import { TimerStatus } from './useTimer'
import { Box, Text } from '@chakra-ui/react'

const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

const Time = ({ seconds, status }: { seconds: number; status: TimerStatus }) => {
  const minutesDisplay = formatTime(Math.floor(seconds / 60))
  const secondsDisplay = formatTime(seconds % 60)
  return (
    <Text fontSize="90px" width="240px" color={status === TimerStatus.COMPLETE ? 'green' : 'teal.500'}>
      <span>{minutesDisplay}</span>
      <span>&#58;{secondsDisplay}</span>
    </Text>
  )
}

interface Props {
  status: TimerStatus
  secondsRemaining: number
  targetDuration: number
  description: string
}

export const TimerDisplay = ({ status, secondsRemaining, targetDuration, description }: Props) => {
  return (
    <>
      <Box width="240px" display="flex" flexDirection="column">
        {(status === TimerStatus.RUNNING || status === TimerStatus.PAUSED) && description ? (
          <Text>Working on: {description}</Text>
        ) : status === TimerStatus.COMPLETE ? (
          <Text color="green">Bam! Another interval complete!</Text>
        ) : null}
      </Box>
      <Time seconds={status === TimerStatus.STOPPED ? targetDuration : secondsRemaining} status={status} />
    </>
  )
}

import React from 'react'
import { TimerStatus } from './timerSlice'
import { Box, Text } from '@chakra-ui/react'
import { useTimer } from './useTimer'

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
      {minutesDisplay}&#58;{secondsDisplay}
    </Text>
  )
}

export const TimerDisplay = () => {
  const { status, secondsRemaining, targetDuration, description } = useTimer()
  console.log('🚀 ~ file: TimerDisplay.tsx ~ line 24 ~ TimerDisplay ~ status', status)
  // if (typeof window === 'undefined') return <p>Loading Display...</p>

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

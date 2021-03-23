import React from 'react'
import { useSelector } from 'react-redux'
import { TimerStatus } from './timerSlice'
import { Box, Text } from '@chakra-ui/react'
import type { RootState } from '@d/store'

const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

const Time = ({ seconds }: { seconds: number }) => {
  const minutesDisplay = formatTime(Math.floor(seconds / 60))
  const secondsDisplay = formatTime(seconds % 60)
  return (
    <Text fontSize="90px" width="240px" color={status === TimerStatus.COMPLETE ? 'green' : 'teal.500'}>
      {minutesDisplay}&#58;{secondsDisplay}
    </Text>
  )
}

export const TimerDisplay = () => {
  const secondsRemaining = useSelector((state: RootState) => state.timer.secondsRemaining)
  const status = useSelector((state: RootState) => state.timer.status)
  const targetDuration = useSelector((state: RootState) => state.timer.targetDuration)
  const description = useSelector((state: RootState) => state.timer.description)

  if (typeof window === 'undefined') return <p>Loading Display...</p>

  return (
    <>
      <Box width="240px" display="flex" flexDirection="column">
        {(status === TimerStatus.RUNNING || status === TimerStatus.PAUSED) && description ? (
          <Text>Working on: {description}</Text>
        ) : status === TimerStatus.COMPLETE ? (
          <Text color="green">Bam! Another interval complete!</Text>
        ) : null}
      </Box>
      <Time seconds={status === TimerStatus.STOPPED ? targetDuration : secondsRemaining} />
    </>
  )
}

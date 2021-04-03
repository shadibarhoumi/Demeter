import React from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { Box, Text } from '@chakra-ui/react'

const { RUNNING, PAUSED, STOPPED } = TimerStatus

const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

const Time = ({ seconds, status }: { seconds: number; status: TimerStatus }) => {
  const minutesDisplay = formatTime(Math.floor(seconds / 60))
  const secondsDisplay = formatTime(seconds % 60)
  return (
    <Text
      fontSize={status === RUNNING || status === PAUSED ? '120px' : '95px'}
      color="hsl(216deg 15% 30%)"
      fontWeight={500}
    >
      <span>{minutesDisplay}</span>
      <span>&#58;</span>
      <span>{secondsDisplay}</span>
    </Text>
  )
}

export const TimerDisplay = () => {
  const { status, secondsRemaining, targetDuration, description } = useTimer()
  return <Time seconds={status === STOPPED ? targetDuration : secondsRemaining} status={status} />
}

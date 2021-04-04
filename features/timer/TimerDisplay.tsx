import React from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { Text } from '@chakra-ui/react'
import { getTimeDisplay } from '@lib/util'

const { RUNNING, PAUSED, STOPPED } = TimerStatus

const Time = ({ secondsRemaining, status }: { secondsRemaining: number; status: TimerStatus }) => {
  const { minutes, seconds } = getTimeDisplay(secondsRemaining)
  return (
    <Text
      fontSize={status === RUNNING || status === PAUSED ? '120px' : '95px'}
      color="hsl(216deg 15% 30%)"
      fontWeight={500}
      transition="font-size 100ms"
    >
      <span>{minutes}</span>
      <span>&#58;</span>
      <span>{seconds}</span>
    </Text>
  )
}

export const TimerDisplay = () => {
  const { status, secondsRemaining, targetDuration } = useTimer()
  return <Time secondsRemaining={status === STOPPED ? targetDuration : secondsRemaining} status={status} />
}

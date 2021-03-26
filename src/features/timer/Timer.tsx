import React from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { TimerStatus, setTimerStatus, decrementTimer } from './timerSlice'
import { useDispatch } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { useTimer } from './useTimer'

export const Timer = () => {
  const dispatch = useDispatch()
  const { status, secondsRemaining } = useTimer()
  React.useEffect(() => {
    let timer: number | undefined
    if (status === TimerStatus.RUNNING) {
      timer = window.setInterval(() => dispatch(decrementTimer()), 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [status])

  React.useEffect(() => {
    if (status === TimerStatus.RUNNING && secondsRemaining <= 0) {
      dispatch(setTimerStatus(TimerStatus.COMPLETE))
    }
  }, [secondsRemaining, status])

  return (
    <>
      <Flex alignItems="center" flexDirection="column">
        <TimerDisplay />
        <TimerInput />
        <TimerButtons />
      </Flex>
    </>
  )
}

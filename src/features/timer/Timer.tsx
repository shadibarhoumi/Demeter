import React from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { TimerStatus, decrementTimer, setTimerStatus } from './timerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@d/store'
import { Flex } from '@chakra-ui/react'

export const Timer = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: RootState) => state.timer.status)
  const secondsRemaining = useSelector((state: RootState) => state.timer.secondsRemaining)

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

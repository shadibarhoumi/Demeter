import React from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { TimerStatus, decrementTimer, setTimerStatus, setTargetDuration } from './timerSlice'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '@d/store'
import { Flex } from '@chakra-ui/react'

export const Timer = () => {
  const dispatch = useDispatch()
  const { status, secondsRemaining, targetDuration, description } = useSelector(
    (state: RootState) => ({
      status: state.timer.status,
      secondsRemaining: state.timer.secondsRemaining,
      targetDuration: state.timer.targetDuration,
      description: state.timer.description,
    }),
    shallowEqual,
  )

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
        <TimerDisplay
          status={status}
          secondsRemaining={secondsRemaining}
          targetDuration={targetDuration}
          description={description}
        />
        <TimerInput status={status} targetDuration={targetDuration} />
        <TimerButtons
          status={status}
          secondsRemaining={secondsRemaining}
          targetDuration={targetDuration}
          description={description}
        />
      </Flex>
    </>
  )
}

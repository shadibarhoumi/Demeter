import React from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { Flex } from '@chakra-ui/react'
import { useTimer, TimerStatus } from './useTimer'

export const Timer = () => {
  const {
    status,
    setStatus,
    secondsRemaining,
    setSecondsRemaining,
    targetDuration,
    setTargetDuration,
    description,
    setDescription,
    decrement,
  } = useTimer()

  React.useEffect(() => {
    let timer: number | undefined
    if (status === TimerStatus.RUNNING) {
      timer = window.setInterval(decrement, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [status])

  React.useEffect(() => {
    if (status === TimerStatus.RUNNING && secondsRemaining <= 0) {
      setStatus(TimerStatus.COMPLETE)
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
        <TimerInput status={status} targetDuration={targetDuration} setTargetDuration={setTargetDuration} />
        <TimerButtons
          status={status}
          secondsRemaining={secondsRemaining}
          targetDuration={targetDuration}
          description={description}
          setSecondsRemaining={setSecondsRemaining}
          setStatus={setStatus}
          setDescription={setDescription}
        />
      </Flex>
    </>
  )
}

import { useContext, useEffect, useRef, useState } from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { Flex } from '@chakra-ui/react'
import { TimerStatus, useTimer } from './useTimer'
import { usePrevious } from '@lib/hooks'
import { firestore } from '@lib/firebase'
import { UserContext } from '@lib/context'
import { IntervalInput } from '@models/Interval'
import type firebase from 'firebase/app'

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
  } = useTimer()

  const { RUNNING, PAUSED, STOPPED, COMPLETE } = TimerStatus
  const previousStatus = usePrevious<TimerStatus>(status)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const updateInterval = async () => {
      const currentIntervalRef = firestore.collection('currentIntervals').doc(user?.uid)
      // when status changes from stopped to running, create an interval
      if (previousStatus === STOPPED && status === RUNNING) {
        // const intervalsRef = firestore.collection('users').doc(user?.uid).collection('intervals')
        const newInterval: IntervalInput = {
          status,
          description,
          targetDuration,
          secondsRemaining,
          startedAt: Date.now(),
          endedAt: null,
        }
        await currentIntervalRef.set(newInterval)
      } else if ((previousStatus === RUNNING || previousStatus === PAUSED) && status === STOPPED) {
        currentIntervalRef.delete()
      } else {
        await currentIntervalRef.update({ status })
      }
      // when status changes from running / paused to stopped, end the interval
    }
    updateInterval()
  }, [status])

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

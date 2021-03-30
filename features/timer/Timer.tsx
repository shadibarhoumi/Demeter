import { useContext, useEffect, useState } from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { Flex } from '@chakra-ui/react'
import { TimerStatus, useTimer, useCountdown } from './useTimer'
import { firestore } from '@lib/firebase'
import { useUserData } from '@lib/hooks'
import { IntervalInput } from '@models/Interval'

export const Timer = () => {
  const { setStatus, setSecondsRemaining, setTargetDuration, setDescription, setStartedAt } = useTimer()
  useCountdown()
  const [loading, setLoading] = useState(true)
  const { RUNNING, COMPLETE } = TimerStatus
  const { user } = useUserData()

  // fetch currentInterval, if exists, after first render
  useEffect(() => {
    const fetchCurrentInterval = async () => {
      const currentIntervalRef = firestore.collection('currentIntervals').doc(user?.uid)
      const currentIntervalDoc = await currentIntervalRef.get()
      if (currentIntervalDoc.exists) {
        const {
          status,
          description,
          targetDuration,
          secondsRemaining,
          startedAt,
        } = currentIntervalDoc.data() as IntervalInput
        setDescription(description)
        setTargetDuration(targetDuration)
        setStatus(status)
        setStartedAt(startedAt)
        // if timer has been running, update seconds remaining
        if (status === RUNNING) {
          const timeElapsed = Math.floor((Date.now() - startedAt) / 1000)
          const updatedSecondsRemaining = secondsRemaining - timeElapsed
          if (updatedSecondsRemaining > 0) {
            // fast-forward running interval
            setSecondsRemaining(updatedSecondsRemaining)
            currentIntervalRef.update({ secondsRemaining: updatedSecondsRemaining })
          } else {
            // complete interval
            setSecondsRemaining(0)
            setStatus(COMPLETE)
            currentIntervalRef.update({
              secondsRemaining: updatedSecondsRemaining,
              status: COMPLETE,
              endedAt: startedAt + secondsRemaining * 1000,
            })
          }
        } else {
          // regular read of secondsRemaining from db
          setSecondsRemaining(secondsRemaining)
        }
      }
      setLoading(false)
    }
    fetchCurrentInterval()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

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

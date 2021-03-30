import { useContext, useEffect, useState } from 'react'
import { TimerDisplay } from './TimerDisplay'
import { TimerInput } from './TimerInput'
import { TimerButtons } from './TimerButtons'
import { Flex } from '@chakra-ui/react'
import { TimerStatus, useTimer } from './useTimer'
import { firestore } from '@lib/firebase'
import { UserContext } from '@lib/context'
import { IntervalInput } from '@models/Interval'

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
  const [loading, setLoading] = useState(true)
  const [startedAt, setStartedAt] = useState<number>(Date.now())
  const { RUNNING, COMPLETE } = TimerStatus
  const { user } = useContext(UserContext)

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

  const createInterval = async ({
    status,
    description,
    targetDuration,
    secondsRemaining,
  }: Pick<IntervalInput, 'status' | 'description' | 'targetDuration' | 'secondsRemaining'>) => {
    const currentIntervalRef = firestore.collection('currentIntervals').doc(user?.uid)
    // when status changes from stopped to running, create an interval
    // save time that timer started
    const startedNow = Date.now()
    setStartedAt(startedNow)
    const newInterval: IntervalInput = {
      status,
      description,
      targetDuration,
      secondsRemaining,
      startedAt: startedNow,
      endedAt: null,
    }
    await currentIntervalRef.set(newInterval)
  }

  const saveAndDeleteInterval = async ({
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
  }: {
    status: TimerStatus
    description: string
    targetDuration: number
    secondsRemaining: number
    startedAt: number
  }) => {
    const currentIntervalRef = firestore.collection('currentIntervals').doc(user?.uid)
    const userIntervalsRef = firestore.collection('users').doc(user?.uid).collection('intervals')
    userIntervalsRef.add({
      status,
      description,
      targetDuration,
      secondsRemaining,
      startedAt,
      endedAt: Date.now(),
    })
    await currentIntervalRef.delete()
    setSecondsRemaining(targetDuration)
    setDescription('')
  }

  const updateInterval = async ({ status, secondsRemaining }: { status: TimerStatus; secondsRemaining: number }) => {
    const currentIntervalRef = firestore.collection('currentIntervals').doc(user?.uid)
    await currentIntervalRef.update({ status, secondsRemaining })
  }

  if (loading) {
    return <p>Loading...</p>
  }

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
          startedAt={startedAt}
          setSecondsRemaining={setSecondsRemaining}
          setStatus={setStatus}
          setDescription={setDescription}
          handleToggle={updateInterval}
          handleCreate={createInterval}
          handleReset={saveAndDeleteInterval}
        />
      </Flex>
    </>
  )
}

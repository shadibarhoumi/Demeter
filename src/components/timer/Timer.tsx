import React from 'react'
import { auth, firestore } from '../../firebase'
import { Input } from '@chakra-ui/react'
import { Button, Flex } from '@chakra-ui/react'
import { TimeDisplay } from './TimeDisplay'
import { TimeInput } from './TimeInput'

export const Timer = () => {
  const DEFAULT_DURATION = 1500
  const [lastStartedDuration, setLastStartedDuration] = React.useState<number>(DEFAULT_DURATION)
  const [secondsRemaining, setSecondsRemaining] = React.useState<number | undefined>(lastStartedDuration)
  const [running, setRunning] = React.useState<boolean>(false)
  const [stopped, setStopped] = React.useState<boolean>(true)
  const [currentIntervalId, setCurrentIntervalId] = React.useState<string>()
  const [description, setDescription] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [startedAt, setStartedAt] = React.useState<number>(Date.now())

  const startInterval = async () => {
    const intervalsRef = firestore.collection('users').doc(auth.currentUser?.uid).collection('intervals')
    const startedAtNow = Date.now()
    setStartedAt(startedAtNow)
    const newInterval = await intervalsRef.add({
      description,
      startedAt: startedAtNow,
      targetDuration: secondsRemaining,
      endedAt: null,
      complete: false,
    })
    setCurrentIntervalId(newInterval.id)
  }

  const endInterval = async () => {
    await firestore
      .collection('users')
      .doc(auth.currentUser?.uid)
      .collection('intervals')
      .doc(currentIntervalId)
      .set(
        {
          complete: true,
          endedAt: startedAt + (lastStartedDuration - secondsRemaining!) * 1000,
        },
        { merge: true },
      )
  }

  React.useEffect(() => {
    if (secondsRemaining !== undefined && secondsRemaining <= 0) {
      setRunning(false)
      setMessage('Congratulations! Another session in the bag.')
    }
  }, [secondsRemaining])

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" alignItems="center" padding="30px">
        {message && (
          <p>
            <b>{message}</b>
          </p>
        )}
        <Flex justifyContent="center" style={{}}>
          <TimeDisplay
            description={description}
            stopped={stopped}
            running={running}
            secondsRemaining={secondsRemaining}
            setSecondsRemaining={setSecondsRemaining}
          />
        </Flex>
        {stopped && <TimeInput secondsRemaining={secondsRemaining} setSecondsRemaining={setSecondsRemaining} />}
      </Flex>
      <Flex justifyContent="center">
        <Flex flexBasis="350px" justifyContent="space-around">
          <Button
            colorScheme="pink"
            disabled={!secondsRemaining}
            onClick={() => {
              if (stopped && secondsRemaining) {
                setLastStartedDuration(secondsRemaining)
                startInterval()
              }
              setRunning(!running)
              setStopped(false)
            }}
          >
            {stopped ? 'Start 👟' : running ? 'Pause ✋' : 'Resume ⏰'}
          </Button>
          {stopped && (
            <Input
              type="text"
              style={{ margin: '0 20px' }}
              placeholder="What are you doing?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
          {!stopped && !running && (
            <Button
              colorScheme="pink"
              onClick={() => {
                setSecondsRemaining(lastStartedDuration)
                setRunning(false)
                setStopped(true)
                setMessage('')
                endInterval()
              }}
              variant="outline"
            >
              Reset ♻️
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

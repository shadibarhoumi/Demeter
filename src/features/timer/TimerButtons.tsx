import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { TimerStatus } from './useTimer'

interface Props {
  status: TimerStatus
  secondsRemaining: number
  targetDuration: number
  description: string
  setSecondsRemaining: (seconds: number) => void
  setStatus: (status: TimerStatus) => void
  setDescription: (description: string) => void
}

export const TimerButtons = ({
  status,
  secondsRemaining,
  targetDuration,
  description,
  setSecondsRemaining,
  setStatus,
  setDescription,
}: Props) => {
  return (
    <Flex justifyContent="center">
      <Flex flexBasis="350px" justifyContent="space-around">
        {status !== TimerStatus.COMPLETE && (
          <Button
            colorScheme="pink"
            disabled={!secondsRemaining}
            onClick={() => {
              if (status === TimerStatus.STOPPED) {
                setSecondsRemaining(targetDuration)
              }
              if (status !== TimerStatus.RUNNING) {
                setStatus(TimerStatus.RUNNING)
              } else {
                setStatus(TimerStatus.PAUSED)
              }
            }}
          >
            {status === TimerStatus.STOPPED ? 'Start 👟' : status === TimerStatus.RUNNING ? 'Pause ✋' : 'Resume ⏰'}
          </Button>
        )}
        {status === TimerStatus.STOPPED && (
          <Input
            type="text"
            style={{ margin: '0 20px' }}
            placeholder="What are you doing?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
        {(status === TimerStatus.PAUSED || status === TimerStatus.COMPLETE) && (
          <Button
            colorScheme="pink"
            onClick={() => {
              setSecondsRemaining(targetDuration)
              setStatus(TimerStatus.STOPPED)
              setDescription('')
              // endInterval()
            }}
            variant="outline"
          >
            Reset ♻️
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

import { Button, Flex, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { TimerStatus } from './useTimer'
import { IntervalInput } from '@models/Interval'

interface Props {
  status: TimerStatus
  secondsRemaining: number
  targetDuration: number
  description: string
  startedAt: number
  setSecondsRemaining: (seconds: number) => void
  setStatus: (status: TimerStatus) => void
  setDescription: (description: string) => void
  handleToggle: ({ status, secondsRemaining }: Pick<IntervalInput, 'status' | 'secondsRemaining'>) => void
  handleCreate: ({
    status,
    description,
    targetDuration,
    secondsRemaining,
  }: Pick<IntervalInput, 'status' | 'description' | 'targetDuration' | 'secondsRemaining'>) => void
  handleReset: ({
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
  }: Pick<IntervalInput, 'status' | 'description' | 'targetDuration' | 'secondsRemaining'> & {
    startedAt: number
  }) => void
}

export const TimerButtons = ({
  status,
  secondsRemaining,
  targetDuration,
  description,
  setSecondsRemaining,
  setStatus,
  setDescription,
  handleToggle,
  handleCreate,
  handleReset,
  startedAt,
}: Props) => {
  // set status to complete if time has run out
  useEffect(() => {
    if (status === TimerStatus.RUNNING && secondsRemaining <= 0) {
      setStatus(TimerStatus.COMPLETE)
      setSecondsRemaining(0)
      handleReset({
        status: TimerStatus.COMPLETE,
        description,
        targetDuration,
        secondsRemaining,
        startedAt,
      })
    }
  }, [secondsRemaining, status, description, targetDuration, startedAt])

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
                if (status === TimerStatus.STOPPED) {
                  handleCreate({ status, description, targetDuration, secondsRemaining })
                } else {
                  handleToggle({ status: TimerStatus.RUNNING, secondsRemaining })
                }
              } else {
                setStatus(TimerStatus.PAUSED)
                handleToggle({ status: TimerStatus.PAUSED, secondsRemaining })
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
              setStatus(TimerStatus.STOPPED)
              if (status !== TimerStatus.COMPLETE) {
                handleReset({
                  status: TimerStatus.STOPPED,
                  description,
                  targetDuration,
                  secondsRemaining,
                  startedAt,
                })
              }
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

import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setTimerStatus, setDescription, TimerStatus, setSecondsRemaining } from './timerSlice'
import { useTimer } from './useTimer'

export const TimerButtons = () => {
  const dispatch = useDispatch()
  const { status, secondsRemaining, targetDuration, description } = useTimer()
  return (
    <Flex justifyContent="center">
      <Flex flexBasis="350px" justifyContent="space-around">
        {status !== TimerStatus.COMPLETE && (
          <Button
            colorScheme="pink"
            disabled={!secondsRemaining}
            onClick={() => {
              if (status === TimerStatus.STOPPED) {
                dispatch(setSecondsRemaining(targetDuration))
              }
              if (status !== TimerStatus.RUNNING) {
                dispatch(setTimerStatus(TimerStatus.RUNNING))
              } else {
                dispatch(setTimerStatus(TimerStatus.PAUSED))
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
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        )}
        {(status === TimerStatus.PAUSED || status === TimerStatus.COMPLETE) && (
          <Button
            colorScheme="pink"
            onClick={() => {
              dispatch(setSecondsRemaining(targetDuration))
              dispatch(setTimerStatus(TimerStatus.STOPPED))
              dispatch(setDescription(''))
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

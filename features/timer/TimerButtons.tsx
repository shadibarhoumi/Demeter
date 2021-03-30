import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { useDispatch } from 'react-redux'
import { toggleTimer, resetInterval } from '@features/timer/timerSlice'

export const TimerButtons = () => {
  const { status, description, setDescription } = useTimer()
  const dispatch = useDispatch()

  return (
    <Flex justifyContent="center">
      <Flex flexBasis="350px" justifyContent="space-around">
        {status !== TimerStatus.COMPLETE && (
          <Button colorScheme="pink" onClick={() => dispatch(toggleTimer())}>
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
          <Button colorScheme="pink" onClick={() => dispatch(resetInterval())} variant="outline">
            Reset ♻️
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

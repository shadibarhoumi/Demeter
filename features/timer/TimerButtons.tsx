import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { useDispatch } from 'react-redux'
import { toggleTimer, resetInterval } from '@features/timer/timerSlice'
import { ThreeDButton } from '@components/ThreeDButton'
import { DescriptionInput } from './DescriptionInput'

export const TimerButtons = () => {
  const { status } = useTimer()
  const dispatch = useDispatch()
  const { STOPPED, PAUSED, COMPLETE, RUNNING } = TimerStatus

  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        {status !== COMPLETE && (
          <ThreeDButton onClick={() => dispatch(toggleTimer())}>
            {status === STOPPED ? 'Lift Off! ‍🚀' : status === RUNNING ? 'Pause 👽' : 'Resume'}
          </ThreeDButton>
        )}
        {(status === PAUSED || status === COMPLETE) && (
          <Button marginTop="10px" colorScheme="gray" onClick={() => dispatch(resetInterval())} variant="link">
            Reset
          </Button>
        )}

        <DescriptionInput />
      </Flex>
    </>
  )
}

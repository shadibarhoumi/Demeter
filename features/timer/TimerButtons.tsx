import { Button, Flex, Input } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { useDispatch } from 'react-redux'
import { toggleTimer, resetInterval } from '@features/timer/timerSlice'
import { ThreeDButton } from '@components/ThreeDButton'
import debounce from 'lodash.debounce'
import { updateInterval } from '@lib/timerAPI'
import { useUserData } from '@lib/hooks'

export const TimerButtons = () => {
  const { status, description, setDescription } = useTimer()
  const { user } = useUserData()
  const dispatch = useDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const updateDescription = useCallback(
    debounce(async (description: string) => {
      updateInterval(user!.uid, { description })
    }, 500),
    [],
  )

  const handleChange = (description: string) => {
    setDescription(description)
    if (status !== TimerStatus.STOPPED) {
      updateDescription(description)
    }
  }

  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        {status !== TimerStatus.COMPLETE && (
          <ThreeDButton onClick={() => dispatch(toggleTimer())}>
            {status === TimerStatus.STOPPED ? 'Lift Off! ‍🚀' : status === TimerStatus.RUNNING ? 'Pause 👽' : 'Resume'}
          </ThreeDButton>
        )}
        {(status === TimerStatus.PAUSED || status === TimerStatus.COMPLETE) && (
          <Button marginTop="10px" colorScheme="gray" onClick={() => dispatch(resetInterval())} variant="link">
            Reset
          </Button>
        )}
      </Flex>

      <input
        type="text"
        style={{
          width: '350px',
          marginTop: '40px',
          outline: 'none',
          lineHeight: '2',
          fontSize: '25px',
          fontWeight: 'bold',
          color: '#2D3748',
          borderBottom: '1px solid black',
        }}
        ref={inputRef}
        placeholder="What are you working on?"
        value={description}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            if (status !== TimerStatus.RUNNING) {
              dispatch(toggleTimer())
            }
            inputRef.current?.blur()
          }
        }}
      />
    </>
  )
}

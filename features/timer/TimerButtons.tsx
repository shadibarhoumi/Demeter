import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState, useCallback } from 'react'
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
  const { STOPPED, PAUSED, COMPLETE, RUNNING } = TimerStatus
  const [editingDescription, setEditingDescription] = useState(false)

  const updateDescription = useCallback(
    debounce(async (description: string) => {
      updateInterval(user!.uid, { description })
    }, 500),
    [],
  )

  const handleChange = (description: string) => {
    setDescription(description)
    if (status !== STOPPED) {
      updateDescription(description)
    }
  }

  const canEditDescription = status === STOPPED || editingDescription

  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between">
        {status !== COMPLETE && (
          <ThreeDButton onClick={() => dispatch(toggleTimer())}>
            {status === STOPPED ? 'Lift Off! ‍🚀' : status === RUNNING ? 'Pause 👽' : 'Resume'}
          </ThreeDButton>
        )}
        {(status === PAUSED || status === COMPLETE) && (
          <Button
            marginTop="10px"
            colorScheme="gray"
            onClick={() => {
              dispatch(resetInterval())
              setEditingDescription(true)
            }}
            variant="link"
          >
            Reset
          </Button>
        )}
      </Flex>

      <Box padding="50px 0">
        {canEditDescription && (
          <input
            type="text"
            style={{
              width: '350px',
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
                if (status === STOPPED) {
                  dispatch(toggleTimer())
                }
                setEditingDescription(false)
                inputRef.current?.blur()
              }
            }}
          />
        )}
        {!canEditDescription && (
          <>
            <Text width="350px" fontSize="16px" letterSpacing="1px" color="grey" fontWeight="bold">
              Working On
              <span
                style={{
                  marginLeft: '6px',
                  textDecoration: 'underline',
                  fontWeight: 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => setEditingDescription(true)}
              >
                Edit
              </span>
            </Text>

            <Text width="350px" fontSize="22px" paddingTop="6px">
              {description}
            </Text>
          </>
        )}
      </Box>
    </>
  )
}

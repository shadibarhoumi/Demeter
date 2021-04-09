import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { TimerStatus, useTimer } from './useTimer'
import { useDispatch } from 'react-redux'
import { toggleTimer, resetInterval } from '@features/timer/timerSlice'
import { ThreeDButton } from '@components/ThreeDButton'
import debounce from 'lodash.debounce'
import { updateInterval } from '@lib/timerAPI'
import { useUserData } from '@lib/hooks'
import EditIcon from '@material-ui/icons/Edit'

export const TimerButtons = () => {
  const { status, description, setDescription, editingDescription, setEditingDescription } = useTimer()
  const { user } = useUserData()
  const dispatch = useDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { STOPPED, PAUSED, COMPLETE, RUNNING } = TimerStatus

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

  // when COMPLETE, cannot edit description
  // otherwise, can edit description when STOPPED or editingDescrition == true
  const canEditDescription = status !== COMPLETE && (status === STOPPED || editingDescription)

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
      </Flex>

      <Box padding="50px 0" fontSize="22px">
        {canEditDescription && (
          <>
            <Text width="350px" fontSize="16px" marginBottom="10px" letterSpacing="1px" color="hsl(0deg 0% 44%)">
              What are you working on?
            </Text>
            <input
              type="text"
              style={{
                width: '350px',
                outline: 'none',
                lineHeight: '2',
                fontSize: 'inherit',
                color: '#2D3748',
                borderBottom: '1px solid black',
              }}
              ref={inputRef}
              placeholder="e.g. reading, coding, blogging"
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
          </>
        )}
        {!canEditDescription && (
          <>
            <Text width="350px" fontSize="16px" marginBottom="10px" letterSpacing="1px" color="grey">
              Working On
              {status !== COMPLETE && (
                <EditIcon
                  fontSize="small"
                  style={{ marginTop: '-5px', marginLeft: '4px', cursor: 'pointer' }}
                  onClick={() => setEditingDescription(true)}
                />
              )}
            </Text>

            <Text width="350px" fontSize="inherit" paddingTop="6px">
              {description}
            </Text>
          </>
        )}
      </Box>
    </>
  )
}

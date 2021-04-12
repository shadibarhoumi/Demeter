import React, { useCallback } from 'react'
import { Box, Text } from '@chakra-ui/react'
import EditIcon from '@material-ui/icons/Edit'
import { toggleTimer } from '@features/timer/timerSlice'
import { Autocomplete } from '@components/Autocomplete'
import { useUserData, useUserIntervals } from '@lib/hooks'
import { TimerStatus, useTimer } from './useTimer'
import debounce from 'lodash.debounce'
import { updateInterval } from '@lib/timerAPI'
import { useDispatch } from 'react-redux'

export const DescriptionInput = () => {
  const dispatch = useDispatch()
  const { STOPPED, COMPLETE } = TimerStatus
  const { user } = useUserData()
  const { status, description, setDescription, editingDescription, setEditingDescription } = useTimer()
  const inputRef = React.useRef<HTMLInputElement>(null)

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

  const { intervals } = useUserIntervals(user?.uid)

  const allDescriptions = [...new Set(intervals.map((interval) => interval.description))]

  return (
    <Box padding="50px 0" fontSize="22px">
      <Autocomplete
        options={allDescriptions}
        onSelected={(option) => {
          console.log(`selected ${option}`)
        }}
      />
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
  )
}

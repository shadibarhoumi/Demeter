import { Button, Flex, Input } from '@chakra-ui/react'
import { RootState } from '@d/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Timer } from './Timer'
import { setTimerStatus, setDescription, TimerStatus, setSecondsRemaining } from './timerSlice'

export const TimerButtons = () => {
  const dispatch = useDispatch()
  const targetDuration = useSelector((state: RootState) => state.timer.targetDuration)
  const secondsRemaining = useSelector((state: RootState) => state.timer.secondsRemaining)
  const status = useSelector((state: RootState) => state.timer.status)
  const description = useSelector((state: RootState) => state.timer.description)

  return (
    <Flex justifyContent="center">
      <Flex flexBasis="350px" justifyContent="space-around">
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
        {status === TimerStatus.STOPPED && (
          <Input
            type="text"
            style={{ margin: '0 20px' }}
            placeholder="What are you doing?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
        {status === TimerStatus.PAUSED && (
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

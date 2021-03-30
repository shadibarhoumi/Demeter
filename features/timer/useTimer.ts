import { RootState } from '@features/store'
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setTimerStatus,
  decrementTimer,
  setTimerTargetDuration,
  setTimerDescription,
  setTimerSecondsRemaining,
  setTimerStartedAt,
  completeInterval,
} from './timerSlice'
export enum TimerStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETE',
  STOPPED = 'STOPPED',
}

export const useTimer = () => {
  const dispatch = useDispatch()
  const { status, secondsRemaining, targetDuration, description, startedAt } = useSelector(
    (state: RootState) => state.timer,
  )

  const setStatus = useCallback((status: TimerStatus) => dispatch(setTimerStatus(status)), [])
  const setTargetDuration = useCallback((duration: number) => dispatch(setTimerTargetDuration(duration)), [])
  const setDescription = useCallback((description: string) => dispatch(setTimerDescription(description)), [])
  const setSecondsRemaining = useCallback(
    (secondsRemaining: number) => dispatch(setTimerSecondsRemaining(secondsRemaining)),
    [],
  )
  const setStartedAt = useCallback((startedAt: number) => dispatch(setTimerStartedAt(startedAt)), [])

  return {
    status,
    setStatus,
    secondsRemaining,
    setSecondsRemaining,
    targetDuration,
    setTargetDuration,
    description,
    setDescription,
    startedAt,
    setStartedAt,
  }
}

export const useCountdown = () => {
  const dispatch = useDispatch()
  const { status, secondsRemaining } = useTimer()
  // call decrement every second when timer is running
  useEffect(() => {
    let timer: number | undefined
    if (status === TimerStatus.RUNNING) {
      timer = window.setInterval(() => dispatch(decrementTimer()), 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (status === TimerStatus.RUNNING && secondsRemaining <= 0) {
      dispatch(completeInterval())
    }
  }, [secondsRemaining, status])
}

import { useState } from 'react'

export enum TimerStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETE',
  STOPPED = 'STOPPED',
}

const DEFAULT_DURATION = 1500

export const useTimer = () => {
  const [status, setStatus] = useState(TimerStatus.STOPPED)
  const [secondsRemaining, setSecondsRemaining] = useState(DEFAULT_DURATION)
  const [targetDuration, setTargetDuration] = useState(DEFAULT_DURATION)
  const [description, setDescription] = useState('')

  const decrement = () => setSecondsRemaining((remaining) => remaining - 1)

  return {
    status,
    secondsRemaining,
    targetDuration,
    description,
    setStatus,
    setTargetDuration,
    decrement,
    setDescription,
    setSecondsRemaining,
  }
}

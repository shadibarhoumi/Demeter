import { useState, useEffect } from 'react'

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

  // call decrement every second when timer is running
  const decrement = () => setSecondsRemaining((remaining) => remaining - 1)
  useEffect(() => {
    let timer: number | undefined
    if (status === TimerStatus.RUNNING) {
      timer = window.setInterval(decrement, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [status])

  return {
    status,
    secondsRemaining,
    targetDuration,
    description,
    setStatus,
    setTargetDuration,
    setDescription,
    setSecondsRemaining,
  }
}

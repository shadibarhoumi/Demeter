import { TimerStatus } from 'features/timer/useTimer'

export type IntervalInput = Omit<Interval, 'id'>

export interface Interval {
  id: string
  status: TimerStatus
  description: string
  targetDuration: number
  secondsRemaining: number
  startedAt: number
  endedAt: number | null
}

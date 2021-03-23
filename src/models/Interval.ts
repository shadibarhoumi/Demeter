export interface Interval {
  id: string
  state: 'RUNNING' | 'PAUSED' | 'COMPLETE'
  description: string
  targetDuration: number
  startedAt: number
  endedAt: number
  timeLeft: number
}

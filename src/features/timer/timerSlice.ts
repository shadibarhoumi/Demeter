import { bindActionCreators, createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum TimerStatus {
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETE',
  STOPPED = 'STOPPED',
}

interface TimerState {
  status: TimerStatus
  description: string
  targetDuration: number
  startedAt: number
  secondsRemaining: number
}

const DEFAULT_DURATION = 1500

const initialState: TimerState = {
  status: TimerStatus.STOPPED,
  description: '',
  targetDuration: DEFAULT_DURATION,
  startedAt: Date.now(),
  secondsRemaining: DEFAULT_DURATION,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerStatus(state, action: PayloadAction<TimerStatus>) {
      state.status = action.payload
    },
    decrementTimer(state) {
      state.secondsRemaining = state.secondsRemaining - 1
    },
    setTargetDuration(state, action: PayloadAction<number>) {
      state.targetDuration = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setSecondsRemaining(state, action: PayloadAction<number>) {
      state.secondsRemaining = action.payload
    },
  },
})

export const {
  setTimerStatus,
  decrementTimer,
  setTargetDuration,
  setDescription,
  setSecondsRemaining,
} = timerSlice.actions
export default timerSlice.reducer

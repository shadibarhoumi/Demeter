import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Dispatch } from 'redux'
import { RootState } from '@features/store'
import { createInterval, saveAndDeleteInterval, updateInterval } from '@lib/timerAPI'

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
  editingDescription: boolean
}

const DEFAULT_DURATION = 1500

export const timerInitialState: TimerState = {
  status: TimerStatus.STOPPED,
  secondsRemaining: DEFAULT_DURATION,
  targetDuration: DEFAULT_DURATION,
  description: '',
  startedAt: Date.now(),
  editingDescription: true,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState: timerInitialState,
  reducers: {
    setTimerStatus(state, action: PayloadAction<TimerStatus>) {
      state.status = action.payload
    },
    decrementTimer(state) {
      state.secondsRemaining = state.secondsRemaining - 1
    },
    setTimerTargetDuration(state, action: PayloadAction<number>) {
      state.targetDuration = action.payload
    },
    setTimerDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    setTimerSecondsRemaining(state, action: PayloadAction<number>) {
      state.secondsRemaining = action.payload
    },
    setTimerStartedAt(state, action: PayloadAction<number>) {
      state.startedAt = action.payload
    },
    setTimerEditingDescription(state, action: PayloadAction<boolean>) {
      state.editingDescription = action.payload
    },
  },
})

export const resetInterval = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { status } = getState().timer
  if (status !== TimerStatus.COMPLETE) {
    const { uid } = getState().userData.user!
    const { description, targetDuration, secondsRemaining, startedAt } = getState().timer
    await saveAndDeleteInterval(uid, {
      status: TimerStatus.STOPPED,
      description,
      targetDuration,
      secondsRemaining,
      startedAt,
    })
  }
  dispatch(setTimerEditingDescription(true))
  dispatch(setTimerStatus(TimerStatus.STOPPED))
}

export const completeInterval = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setTimerStatus(TimerStatus.COMPLETE))
  dispatch(setTimerSecondsRemaining(0))
  const { uid } = getState().userData.user!
  const { description, targetDuration, secondsRemaining, startedAt } = getState().timer
  await saveAndDeleteInterval(uid, {
    status: TimerStatus.COMPLETE,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
  })
}

export const toggleTimer = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const { status, targetDuration, description, secondsRemaining } = getState().timer
  const { uid } = getState().userData.user!
  const { setTimerSecondsRemaining, setTimerStatus } = timerSlice.actions
  switch (status) {
    case TimerStatus.STOPPED:
      dispatch(setTimerSecondsRemaining(targetDuration))
      dispatch(setTimerStatus(TimerStatus.RUNNING))
      const now = Date.now()
      dispatch(setTimerStartedAt(now))
      dispatch(setTimerEditingDescription(false))
      await createInterval(uid, {
        status: TimerStatus.RUNNING,
        startedAt: now,
        description,
        targetDuration,
        secondsRemaining: targetDuration,
      })
      break
    case TimerStatus.PAUSED:
      dispatch(setTimerStatus(TimerStatus.RUNNING))
      await updateInterval(uid, { status: TimerStatus.RUNNING, secondsRemaining })
      break
    case TimerStatus.RUNNING:
      dispatch(setTimerStatus(TimerStatus.PAUSED))
      await updateInterval(uid, { status: TimerStatus.PAUSED, secondsRemaining })
      break
    default:
      break
  }
}

export const {
  setTimerStatus,
  decrementTimer,
  setTimerTargetDuration,
  setTimerDescription,
  setTimerSecondsRemaining,
  setTimerStartedAt,
  setTimerEditingDescription,
} = timerSlice.actions

export default timerSlice.reducer

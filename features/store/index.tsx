import { combineReducers } from 'redux'
import timerReducer from '@features/timer/timerSlice'

export const rootReducer = combineReducers({
  timer: timerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

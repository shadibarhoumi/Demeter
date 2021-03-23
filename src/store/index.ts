import { combineReducers } from 'redux'
import timerReducer from '@d/features/timer/timerSlice'

export const rootReducer = combineReducers({
  timer: timerReducer,
})

export type RootState = ReturnType<typeof rootReducer>

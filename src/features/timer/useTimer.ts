import { RootState } from '@d/store'
import { shallowEqual, useSelector } from 'react-redux'

export const useTimer = () =>
  useSelector(
    (state: RootState) => ({
      status: state.timer.status,
      secondsRemaining: state.timer.secondsRemaining,
      targetDuration: state.timer.targetDuration,
      description: state.timer.description,
    }),
    shallowEqual,
  )

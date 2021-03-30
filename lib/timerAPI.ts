import { IntervalInput } from '@models/Interval'
import { firestore } from './firebase'

export const createInterval = async (
  userId: string,
  {
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
  }: Pick<IntervalInput, 'status' | 'description' | 'targetDuration' | 'secondsRemaining' | 'startedAt'>,
) => {
  const currentIntervalRef = firestore.collection('currentIntervals').doc(userId)
  // when status changes from stopped to running, create an interval
  // save time that timer started
  const newInterval: IntervalInput = {
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
    endedAt: null,
  }
  await currentIntervalRef.set(newInterval)
}

export const saveAndDeleteInterval = async (
  userId: string,
  {
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
  }: Pick<IntervalInput, 'status' | 'description' | 'targetDuration' | 'secondsRemaining' | 'startedAt'>,
) => {
  const currentIntervalRef = firestore.collection('currentIntervals').doc(userId)
  const userIntervalsRef = firestore.collection('users').doc(userId).collection('intervals')
  userIntervalsRef.add({
    status,
    description,
    targetDuration,
    secondsRemaining,
    startedAt,
    endedAt: Date.now(),
  })
  await currentIntervalRef.delete()
}

export const updateInterval = async (
  userId: string,
  { status, secondsRemaining }: Pick<IntervalInput, 'status' | 'secondsRemaining'>,
) => {
  const currentIntervalRef = firestore.collection('currentIntervals').doc(userId)
  await currentIntervalRef.update({ status, secondsRemaining })
}

import React from 'react'
import { Timer } from 'features/timer/Timer'
import { IntervalStats } from '@features/dashboard/IntervalStats'
import { AuthCheck } from '@components/AuthCheck'

export default function TimerPage() {
  return (
    <AuthCheck>
      <Timer />
      <IntervalStats />
    </AuthCheck>
  )
}

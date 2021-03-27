import React from 'react'
import { Timer } from 'features/timer/Timer'
import { IntervalList } from 'features/dashboard/IntervalList'
import { AuthCheck } from '@components/AuthCheck'

export default function App() {
  return (
    <AuthCheck>
      <Timer />
      <IntervalList />
    </AuthCheck>
  )
}

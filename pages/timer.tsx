import React from 'react'
import { Timer } from 'features/timer/Timer'
import { IntervalStats } from '@features/dashboard/IntervalStats'
import { AuthCheck } from '@components/AuthCheck'
import { useUserData } from '@lib/hooks'
import { Autocomplete } from '@components/Autocomplete'

export default function TimerPage() {
  const { user } = useUserData()

  return (
    <AuthCheck>
      <Timer />
      <IntervalStats userId={user?.uid} />
    </AuthCheck>
  )
}

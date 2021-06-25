import React from 'react'
import { Timer } from 'features/timer/Timer'
import { IntervalStats } from '@features/dashboard/IntervalStats'
import { AuthCheck } from '@components/AuthCheck'
import { useUserData } from '@lib/hooks'
import { UsernameForm } from '@components/UsernameForm'

export default function TimerPage() {
  const { user, username } = useUserData()

  return (
    <AuthCheck>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <>
            <Timer />
            <IntervalStats userId={user?.uid} />
          </>
        )
      ) : (
        <p>must be signed in</p>
      )}
    </AuthCheck>
  )
}

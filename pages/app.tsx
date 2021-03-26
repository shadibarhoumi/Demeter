import React from 'react'
import { Timer } from '@d/features/timer/Timer'
import { Page } from '@d/components/Page'
import { IntervalList } from '@d/features/dashboard/IntervalList'

export default function App() {
  return (
    <Page>
      <Timer />
      <IntervalList />
    </Page>
  )
}

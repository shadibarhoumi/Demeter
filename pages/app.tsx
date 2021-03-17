import React from 'react'
import { Timer } from '../src/components/timer/Timer'
import { Page } from '../src/components/Page'
import { IntervalList } from '../src/IntervalList'

export default function App() {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600) // 10 minutes timer

  return (
    <Page>
      <Timer />
      <IntervalList />
    </Page>
  )
}

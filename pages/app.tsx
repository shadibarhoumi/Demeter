import React from 'react'
import { Timer } from '@d/features/timer/Timer'
import { Page } from '@d/components/Page'
import { IntervalList } from '@d/features/dashboard/IntervalList'
import { timerInitialState } from '@d/features/timer/timerSlice'

export function getStaticProps() {
  // Note that in this case we're returning the state directly, without creating the store first
  return {
    props: {
      initialReduxState: {
        timer: timerInitialState,
      },
    },
  }
}

export default function App() {
  return (
    <Page>
      <Timer />
      <IntervalList />
    </Page>
  )
}

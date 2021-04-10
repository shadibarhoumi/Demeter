import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useUserIntervals } from '@lib/hooks'
import { IntervalPieChart } from '@features/stats/IntervalPieChart'
import { TotalTime } from '@features/stats/TotalTime'
import { IntervalTable } from '@features/stats/IntervalTable'

export const IntervalStats = ({ userId }: { userId?: string }) => {
  const { intervals, intervalsRef } = useUserIntervals(userId)

  if (!userId || !intervals || !intervalsRef) {
    return <p>Loading...</p>
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center">
        <IntervalPieChart intervals={intervals} />
        <TotalTime intervals={intervals} />
      </Flex>
      <IntervalTable intervals={intervals} deleteInterval={(id: string) => intervalsRef.doc(id).delete()} />
    </Flex>
  )
}

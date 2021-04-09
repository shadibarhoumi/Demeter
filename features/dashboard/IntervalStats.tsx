import { firestore } from '@lib/firebase'
import { Flex } from '@chakra-ui/react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React from 'react'
import { Interval } from '@models/Interval'
import { useUserData } from '@lib/hooks'
import { DaySummary } from '@features/stats/DaySummary'
import { IntervalList } from '@features/stats/IntervalList'
import { TotalTime } from '@features/stats/TotalTime'
import { IntervalTable } from '@features/stats/IntervalTable'

export const IntervalStats = () => {
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  const { user } = useUserData()
  const intervalsRef = firestore.collection('users').doc(user?.uid).collection('intervals')

  const query = intervalsRef.where('startedAt', '>', startOfToday).orderBy('startedAt')

  const [intervals, loadingIntervals, error] = useCollectionData<Interval>(query, { idField: 'id' })
  console.log({ intervals })

  if (!user || !intervals) {
    return <p>Loading...</p>
  }

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Flex justifyContent="space-around" alignItems="center">
        <DaySummary intervals={intervals} />
        <TotalTime intervals={intervals} />
      </Flex>
      <IntervalTable intervals={intervals} deleteInterval={(id: string) => intervalsRef.doc(id).delete()} />
    </Flex>
  )
}

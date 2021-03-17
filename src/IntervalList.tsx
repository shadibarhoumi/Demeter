import { auth, firestore } from './firebase'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React from 'react'
import { Interval } from './models/Interval'

export const TotalTime = ({ intervals }: { intervals: Interval[] }) => {
  const totalMilliseconds = intervals.reduce((total: number, interval) => {
    if (!interval.endedAt) return total
    return total + interval.endedAt - interval.startedAt
  }, 0)
  const totalSeconds = Math.floor(totalMilliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const secondsRemainder = totalSeconds % 60
  return (
    <Text>
      Your Total Time Today: {totalMinutes} minutes and {secondsRemainder} seconds
    </Text>
  )
}

const computeMinutesAndSeconds = (startedAt: number, endedAt: number) => {
  const totalSeconds = Math.floor((endedAt - startedAt) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return { minutes, seconds }
}

export const IntervalList = () => {
  const startOfToday = new Date().setHours(0, 0, 0, 0)
  const { currentUser } = auth
  const intervalsRef = firestore.collection('users').doc(currentUser?.uid).collection('intervals')

  const query = intervalsRef.where('startedAt', '>', startOfToday).where('complete', '==', true).orderBy('startedAt')

  const [intervals, loadingIntervals, error] = useCollectionData<Interval>(query, { idField: 'id' })

  if (!currentUser) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {intervals && <TotalTime intervals={intervals} />}
      <Text fontWeight="bold">Your Intervals Today</Text>
      {loadingIntervals && <div>Loading...</div>}
      <Flex flexDirection="column">
        {intervals &&
          intervals.map((interval) => {
            const { minutes, seconds } = computeMinutesAndSeconds(interval.startedAt, interval.endedAt)
            return (
              <Box border="2px dashed plum" key={interval.id} width="300px" marginBottom="10px">
                <p>
                  <b>{interval.description}</b>
                </p>
                <p>
                  Duration: <b>{`${minutes} minutes and ${seconds} seconds`}</b>
                </p>
                <p>Started at {new Date(interval.startedAt).toLocaleString()}</p>
                <p>Ended at {new Date(interval.endedAt).toLocaleString()}</p>
              </Box>
            )
          })}
      </Flex>
    </div>
  )
}

import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Interval } from '@models/Interval'

const computeMinutesAndSeconds = (startedAt: number, endedAt: number) => {
  const totalSeconds = Math.floor((endedAt - startedAt) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return { minutes, seconds }
}

export const IntervalItem = ({
  interval,
  handleDelete,
}: {
  interval: Interval
  handleDelete: (id: string) => void
}) => {
  const { minutes, seconds } = computeMinutesAndSeconds(interval.startedAt, interval.endedAt!)
  return (
    <Box position="relative" border="2px dashed plum" width="300px" marginBottom="10px">
      <Flex
        justifyContent="center"
        alignItems="center"
        width="20px"
        height="20px"
        backgroundColor="lightgrey"
        borderRadius="20px"
        padding="5px"
        position="absolute"
        top="-10px"
        right="-10px"
        cursor="pointer"
        _hover={{
          backgroundColor: 'grey',
        }}
        onClick={() => handleDelete(interval.id)}
      >
        <div>x</div>
      </Flex>
      <p>
        <b>{interval.description}</b>
      </p>
      <p>
        Duration: <b>{`${minutes} minutes and ${seconds} seconds`}</b>
      </p>
      <p>Started at {new Date(interval.startedAt).toLocaleString()}</p>
      <p>Ended at {new Date(interval.endedAt!).toLocaleString()}</p>
    </Box>
  )
}

interface Props {
  intervals: Interval[]
  deleteInterval: (id: string) => void
}

export const IntervalList = ({ intervals, deleteInterval }: Props) => {
  return (
    <Flex flexDirection="column" alignItems="center" marginTop="30px">
      <Text fontWeight="bold" marginTop="30px">
        Your Intervals Today
      </Text>
      <Flex flexDirection="column">
        {intervals &&
          intervals.reverse().map((interval) => {
            return <IntervalItem handleDelete={deleteInterval} key={interval.id} interval={interval} />
          })}
      </Flex>
    </Flex>
  )
}

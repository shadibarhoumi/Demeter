import { Interval } from '@models/Interval'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'

const Large = styled.span`
  font-size: 8rem;
  color: hsl(0deg 0% 25%);
  font-weight: 200;
`

const Medium = styled.span`
  font-size: 4rem;
  color: hsl(0deg 0% 25%);
`

const Small = styled.span`
  font-size: 2rem;
  color: gray;
`

export const TotalTime = ({ intervals }: { intervals: Interval[] }) => {
  const totalMilliseconds = intervals.reduce((total: number, interval) => {
    if (!interval.endedAt) return total
    return total + interval.endedAt - interval.startedAt
  }, 0)
  const totalSeconds = Math.floor(totalMilliseconds / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const secondsRemainder = totalSeconds % 60
  return (
    <Box>
      <Text width="350px" fontSize="1rem" marginBottom="10px" letterSpacing="1px" color="hsl(0deg 0% 44%)">
        Total time today
      </Text>
      <Text>
        {totalMinutes > 0 && (
          <>
            <Large>{totalMinutes}</Large>
            <Small>m </Small>
          </>
        )}
        {secondsRemainder > 0 && (
          <>
            <Large>{secondsRemainder}</Large>
            <Small>s</Small>
          </>
        )}
      </Text>
    </Box>
  )
}

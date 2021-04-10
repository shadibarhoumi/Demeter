import { Interval } from '@models/Interval'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import { getTimeParts, getTotalTime } from '@lib/util'

const Large = styled.span`
  font-size: 6rem;
  color: hsl(0deg 0% 25%);
  font-weight: 200;
`

const Medium = styled.span`
  font-size: 4rem;
  font-weight: 200;
  color: hsl(0deg 0% 25%);
`

const Small = styled.span`
  font-size: 3rem;
  color: gray;
  margin-right: 10px;
`

const XSmall = styled.span`
  font-size: 2rem;
  color: gray;
  margin-right: 10px;
`

const TimePart = ({ time, unit, small = false }: { time: number; unit: string; small?: boolean }) => {
  if (time <= 0) return null
  const Time = small ? Medium : Large
  const Unit = small ? XSmall : Small
  return (
    <>
      <Time>{time}</Time>
      <Unit>{unit}</Unit>
    </>
  )
}

export const TotalTime = ({ intervals }: { intervals: Interval[] }) => {
  const totalSeconds = getTotalTime(intervals)
  const { hours, minutes, seconds } = getTimeParts(totalSeconds)
  return (
    <Box>
      <Text width="350px" fontSize="1rem" marginBottom="10px" letterSpacing="1px" color="hsl(0deg 0% 44%)">
        Total time today
      </Text>
      <TimePart time={hours} unit="h" />
      <TimePart time={minutes} unit="m" />
      <TimePart time={seconds} unit="s" small={true} />
    </Box>
  )
}

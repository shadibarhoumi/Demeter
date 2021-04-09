import React, { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { Interval } from '@models/Interval'
import { ResponsivePie } from '@nivo/pie'
import { getTimeString } from '@lib/util'

interface Props {
  intervals: Interval[]
}

export const DaySummary: React.FC<Props> = ({ intervals }: Props) => {
  if (!intervals.length) {
    return null
  }

  const computeData = (intervals?: Interval[]) => {
    if (!intervals) return []
    // merge intervals with same name
    const intervalTotals: { [key: string]: number } = {}

    intervals.forEach((interval) => {
      const normalizedDescription = interval.description ? interval.description.trim().toLowerCase() : 'Uncategorized'
      const currentValue = intervalTotals[normalizedDescription]
      const intervalDuration = interval.targetDuration - interval.secondsRemaining
      intervalTotals[normalizedDescription] = currentValue ? currentValue + intervalDuration : intervalDuration
    })

    let sortedIntervals = Object.keys(intervalTotals)
      .map((description) => ({ id: description, value: intervalTotals[description] }))
      .filter((i) => i.value > 0)
      .sort((a, b) => b.value - a.value)

    const totalTime = sortedIntervals.reduce((total, cur) => total + cur.value, 0)

    let otherStartIndex = sortedIntervals.findIndex((interval) => interval.value / totalTime < 0.1)

    if (otherStartIndex > 0) {
      const otherIntervals = sortedIntervals.splice(otherStartIndex)
      const totalOtherTime = otherIntervals.reduce((total, cur) => {
        console.log({ total, cur })
        return total + cur.value
      }, 0)
      sortedIntervals = [...sortedIntervals, { id: 'Other', value: totalOtherTime }]
    }
    return sortedIntervals
  }

  const data = useMemo(() => computeData(intervals), [intervals])

  return (
    <Box width="700px" height="500px">
      {intervals && (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 150, bottom: 40, left: 150 }}
          innerRadius={0.6}
          startAngle={-38}
          padAngle={1}
          cornerRadius={15}
          valueFormat={(value: number) => getTimeString(value)}
          theme={{
            fontSize: 16,
          }}
        />
      )}
    </Box>
  )
}

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react'
import { getTimeString } from '@lib/util'
import { Interval } from '@models/Interval'
import { DeleteIcon } from '@chakra-ui/icons'
import React from 'react'
import { Text } from '@chakra-ui/react'

interface Props {
  intervals: Interval[]
  deleteInterval: (id: string) => void
}

const getTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('en-US', { timeStyle: 'short' })
}

export const IntervalTable = ({ intervals, deleteInterval }: Props) => (
  <>
    <Text fontSize="1rem" margin="30px 0" letterSpacing="1px" color="hsl(0deg 0% 44%)">
      All intervals today
    </Text>
    <Table size="sm" variant="striped" maxWidth="500px">
      <Thead>
        <Tr>
          <Th>Description</Th>
          <Th isNumeric>Duration</Th>
          <Th>Time</Th>
        </Tr>
      </Thead>
      <Tbody>
        {intervals.reverse().map((interval) => (
          <Tr>
            <Td>{interval.description || 'Uncategorized'}</Td>
            <Td>{getTimeString(interval.targetDuration - interval.secondsRemaining)}</Td>
            <Td>{`${getTime(interval.startedAt)} - ${getTime(interval.endedAt!)}`}</Td>
            <Td>
              <DeleteIcon
                cursor="pointer"
                hover={{
                  filter: 'brightness(150%)',
                }}
                onClick={() => deleteInterval(interval.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </>
)

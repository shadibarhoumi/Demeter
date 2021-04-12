import { Interval } from '@models/Interval'

const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

export const getTimeParts = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 60 / 60)
  const minutes = Math.floor(timeInSeconds / 60) - hours * 60
  const seconds = timeInSeconds % 60
  return { hours, minutes, seconds }
}

export const getTimeDisplay = (timeInSeconds: number) => {
  const { hours, minutes, seconds } = getTimeParts(timeInSeconds)
  return { hours: formatTime(hours), minutes: formatTime(minutes), seconds: formatTime(seconds) }
}

export const getTimeString = (timeInSeconds: number) => {
  const { hours, minutes, seconds } = getTimeParts(timeInSeconds)
  let timeString = ''
  if (hours > 0) {
    timeString += `${hours}h `
  }
  if (minutes > 0) {
    timeString += `${minutes}m `
  }
  // don't show seconds if there are hours and minutes
  if (hours > 0 && minutes > 0) return timeString
  if (seconds > 0 || !timeString) {
    timeString += `${seconds}s`
  }
  return timeString
}

export const getTotalTime = (intervals: Interval[]) => {
  return intervals.reduce((total: number, interval) => {
    return total + interval.targetDuration - interval.secondsRemaining
  }, 0)
}

export const fuzzyMatch = (prefix: string, candidate: string): [boolean, number[]] => {
  let j = 0 // index into candidate string
  let matchIndices = []
  for (let i = 0; i < prefix.length; i++) {
    while (candidate[j] !== prefix[i]) {
      j++
      if (j >= candidate.length) {
        return [false, matchIndices]
      }
    }
    matchIndices.push(j)
    j++
  }
  return [true, matchIndices]
}

export interface Match {
  text: string
  matchIndices: number[]
}

export const findMatches = (input: string, candidates: string[]) => {
  const matches: Match[] = []
  candidates.forEach((candidate) => {
    const [isMatch, matchIndices] = fuzzyMatch(input, candidate)
    if (isMatch) {
      matches.push({ text: candidate, matchIndices })
    }
  })
  return matches
}

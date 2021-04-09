const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

const getMinutesAndSeconds = (timeInSeconds: number) => ({
  minutes: Math.floor(timeInSeconds / 60),
  seconds: timeInSeconds % 60,
})

export const getTimeDisplay = (timeInSeconds: number) => {
  const { minutes, seconds } = getMinutesAndSeconds(timeInSeconds)
  return { minutes: formatTime(minutes), seconds: formatTime(seconds) }
}

export const getTimeString = (timeInSeconds: number) => {
  const { minutes, seconds } = getMinutesAndSeconds(timeInSeconds)
  let timeString = ''
  if (minutes > 0) {
    timeString += `${minutes}m `
  }
  if (seconds > 0 || !timeString) {
    timeString += `${seconds}s`
  }
  return timeString
}

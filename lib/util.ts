const formatTime = (seconds: number) =>
  seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

export const getTimeDisplay = (timeInSeconds: number) => {
  const minutes = formatTime(Math.floor(timeInSeconds / 60))
  const seconds = formatTime(timeInSeconds % 60)
  return { minutes, seconds }
}

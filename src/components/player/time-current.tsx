import { useMediaPlayer } from '@vidstack/react'
import { useEffect, useRef } from 'react'

export type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'fraction'
export type ParsedTime = {
  [P in TimeUnit]: number
}

function padNumberWithZeroes(num: number, expectedLength: number): string {
  const str = String(num)
  const actualLength = str.length
  const shouldPad = actualLength < expectedLength

  if (shouldPad) {
    const padLength = expectedLength - actualLength
    const padding = `0`.repeat(padLength)
    return `${padding}${num}`
  }

  return str
}

function parseTime(duration: number): ParsedTime {
  const hours = Math.trunc(duration / 3600)
  const minutes = Math.trunc((duration % 3600) / 60)
  const seconds = Math.trunc(duration % 60)
  const fraction = Math.trunc((duration - Math.trunc(duration)) * 1000)
  return {
    hours,
    minutes,
    seconds,
    fraction
  }
}

function formatTime(duration: number): string {
  const { hours, minutes, seconds, fraction } = parseTime(duration)
  const paddedHours = padNumberWithZeroes(hours, 2)
  const paddedMinutes = padNumberWithZeroes(minutes, 2)
  const paddedSeconds = padNumberWithZeroes(seconds, 2)
  const paddedFraction = padNumberWithZeroes(fraction, 3)

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}:${paddedFraction}`
}

export function TimeCurrent() {
  const player = useMediaPlayer()
  const timeRef = useRef<HTMLTimeElement>(null)

  useEffect(() => {
    if (!player) return

    return player.subscribe(({ currentTime }: { currentTime: number }) => {
      timeRef.current!.textContent = formatTime(currentTime)
    })
  }, [player])

  return (
    <time
      ref={timeRef}
      className="pointer-events-auto font-mono text-xs text-white/92"
    />
  )
}

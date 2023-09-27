'use client'

import { type MouseEvent, useRef, memo, useEffect } from 'react'
import {
  MediaFullscreenButton,
  MediaGesture,
  MediaOutlet,
  MediaPlayButton,
  MediaPlayer,
  MediaSliderVideo,
  MediaTimeSlider,
  MediaTooltip,
  useMediaRemote
} from '@vidstack/react'
import clsx from 'clsx'
import { ChevronRightIcon } from './icons/chevron-right'
import { PlayIcon } from './icons/play'
import { ReplayIcon } from './icons/replay'
import { PauseIcon } from './icons/pause'
import { FullscreenIcon } from './icons/fullscreen'
import { FullscreenExitIcon } from './icons/fullscreen-exit'

type Video = {
  id: string
  fileName: string
  mimeType: string
  url: string
}

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

export interface IVideoPlayer {
  title: string
  video: Video
}
export function VideoPlayerComponent({ title, video }: IVideoPlayer) {
  const player = useRef<any>(null)
  const remote = useMediaRemote(player)
  const scroll = useRef(0)

  function onPlaybackRateNormal({
    nativeEvent,
    currentTarget
  }: MouseEvent<HTMLButtonElement>) {
    remote.changePlaybackRate(1, nativeEvent)
    currentTarget.classList.add('playback-rate-pressed')
    currentTarget.nextElementSibling?.classList.remove('playback-rate-pressed')
  }
  function onPlaybackRateFaster({
    nativeEvent,
    currentTarget
  }: MouseEvent<HTMLButtonElement>) {
    remote.changePlaybackRate(2, nativeEvent)
    currentTarget.classList.add('playback-rate-pressed')
    currentTarget.previousElementSibling?.classList.remove(
      'playback-rate-pressed'
    )
  }

  useEffect(() => {
    if (!player.current) return
    return player.current?.subscribe(
      ({ currentTime, duration }: { currentTime: any; duration: any }) => {
        if (player.current) {
          player.current.getElementsByTagName('time')[1].textContent =
            formatTime(duration)
          player.current.getElementsByTagName('time')[0].textContent =
            formatTime(currentTime)
        }
      }
    )
  }, [])

  useEffect(() => {
    const playerRef = player.current
    if (playerRef) {
      playerRef.addEventListener('fullscreen-change', (event: any) => {
        const isFullscreen = event.detail
        if (!isFullscreen) window.scroll(0, scroll.current)
      })

      return () => {
        playerRef.removeEventListener('fullscreen-change', (event: any) => {
          const isFullscreen = event.detail
          if (!isFullscreen) window.scroll(0, scroll.current)
        })
      }
    }
  }, [])

  return (
    <MediaPlayer
      load="idle"
      title={title}
      ref={player}
      src={[{ src: video.url, type: video.mimeType }]}
      aspectRatio={16 / 9}
      style={{
        '--media-focus-ring': 'none'
      }}
      className={clsx(
        'relative z-[0] aspect-video w-full data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-brand',
        '[&:not([data-can-play])_.media-buffering-indicator]:flex [&[data-waiting]_.media-buffering-indicator]:flex',
        '[&[data-can-play]_.media-controls-container]:flex',
        '[&[data-user-idle]_.media-controls-container]:opacity-0',
        '[&:not([data-paused][data-user-idle])_.media-controls-container]:bg-black/50 [&[data-paused]_.media-controls-container]:bg-black/50',
        '[&:not([data-started=true])_.media-control-bottom]:hidden md:[&:not([data-started=true])_.media-control-bottom]:block'
      )}
    >
      <MediaOutlet>
        <MediaGesture
          className="h-full w-full"
          event="pointerup"
          action="toggle:paused"
        ></MediaGesture>

        <MediaGesture
          className="h-full w-full"
          event="dblpointerup"
          action="toggle:fullscreen"
        ></MediaGesture>
      </MediaOutlet>

      <div
        className="media-controls-container pointer-events-none absolute inset-0 z-[2] hidden flex-col justify-between p-4 duration-300 ease-out-quart [transition-property:opacity] md:p-8"
        role="group"
        aria-label="Controle de mídia"
      >
        <div className="media-control-top hidden justify-between md:flex">
          <div className="pointer-events-auto flex items-center">
            <ChevronRightIcon className="h-6 w-6 fill-white/92" />
            <span className="font-mono text-xs text-white/92 md:text-sm">
              {title}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              aria-label="Velocidade normal"
              onClick={onPlaybackRateNormal}
              className={clsx(
                'playback-rate-pressed group relative flex h-10 w-10 items-center justify-center font-mono text-xs text-white/92',
                'outline-2 outline-offset-2 outline-brand focus-visible:outline',
                'duration-300 ease-out-quart [transition-property:background]',
                'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16 [&.playback-rate-pressed]:bg-white/16'
              )}
            >
              1
              <div
                role="tooltip"
                className={clsx(
                  'pointer-events-none absolute right-0 top-full mt-3 flex min-h-[1.5rem] items-center whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-hover:opacity-100 group-focus-visible:opacity-100',
                  'duration-300 ease-out-quart [transition-property:opacity]',
                  'after:absolute after:bottom-full after:right-5 after:h-2 after:w-2 after:translate-x-1/2 after:translate-y-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                )}
              >
                <span className="font-mono text-xs text-black/92">
                  Velocidade normal
                </span>
              </div>
            </button>
            <button
              aria-label="Velocidade rápida"
              onClick={onPlaybackRateFaster}
              className={clsx(
                'group relative flex h-10 w-10 items-center justify-center font-mono text-xs text-white/92',
                'outline-2 outline-offset-2 outline-brand focus-visible:outline',
                'duration-300 ease-out-quart [transition-property:background]',
                'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16 [&.playback-rate-pressed]:bg-white/16'
              )}
            >
              2
              <div
                role="tooltip"
                className={clsx(
                  'pointer-events-none absolute right-0 top-full mt-3 flex min-h-[1.5rem] items-center whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-hover:opacity-100 group-focus-visible:opacity-100',
                  'duration-300 ease-out-quart [transition-property:opacity]',
                  'after:absolute after:bottom-full after:right-5 after:h-2 after:w-2 after:translate-x-1/2 after:translate-y-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                )}
              >
                <span className="font-mono text-xs text-black/92">
                  Velocidade rápida
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="media-control-middle flex flex-1 items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center md:hidden">
            <MediaPlayButton
              className={clsx(
                'group pointer-events-auto relative z-20 flex fill-white/92 p-2',
                'outline-2 outline-brand focus-visible:outline',
                'duration-300 ease-out-quart [transition-property:background]',
                'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16',
                '[&_svg]:shadow-none'
              )}
            >
              <PlayIcon
                className="h-6 w-6 group-[:not([data-paused])]:hidden group-[[data-paused][data-ended]]:hidden"
                {...{ slot: 'play' }}
              />
              <PauseIcon
                className="h-6 w-6 group-[:not([data-pressed])]:hidden"
                {...{ slot: 'pause' }}
              />
              <ReplayIcon
                className="h-6 w-6 group-[:not([data-ended])]:hidden"
                {...{ slot: 'replay' }}
              />
              <MediaTooltip
                className={clsx(
                  'pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-data-[hocus]:opacity-100',
                  'duration-300 ease-out-quart [transition-property:opacity]',
                  'after:absolute after:left-1/2 after:top-full after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                )}
              >
                <span
                  slot="play"
                  className="font-mono text-xs text-black/92 group-[[data-pressed]]:hidden"
                >
                  Reproduzir
                </span>
                <span
                  slot="pause"
                  className="font-mono text-xs text-black/92 group-[:not([data-pressed])]:hidden"
                >
                  Pausar
                </span>
              </MediaTooltip>
            </MediaPlayButton>
          </div>
        </div>
        <div className="media-control-bottom">
          <div>
            <div className="relative flex items-end justify-between text-white md:items-center">
              <time className="text-2xs pointer-events-auto font-mono sm:text-xs" />
              <time className="text-2xs pointer-events-auto hidden font-mono sm:text-xs md:inline" />
              <MediaFullscreenButton
                className={clsx(
                  'group pointer-events-auto relative z-20 flex fill-white/92 p-2 md:hidden',
                  'outline-2 outline-brand focus-visible:outline',
                  'duration-300 ease-out-quart [transition-property:background]',
                  'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16',
                  '[&_svg]:shadow-none'
                )}
                onClick={() => {
                  scroll.current = window.scrollY
                }}
              >
                <FullscreenIcon
                  className="h-6 w-6 group-[[data-fullscreen]]:hidden"
                  {...{ slot: 'enter' }}
                />
                <FullscreenExitIcon
                  aria-label="ubuntu"
                  className="h-6 w-6 group-[:not([data-fullscreen])]:hidden"
                  {...{ slot: 'exit' }}
                />
                <MediaTooltip
                  className={clsx(
                    'pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-data-[hocus]:opacity-100',
                    'duration-300 ease-out-quart [transition-property:opacity]',
                    'after:absolute after:right-5 after:top-full after:h-2 after:w-2 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                  )}
                >
                  <span
                    slot="enter"
                    className="font-mono text-xs text-black/92 group-[[data-fullscreen]]:hidden"
                  >
                    Entrar em tela cheia
                  </span>
                  <span
                    slot="exit"
                    className="font-mono text-xs text-black/92 group-[:not([data-fullscreen])]:hidden"
                  >
                    Sair da tela cheia
                  </span>
                </MediaTooltip>
              </MediaFullscreenButton>
            </div>

            <MediaTimeSlider
              className="group pointer-events-auto z-20 flex h-4 md:h-10 md:items-center"
              trackClass="absolute top-1/2 left-0 z-0 h-1 w-full -translate-y-1/2 bg-white/8 shadow-none"
              trackFillClass="absolute top-1/2 left-0 z-20 h-1 w-[var(--slider-fill-percent)] -translate-y-1/2 bg-brand will-change-[width]"
              trackProgressClass="absolute top-1/2 left-0 z-10 h-1 w-[var(--media-buffered-percent)] -translate-y-1/2 bg-white/16 will-change-[width]"
              thumbContainerClass="absolute top-0 left-[var(--slider-fill-percent)] z-20 h-full w-5 -translate-x-1/2 group-data-[dragging]:left-[var(--slider-pointer-percent)]"
              thumbClass="absolute top-1/2 left-0 h-5 w-5 -translate-y-1/2 rounded-full bg-brand opacity-0 group-data-[interactive]:opacity-100 group-data-[dragging]:outline group-data-[dragging]:outline-4 group-data-[dragging]:outline-white/16 group-data-[focus]:outline group-data-[focus]:outline-4 group-data-[focus]:outline-white/16"
            >
              <div
                className="pointer-events-none absolute bottom-full left-[var(--preview-left)] flex -translate-x-1/2 items-center justify-center border-2 border-brand bg-brand opacity-0 group-data-[interactive]:opacity-100 group-data-[interactive]:ease-in"
                slot="preview"
              >
                <MediaSliderVideo
                  className="aspect-video h-20 border-none md:h-auto"
                  src={video.url}
                />
              </div>
            </MediaTimeSlider>
          </div>

          <div className="relative z-20 hidden w-full justify-between md:flex">
            <div className="pointer-events-auto flex">
              <MediaPlayButton
                className={clsx(
                  'group relative mr-4 flex fill-white/92 p-2',
                  'outline-2 outline-brand focus-visible:outline',
                  'duration-300 ease-out-quart [transition-property:background]',
                  'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16',
                  '[&_svg]:shadow-none'
                )}
              >
                <PlayIcon
                  className="h-6 w-6 group-[:not([data-paused])]:hidden group-[[data-paused][data-ended]]:hidden"
                  {...{ slot: 'play' }}
                />
                <PauseIcon
                  className="h-6 w-6 group-[:not([data-pressed])]:hidden"
                  {...{ slot: 'pause' }}
                />
                <ReplayIcon
                  className="h-6 w-6 group-[:not([data-ended])]:hidden"
                  {...{ slot: 'replay' }}
                />
                <MediaTooltip
                  className={clsx(
                    'pointer-events-none absolute bottom-full left-0 mb-3 whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-data-[hocus]:opacity-100',
                    'duration-300 ease-out-quart [transition-property:opacity]',
                    'after:absolute after:left-5 after:top-full after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                  )}
                >
                  <span
                    slot="play"
                    className="font-mono text-xs text-black/92 group-[[data-pressed]]:hidden"
                  >
                    Reproduzir
                  </span>
                  <span
                    slot="pause"
                    className="font-mono text-xs text-black/92 group-[:not([data-pressed])]:hidden"
                  >
                    Pausar
                  </span>
                </MediaTooltip>
              </MediaPlayButton>
            </div>

            <div className="pointer-events-auto flex">
              <MediaFullscreenButton
                className={clsx(
                  'group relative flex fill-white/92 p-2',
                  'outline-2 outline-brand focus-visible:outline',
                  'duration-300 ease-out-quart [transition-property:background]',
                  'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16',
                  '[&_svg]:shadow-none'
                )}
                onClick={() => {
                  scroll.current = window.scrollY
                }}
              >
                <FullscreenIcon
                  className="h-6 w-6 group-[[data-fullscreen]]:hidden"
                  {...{ slot: 'enter' }}
                />
                <FullscreenExitIcon
                  className="h-6 w-6 group-[:not([data-fullscreen])]:hidden"
                  {...{ slot: 'exit' }}
                />
                <MediaTooltip
                  className={clsx(
                    'pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap bg-light px-2 opacity-0 shadow-md-bk group-data-[hocus]:opacity-100',
                    'duration-300 ease-out-quart [transition-property:opacity]',
                    'after:absolute after:right-5 after:top-full after:h-2 after:w-2 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-brand after:content-[""]'
                  )}
                >
                  <span
                    slot="enter"
                    className="font-mono text-xs text-black/92 group-[[data-fullscreen]]:hidden"
                  >
                    Entrar em tela cheia
                  </span>
                  <span
                    slot="exit"
                    className="font-mono text-xs text-black/92 group-[:not([data-fullscreen])]:hidden"
                  >
                    Sair da tela cheia
                  </span>
                </MediaTooltip>
              </MediaFullscreenButton>
            </div>
          </div>
        </div>
      </div>
    </MediaPlayer>
  )
}

export const VideoPlayer = memo(VideoPlayerComponent)

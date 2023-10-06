import clsx from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  FullscreenButton,
  PIPButton,
  PlayButton,
  useMediaState
} from '@vidstack/react'
import { PlayIcon } from '../icons/play'
import { ReplayIcon } from '../icons/replay'
import { PauseIcon } from '../icons/pause'
import { FullscreenIcon } from '../icons/fullscreen'
import { FullscreenExitIcon } from '../icons/fullscreen-exit'
import { PipIcon } from '../icons/pip'
import { PipExitIcon } from '../icons/pip-exit'

export interface MediaButtonProps {
  tooltipSide?: Tooltip.TooltipContentProps['side']
  tooltipAlign?: Tooltip.TooltipContentProps['align']
  tooltipOffset?: number
}

export function Play({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center'
}: MediaButtonProps) {
  const isPaused = useMediaState('paused')
  const isEnded = useMediaState('ended')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton
          className={clsx(
            'group relative flex fill-white/92 p-2',
            'outline-2 outline-brand focus-visible:outline',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16'
          )}
        >
          {isEnded ? (
            <ReplayIcon className="h-6 w-6" />
          ) : isPaused ? (
            <PlayIcon className="h-6 w-6" />
          ) : (
            <PauseIcon className="h-6 w-6" />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={clsx(
          'relative z-10 select-none rounded-none bg-black px-4 py-2 font-mono text-xs leading-none text-white/92 shadow-md-bk will-change-[transform,opacity]',
          'data-[state=delayed-open]:data-[side=bottom]:animate-[slide-down-and-fade_300ms] data-[state=delayed-open]:data-[side=left]:animate-[slide-left-and-fade_300ms] data-[state=delayed-open]:data-[side=right]:animate-[slide-right-and-fade_300ms] data-[state=delayed-open]:data-[side=top]:animate-[slide-up-and-fade_300ms] data-[state=delayed-open]:animation-ease-out-quart'
        )}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isPaused ? 'Reproduzir' : 'Pausar'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export function PIP({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center'
}: MediaButtonProps) {
  const isActive = useMediaState('pictureInPicture')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton
          className={clsx(
            'group relative flex fill-white/90 p-2',
            'outline-2 outline-brand focus-visible:outline',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-white/10 focus-visible:bg-white/10 active:bg-white/20'
          )}
        >
          {isActive ? (
            <PipExitIcon className="h-6 w-6" />
          ) : (
            <PipIcon className="h-6 w-6" />
          )}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={clsx(
          'select-none rounded-none bg-black px-4 py-2 font-mono text-xs leading-none text-white/92 shadow-md-bk will-change-[transform,opacity]',
          'data-[state=delayed-open]:data-[side=bottom]:animate-[slide-down-and-fade_300ms] data-[state=delayed-open]:data-[side=left]:animate-[slide-left-and-fade_300ms] data-[state=delayed-open]:data-[side=right]:animate-[slide-right-and-fade_300ms] data-[state=delayed-open]:data-[side=top]:animate-[slide-up-and-fade_300ms] data-[state=delayed-open]:animation-ease-out-quart'
        )}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive
          ? 'Sair do picture-in-picture'
          : 'Reproduzir em picture-in-picture'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export function Fullscreen({
  tooltipOffset = 0,
  tooltipSide = 'top',
  tooltipAlign = 'center'
}: MediaButtonProps) {
  const isActive = useMediaState('fullscreen')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton
          className={clsx(
            'group relative flex fill-white/90 p-2',
            'outline-2 outline-brand focus-visible:outline',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-white/10 focus-visible:bg-white/10 active:bg-white/20'
          )}
        >
          {isActive ? (
            <FullscreenExitIcon className="h-6 w-6" />
          ) : (
            <FullscreenIcon className="h-6 w-6" />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content
        className={clsx(
          'select-none rounded-none bg-black px-4 py-2 font-mono text-xs leading-none text-white/92 shadow-md-bk will-change-[transform,opacity]',
          'data-[state=delayed-open]:data-[side=bottom]:animate-[slide-down-and-fade_300ms] data-[state=delayed-open]:data-[side=left]:animate-[slide-left-and-fade_300ms] data-[state=delayed-open]:data-[side=right]:animate-[slide-right-and-fade_300ms] data-[state=delayed-open]:data-[side=top]:animate-[slide-up-and-fade_300ms] data-[state=delayed-open]:animation-ease-out-quart'
        )}
        side={tooltipSide}
        align={tooltipAlign}
        sideOffset={tooltipOffset}
      >
        {isActive ? 'Entrar da tela cheia' : 'Entrar em tela cheia'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

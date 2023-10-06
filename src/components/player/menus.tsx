import clsx from 'clsx'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useMediaPlayer, usePlaybackRateOptions } from '@vidstack/react'
import { SpeedIcon } from '../icons/speed'
import { RadioButtonUncheckedIcon } from '../icons/radio-button-unchecked'
import { RadioButtonCheckedIcon } from '../icons/radio-button-checked'

export interface MenuProps {
  side?: DropdownMenu.MenuContentProps['side']
  align?: DropdownMenu.MenuContentProps['align']
  offset?: DropdownMenu.MenuContentProps['sideOffset']
  tooltipSide?: Tooltip.TooltipContentProps['side']
  tooltipAlign?: Tooltip.TooltipContentProps['align']
  tooltipOffset?: number
}

export function PlaybackRate({
  side = 'bottom',
  align = 'end',
  offset = 0,
  tooltipSide = 'bottom',
  tooltipAlign = 'end',
  tooltipOffset = 0
}: MenuProps) {
  const player = useMediaPlayer()
  const options = usePlaybackRateOptions()

  const hint = options.selectedValue
  return (
    <DropdownMenu.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger
            aria-label="Velocidade"
            className={clsx(
              'group relative flex fill-white/92 p-2',
              'outline-2 outline-brand focus-visible:outline',
              'duration-300 ease-out-quart [transition-property:background]',
              'hover:bg-white/8 focus-visible:bg-white/8 active:bg-white/16'
            )}
            disabled={options.disabled}
          >
            <SpeedIcon className="h-6 w-6" />
          </DropdownMenu.Trigger>
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
          Velocidade
        </Tooltip.Content>
      </Tooltip.Root>

      <DropdownMenu.Content
        className={clsx(
          'z-[999999] flex max-h-[400px] w-60 flex-col bg-black/92 p-4 shadow-2xl-bk',
          'data-[state=open]:animate-[slide-down-and-fade_300ms] data-[state=open]:animation-ease-out-quart'
        )}
        side={side}
        align={align}
        sideOffset={offset}
        collisionBoundary={player?.el}
      >
        <DropdownMenu.Label className="relative mb-4 flex w-full items-center">
          <SpeedIcon className="mr-2 h-5 w-5 fill-white/92" />
          <span className="font-mono text-xs leading-none text-white/92">
            Velocidade
          </span>

          <span className="ml-auto font-mono text-xs leading-none text-white/50">
            {hint}
          </span>
        </DropdownMenu.Label>

        <DropdownMenu.RadioGroup
          aria-label="Velocidades"
          className="flex w-full flex-col gap-4"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

function Radio({ children, ...props }: DropdownMenu.MenuRadioItemProps) {
  return (
    <DropdownMenu.RadioItem
      className={clsx(
        'group relative ml-0.5 flex w-full cursor-pointer select-none items-center justify-start rounded-none',
        'outline-none outline-2 outline-offset-2 data-[highlighted]:outline data-[highlighted]:outline-brand'
      )}
      {...props}
    >
      <RadioButtonUncheckedIcon className="h-4 w-4 fill-white/92 group-data-[state=checked]:hidden" />
      <RadioButtonCheckedIcon
        className="hidden h-4 w-4 fill-white/92 group-data-[state=checked]:block"
        {...{
          type: 'radio-button-selected'
        }}
      />
      <span className="ml-2 font-mono text-xs leading-none text-white/92">
        {children}
      </span>
    </DropdownMenu.RadioItem>
  )
}

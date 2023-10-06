import * as Tooltip from '@radix-ui/react-tooltip'
import { Controls, Gesture } from '@vidstack/react'
import * as Buttons from '../buttons'
import * as Menus from '../menus'
import * as Sliders from '../sliders'
import { Title } from '../title'
import { TimeCurrent } from '../time-current'
import { TimeDuration } from '../time-duration'

// Offset tooltips/menus/slider previews in the lower controls group so they're clearly visible.
const popupOffset = 16

export interface VideoLayoutProps {
  title: string
  src: string
}
export function VideoLayout({ title, src }: VideoLayoutProps) {
  return (
    <>
      <Gestures />
      <Controls.Root className="absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent p-4 opacity-0 transition-opacity group-data-[fullscreen]:!p-4 media-controls:opacity-100 md:p-8 md:group-data-[fullscreen]:!p-8">
        <Tooltip.Provider>
          <div className="control-top grid grid-cols-2 group-data-[preview]:hidden md:group-data-[preview]:grid">
            <div className="hidden duration-300 ease-out-quart [transition-property:margin] group-data-[pip]:mt-10 md:flex">
              <Title title={title} />
            </div>

            <div className="col-start-2 flex justify-end">
              <Controls.Group>
                <Menus.PlaybackRate
                  offset={popupOffset}
                  tooltipOffset={popupOffset}
                />
              </Controls.Group>
            </div>
          </div>

          <div className="control-middle flex flex-1">
            <div className="m-auto block group-data-[preview]:hidden md:hidden">
              <Controls.Group>
                <Buttons.Play
                  tooltipAlign="center"
                  tooltipOffset={popupOffset}
                />
              </Controls.Group>
            </div>
          </div>

          <div className="control-bottom">
            <div className="grid group-data-[preview]:hidden md:group-data-[preview]:grid">
              <div className="flex items-end justify-start">
                <Controls.Group>
                  <TimeCurrent />
                </Controls.Group>
              </div>

              <div className="col-start-2 flex items-end justify-end">
                <Controls.Group className="hidden md:block">
                  <TimeDuration />
                </Controls.Group>

                <Controls.Group className="block md:hidden">
                  <Buttons.Fullscreen
                    tooltipAlign="end"
                    tooltipOffset={popupOffset}
                  />
                </Controls.Group>
              </div>
            </div>

            <Controls.Group>
              <Sliders.Time src={src} />
            </Controls.Group>

            <div className="hidden w-full items-center md:flex">
              <Controls.Group>
                <Buttons.Play
                  tooltipAlign="start"
                  tooltipOffset={popupOffset}
                />
              </Controls.Group>

              <div className="flex-1" />

              <div className="flex gap-4">
                <Controls.Group>
                  <Buttons.PIP tooltipAlign="end" tooltipOffset={popupOffset} />
                </Controls.Group>

                <Controls.Group>
                  <Buttons.Fullscreen
                    tooltipAlign="end"
                    tooltipOffset={popupOffset}
                  />
                </Controls.Group>
              </div>
            </div>
          </div>
        </Tooltip.Provider>
      </Controls.Root>
    </>
  )
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  )
}

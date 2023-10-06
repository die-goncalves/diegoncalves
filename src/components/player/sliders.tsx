import { useRef } from 'react'
import { TimeSlider, TimeSliderInstance } from '@vidstack/react'

interface ITime {
  src: string
}
export function Time({ src }: ITime) {
  const ref = useRef<TimeSliderInstance>(null)

  return (
    <TimeSlider.Root
      className="vds-time-slider vds-slider group mx-0 flex h-[6px] md:h-10"
      ref={ref}
      style={{
        '--track-height': '4px',
        '--track-focus-height': '6px',
        '--media-slider-track-border-radius': '0px',
        '--thumb-size': '20px'
        // '--media-slider-height': '40px'
        // '--height': '100px'
      }}
    >
      <TimeSlider.Chapters className="vds-slider-chapters">
        {(cues, forwardRef) =>
          cues.map(cue => (
            <div
              className="vds-slider-chapter"
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="vds-slider-track w-full bg-white/16" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track bg-brand" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track bg-white/24" />
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb
        aria-label="Tempo atual"
        className="vds-slider-thumb border-mark bg-white/92"
      />

      <TimeSlider.Preview className="pointer-events-none relative mb-4 flex flex-col items-center bg-black opacity-0 transition-opacity duration-200 will-change-[left] group-data-[pointing]:opacity-100 md:pointer-events-auto md:mb-0">
        <TimeSlider.Video
          className="box-content aspect-video h-20 group-data-[fullscreen]:!h-20 md:group-data-[fullscreen]:!h-40"
          src={src}
        />

        <TimeSlider.Value
          className="vds-slider-value absolute right-0 rounded-none bg-black font-mono text-xs"
          type="pointer"
          format="time"
        />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  )
}

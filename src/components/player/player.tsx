'use client'

import { useEffect, useRef, useState } from 'react'
import {
  MediaPlayer,
  MediaProvider,
  MediaPlayerInstance
} from '@vidstack/react'
import { VideoLayout } from './layouts/video-layout'

export interface IPlayer {
  title: string
  video: {
    id: string
    fileName: string
    mimeType: string
    url: string
  }
}
export function Player({ title, video }: IPlayer) {
  const player = useRef<MediaPlayerInstance>(null)
  const [src, setSrc] = useState<{ src: string; type: string }>({
    src: '',
    type: ''
  })

  useEffect(() => {
    setSrc({ src: video.url, type: video.mimeType })
  }, [video])

  return (
    <div className="relative flex aspect-video w-full bg-black">
      <MediaPlayer
        className="group aspect-video w-full bg-white/8 !outline-none data-[focus]:!outline-brand"
        title={title}
        src={[{ src: src.src, type: src.type }]}
        crossorigin
        load="idle"
        ref={player}
      >
        <MediaProvider />

        <VideoLayout title={title} src={src.src} />
      </MediaPlayer>
    </div>
  )
}

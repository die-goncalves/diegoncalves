'use client'

import { useRef } from 'react'
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
  let player = useRef<MediaPlayerInstance>(null)

  return (
    <MediaPlayer
      className="group aspect-video w-full overflow-hidden bg-black !outline-none data-[focus]:!outline-brand"
      title={title}
      src={[{ src: video.url, type: video.mimeType }]}
      crossorigin="true"
      ref={player}
    >
      <MediaProvider />

      <VideoLayout title={title} src={video.url} />
    </MediaPlayer>
  )
}

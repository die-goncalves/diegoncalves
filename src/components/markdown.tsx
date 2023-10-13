'use client'

import { HTMLAttributes } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { CH } from '@code-hike/mdx/components'
import { Hyperlink } from './hyperlink'
import { Player, IPlayer } from './player/player'
import Image, { ImageProps } from 'next/image'
import { CameraIcon } from './icons/camera'

type IPicture = ImageProps & {
  photographer?: string
  contact?: string
  fallback?: string
}

const components = {
  CH,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <div className="mx-auto mb-6 mt-8 max-w-4xl px-4 first:mt-0 md:px-16">
        <h2 className="font-sans text-2xl font-bold" {...props} />
      </div>
    )
  },
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <div className="mx-auto mb-3 mt-8 max-w-4xl px-4 first:mt-0 md:px-16">
        <h3 className="font-sans text-xl font-bold" {...props} />
      </div>
    )
  },
  p: (props: HTMLAttributes<HTMLParagraphElement>) => {
    return (
      <div className="mx-auto mb-4 max-w-4xl px-4 md:px-8">
        <p {...props} />
      </div>
    )
  },
  ul: (props: HTMLAttributes<HTMLUListElement>) => {
    return (
      <div className="mx-auto mb-4 max-w-4xl px-4 md:px-8">
        <ul className="list-inside list-disc font-serif text-base" {...props} />
      </div>
    )
  },
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => {
    return (
      <div className="mx-auto mb-4 max-w-4xl px-4 md:px-8">
        <blockquote
          className="border-l-4 border-teal-500 bg-black/8 px-4 dark:bg-white/8 [&_*]:mx-0 [&_*]:px-0"
          {...props}
        />
      </div>
    )
  },
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="border-[1px] border-black/16 bg-black/8 font-mono text-xs text-black/92 dark:border-white/16 dark:bg-white/8 dark:text-white/92"
      {...props}
    />
  ),
  ImageComponent: ({
    src,
    alt,
    fallback,
    photographer,
    contact,
    ...rest
  }: IPicture) => {
    return (
      <div className="mx-auto mb-4 max-w-4xl md:px-8">
        <figure>
          <div className="relative aspect-video w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              {...(fallback && {
                placeholder: 'blur',
                blurDataURL: fallback
              })}
              {...rest}
            />
          </div>
          {(alt || photographer) && (
            <figcaption className="flex flex-wrap items-start px-4 py-1 md:px-0">
              <CameraIcon className="mr-2 hidden h-6 w-6 flex-none fill-black/16 align-text-top dark:fill-white/16 sm:inline" />
              <p className="text-sm">{alt}</p>
              {alt && photographer && <p className="text-sm">&nbsp;--&nbsp;</p>}
              {photographer && <p className="text-sm">Foto:&nbsp;</p>}
              {photographer &&
                (contact ? (
                  <Hyperlink external href={contact} className="text-sm">
                    {photographer}
                  </Hyperlink>
                ) : (
                  <p className="text-sm">{photographer}</p>
                ))}
            </figcaption>
          )}
        </figure>
      </div>
    )
  },
  VideoComponent: (props: IPlayer) => {
    return (
      <div className="relative mx-auto mb-4 max-w-4xl md:px-8">
        <Player {...props} />
      </div>
    )
  },
  Hyperlink
}

interface IMarkdown {
  source: any
}
export function Markdown({ source }: IMarkdown) {
  return <MDXRemote {...source} components={components} />
}

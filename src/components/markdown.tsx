'use client'

import { HTMLAttributes } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { CH } from '@code-hike/mdx/components'
import { Hyperlink } from './hyperlink'
import { IPicture, Picture } from './picture'
import { Player, IPlayer } from './player/player'

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
  ImageComponent: (props: IPicture) => {
    return (
      <div className="mx-auto mb-4 max-w-4xl md:px-8">
        <Picture {...props} />
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

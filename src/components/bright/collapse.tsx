'use client'

import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import { ArrowIcon } from '../icons/arrow'

export function CollapseAnnotation({
  children,
  query
}: {
  children: ReactNode
  query: string
}) {
  const firstLine = React.Children.toArray(children)[0]
  const [isOpen, setIsOpen] = useState(query !== 'close')
  return (
    <div className="relative">
      <button
        className={clsx(
          'absolute top-[7px] h-[14px] w-[14px] fill-black/92 text-xs dark:fill-white/92',
          'rounded-none border-2 border-transparent outline-none focus-visible:border-brand active:border-brand'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ArrowIcon className="absolute -left-0.5 -top-0.5 h-[inherit] w-[inherit] -rotate-90" />
        ) : (
          <ArrowIcon className="absolute -left-0.5 -top-0.5 h-[inherit] w-[inherit] rotate-180" />
        )}
      </button>
      {isOpen ? children : <div>{firstLine}</div>}
    </div>
  )
}

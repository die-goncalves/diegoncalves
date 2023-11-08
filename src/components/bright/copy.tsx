'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { CheckIcon } from '../icons/check'
import { CopyIcon } from '../icons/copy'

export function Copy({
  code,
  classNames
}: {
  code: string
  classNames?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      aria-label="Copiar código"
      onClick={() => {
        navigator.clipboard
          .writeText(code)
          .then(() => {
            setCopied(true)

            setTimeout(() => {
              setCopied(false)
            }, 1000)
          })
          .catch(err => {
            console.log({ err })
          })
      }}
      disabled={copied}
      className={clsx(
        'z-10 flex h-10 w-10 items-center justify-center !rounded-none border-2 border-transparent fill-black/92 p-2 outline-none focus:border-brand disabled:cursor-not-allowed disabled:!fill-brand dark:fill-light/90',
        'duration-300 ease-out-quart [transition-property:background]',
        !copied &&
          'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
        classNames
      )}
    >
      {copied ? (
        <CheckIcon className="h-6 w-6" />
      ) : (
        <CopyIcon className="h-6 w-6" />
      )}
    </button>
  )
}

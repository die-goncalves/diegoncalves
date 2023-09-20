'use client'

import { MouseEventHandler } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  let { setTheme, theme } = useTheme()

  const onClick: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()

    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      aria-label="Trocar tema"
      className={clsx(
        'flex h-10 w-10 items-center justify-center p-2',
        'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
        'duration-300 ease-out-quart [transition-property:background]',
        'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
      )}
      onClick={onClick}
    >
      <svg
        className="relative "
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="rays"
          className={clsx(
            'relative origin-center fill-black/92 dark:fill-white/92',
            'rotate-90 duration-500 ease-out-back [transition-property:transform] dark:-rotate-90'
          )}
          d="M 12.000547,0.69 8.69,4.000546 H 4.000547 V 8.69 L 0.69,12.000546 4.000547,15.30914 v 4.691406 H 8.69 l 3.310547,3.308594 3.310547,-3.308594 h 4.689453 V 15.30914 L 23.311094,12.000546 20.000547,8.69 V 4.000546 h -4.689453 z m 0,5.310546 c 3.309997,0 6,2.690004 6,6 0,3.309997 -2.690003,6 -6,6 -3.309997,0 -6,-2.690003 -6,-6 0,-3.309996 2.690003,-6 6,-6 z"
        />
        <path
          id="circle"
          className={clsx(
            'fill-black/92 dark:fill-white/92',
            '-translate-x-1 duration-500 ease-out-back [transition-property:transform] dark:translate-x-0'
          )}
          d="m 12.000226,7.499956 c -2.486043,0 -4.499628,2.013585 -4.499628,4.499628 0,2.486043 2.013585,4.499627 4.499628,4.499627 2.486043,0 4.499628,-2.013584 4.499628,-4.499627 0,-2.486043 -2.013585,-4.499626 -4.499628,-4.499628 z"
        />
      </svg>
    </button>
  )
}

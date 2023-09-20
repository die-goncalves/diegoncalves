'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface INavigation {
  navLinks: { href: string; name: string }[]
}
export function Navigation({ navLinks }: INavigation) {
  const pathname = usePathname()

  return (
    <nav className="mx-4">
      <ul className="flex" role="menubar">
        {navLinks.map(link => {
          const isActive = pathname.startsWith(link.href)

          return (
            <li
              role="menuitem"
              className="mx-4 flex items-center justify-center rounded"
              key={link.name}
            >
              <Link
                className={clsx(
                  'flex h-10 items-center justify-center border-b-2 px-2',
                  'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                  'duration-300 ease-out-quart [transition-property:background]',
                  'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
                  isActive ? 'border-brand' : 'border-transparent'
                )}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

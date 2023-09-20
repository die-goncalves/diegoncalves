import clsx from 'clsx'
import Link from 'next/link'
import { GithubIcon } from './icons/github'
import { LinkedinIcon } from './icons/linkedin'

export function Footer() {
  return (
    <footer className="mx-auto mt-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 py-6 font-serif sm:flex-row md:px-8 lg:px-12 xl:px-24">
      <span>© 2023, Diego Gonçalves.</span>

      <div className="flex items-center gap-8">
        <Link
          className={clsx(
            'relative flex h-10 w-10 items-center justify-center p-2',
            'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
          )}
          href="https://www.linkedin.com/in/diego-goncalves1990"
          target="_blank"
        >
          <LinkedinIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
        </Link>

        <Link
          className={clsx(
            'relative flex h-10 w-10 items-center justify-center p-2',
            'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
          )}
          href="https://github.com/die-goncalves"
          target="_blank"
        >
          <GithubIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
        </Link>
      </div>
    </footer>
  )
}

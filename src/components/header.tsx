import Link from 'next/link'
import clsx from 'clsx'
import { Navigation } from './navigation'
import { Menu } from './menu'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="mx-auto flex max-w-screen-2xl justify-between bg-light px-4 py-6 text-black/92 dark:bg-dark dark:text-white/92 md:px-8 lg:px-12 xl:px-24">
      <div className="md:hidden">
        <Menu />
      </div>

      <Link
        aria-label="Página inicial Diego Gonçalves"
        className={clsx(
          'relative flex h-10 items-center',
          'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
          '[transition:background_150ms_ease-out]',
          'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
        )}
        href={'/'}
      >
        <svg
          viewBox="0 0 40 40"
          preserveAspectRatio="xMidYMid meet"
          className="h-10 w-10 fill-black/92 dark:fill-white/92"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.87485 11.6H10.3948C16.1788 11.6 19.7548 14.72 19.7548 20C19.7548 25.28 16.1788 28.4 10.3948 28.4H4.87485V11.6ZM8.71485 24.752H10.3948C14.0908 24.752 15.7708 22.928 15.7708 20C15.7708 17.072 14.0908 15.248 10.3948 15.248H8.71485V24.752ZM34.6451 16.304C33.0611 15.608 31.7891 15.008 30.0851 15.008C26.8932 15.008 24.9011 17.12 24.9011 20C24.9011 22.856 26.8211 24.992 29.8931 24.992C30.3731 24.992 30.8291 24.944 31.2851 24.848V19.928H35.1252V27.656C33.7572 28.136 31.8611 28.688 29.8451 28.688C24.6852 28.688 20.9651 25.04 20.9651 20C20.9651 14.96 24.6851 11.312 29.9651 11.312C31.8131 11.312 33.3971 11.744 34.6451 12.272V16.304Z" />
        </svg>

        <p className="pointer-events-none mx-1 hidden whitespace-nowrap md:block">
          Diego Gonçalves
        </p>
      </Link>

      <div className="flex">
        <div className="hidden md:flex">
          <Navigation
            navLinks={[
              { href: '/projetos', name: 'Projetos' },
              { href: '/artigos', name: 'Artigos' },
              { href: '/sobre', name: 'Sobre' },
              { href: '/contato', name: 'Contato' }
            ]}
          />
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}

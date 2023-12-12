'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import * as Dialog from '@radix-ui/react-dialog'
import { MenuIcon } from './icons/menu'
import { CloseIcon } from './icons/close'

export function Menu() {
  const pathname = usePathname()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          aria-label="Abrir menu de navegação"
          className={clsx(
            'relative flex h-10 w-10 items-center justify-center p-2',
            'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
            'duration-300 ease-out-quart [transition-property:background]',
            'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
          )}
        >
          <MenuIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[fade-out_300ms] data-[state=open]:animate-[fade-in_300ms] data-[state=open]:backdrop-blur-sm data-[state=closed]:animation-ease-out-quart data-[state=open]:animation-ease-out-quart" />
        <Dialog.Content asChild aria-describedby={undefined} aria-modal>
          <aside
            className={clsx(
              'z-10 bg-light dark:bg-dark',
              'fixed bottom-0 left-0 right-[10%] top-0 flex flex-col gap-8',
              'data-[state=closed]:animate-[slide-out_300ms] data-[state=open]:animate-[slide-in_300ms] data-[state=closed]:animation-ease-out-quart data-[state=open]:animation-ease-out-quart'
            )}
          >
            <Dialog.Title className="flex h-[88px] items-center px-4 py-6 font-sans text-base font-medium">
              Menu
            </Dialog.Title>
            <nav className="flex flex-col gap-4 px-4">
              <Dialog.Close asChild>
                <Link
                  className={clsx(
                    'flex h-10 items-center justify-center px-2',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
                    pathname.startsWith('/projetos') &&
                      'before:mr-2 before:h-0.5 before:flex-1 before:bg-brand after:ml-2 after:h-0.5 after:flex-1 after:bg-brand'
                  )}
                  href={'/projetos'}
                >
                  Projetos
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link
                  className={clsx(
                    'flex h-10 items-center justify-center px-2',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
                    pathname.startsWith('/artigos') &&
                      'before:mr-2 before:h-0.5 before:flex-1 before:bg-brand after:ml-2 after:h-0.5 after:flex-1 after:bg-brand'
                  )}
                  href={'/artigos'}
                >
                  Artigos
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link
                  className={clsx(
                    'flex h-10 items-center justify-center px-2',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
                    pathname.startsWith('/sobre') &&
                      'before:mr-2 before:h-0.5 before:flex-1 before:bg-brand after:ml-2 after:h-0.5 after:flex-1 after:bg-brand'
                  )}
                  href={'/sobre'}
                >
                  Sobre
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link
                  className={clsx(
                    'flex h-10 items-center justify-center px-2',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16',
                    pathname.startsWith('/contato') &&
                      'before:mr-2 before:h-0.5 before:flex-1 before:bg-brand after:ml-2 after:h-0.5 after:flex-1 after:bg-brand'
                  )}
                  href={'/contato'}
                >
                  Contato
                </Link>
              </Dialog.Close>
            </nav>
            <Dialog.Close asChild>
              <button
                aria-label="Fechar menu de navegação"
                className={clsx(
                  'absolute right-0 top-0 flex h-10 w-10 -translate-x-4 translate-y-6 items-center justify-center p-2',
                  'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                  'duration-300 ease-out-quart [transition-property:background]',
                  'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
                )}
              >
                <CloseIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
              </button>
            </Dialog.Close>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

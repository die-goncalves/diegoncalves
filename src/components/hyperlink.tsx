import Link from 'next/link'
import type { ComponentProps } from 'react'
import clsx from 'clsx'
import { OpenNewIcon } from './icons/open-new'

type LinkType = ComponentProps<typeof Link>
interface HyperlinkProps extends LinkType {
  external?: boolean
}
export function Hyperlink({
  external,
  children,
  className,
  ...props
}: HyperlinkProps) {
  return (
    <Link
      className={clsx(
        'underline decoration-solid decoration-auto underline-offset-2',
        'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
        'font-medium text-light/link-primary visited:text-light/link-secondary dark:text-dark/link-primary dark:visited:text-dark/link-secondary',
        'hover:no-underline focus-visible:no-underline',
        className
      )}
      {...(external && {
        target: '_blank'
      })}
      {...props}
    >
      {children}
      {external && (
        <OpenNewIcon className="inline h-3 w-3 fill-black/92 align-text-top dark:fill-white/92" />
      )}
    </Link>
  )
}

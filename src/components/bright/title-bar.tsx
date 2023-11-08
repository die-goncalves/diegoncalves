import { BrightProps } from 'bright'
import { Copy } from './copy'

export function Title(props: BrightProps) {
  const { title, code } = props

  return (
    <div className="flex h-10 w-full justify-between gap-4 bg-white dark:bg-[#0d1117] [&+div]:!h-0">
      <div
        title={title}
        className="flex max-w-[calc(100%-56px)] items-center border-b-2 border-brand px-[1em]"
      >
        <span className="truncate break-keep !text-black/92 dark:!text-white/92">
          {title}
        </span>
      </div>

      <Copy code={code} />
    </div>
  )
}

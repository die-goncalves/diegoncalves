import { ChevronRightIcon } from '../icons/chevron-right'

interface ITitle {
  title: string
}
export function Title({ title }: ITitle) {
  return (
    <div className="pointer-events-auto inline-flex items-center">
      <ChevronRightIcon className="h-6 w-6 fill-white/92" />
      <span className="font-mono text-sm text-white/92">{title}</span>
    </div>
  )
}

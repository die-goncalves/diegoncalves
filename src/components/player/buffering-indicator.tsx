import { ProgressActivityIcon } from '../icons/progress-activity'

export function BufferingIndicator() {
  return (
    <div className="vds-buffering-indicator z-50">
      <ProgressActivityIcon className="vds-buffering-icon fill-white/92" />
    </div>
  )
}

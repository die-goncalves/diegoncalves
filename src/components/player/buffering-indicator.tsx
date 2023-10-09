import { ProgressActivityIcon } from '../icons/progress-activity'

export function BufferingIndicator() {
  return (
    <div className="vds-buffering-indicator">
      <ProgressActivityIcon className="vds-buffering-icon fill-white/92" />
    </div>
  )
}

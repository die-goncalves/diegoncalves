interface PlayIconProps {
  className?: string
}
export function PlayIcon({ className }: PlayIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M8 19V5L19 12L8 19Z" />
    </svg>
  )
}

interface PauseIconProps {
  className?: string
}
export function PauseIcon({ className }: PauseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M14 19V5H18V19H14ZM6 19V5H10V19H6Z" />
    </svg>
  )
}

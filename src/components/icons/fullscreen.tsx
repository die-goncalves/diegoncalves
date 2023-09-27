interface FullscreenIconProps {
  className?: string
}
export function FullscreenIcon({ className }: FullscreenIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M5 19V14H7V17H10V19H5ZM5 10V5H10V7H7V10H5ZM14 19V17H17V14H19V19H14ZM17 10V7H14V5H19V10H17Z" />
    </svg>
  )
}

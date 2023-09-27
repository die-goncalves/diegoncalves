interface FullscreenExitIconProps {
  className?: string
}
export function FullscreenExitIcon({ className }: FullscreenExitIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M8 19V16H5V14H10V19H8ZM14 19V14H19V16H16V19H14ZM5 10V8H8V5H10V10H5ZM14 10V5H16V8H19V10H14Z" />
    </svg>
  )
}

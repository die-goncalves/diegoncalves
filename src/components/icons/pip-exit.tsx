interface PipExitIconProps {
  className?: string
}
export function PipExitIcon({ className }: PipExitIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M2 20V11H11V4H22V20H2ZM17.075 16.5L18.5 15.075L15.4 12H18V10H12V16H14V13.425L17.075 16.5ZM2 9V4H9V9H2Z" />
    </svg>
  )
}

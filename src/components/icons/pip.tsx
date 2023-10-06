interface PipIconProps {
  className?: string
}
export function PipIcon({ className }: PipIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M22 4V13L13 13L13 20L2 20L2 4L22 4ZM6.925 7.5L5.5 8.925L8.6 12L6 12V14L12 14L12 8H10V10.575L6.925 7.5ZM22 15V20L15 20L15 15L22 15Z" />
    </svg>
  )
}

interface CopyIconProps {
  className?: string
}
export function CopyIcon({ className }: CopyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M7 18V2H20V18H7ZM9 16H18V4H9V16ZM3 22V6H5V20H16V22H3Z" />
    </svg>
  )
}

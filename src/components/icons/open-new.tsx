interface OpenNewIconProps {
  className?: string
}
export function OpenNewIcon({ className }: OpenNewIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M3 21V3H12V5H5V19H19V12H21V21H3ZM9.7 15.7L8.3 14.3L17.6 5H14V3H21V10H19V6.4L9.7 15.7Z" />
    </svg>
  )
}

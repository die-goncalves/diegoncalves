interface ArrowIconProps {
  className?: string
}
export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" />
    </svg>
  )
}

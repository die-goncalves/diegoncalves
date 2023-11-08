interface CheckIconProps {
  className?: string
}
export function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M9.55001 18L3.85001 12.3L5.27501 10.875L9.55001 15.15L18.725 5.975L20.15 7.4L9.55001 18Z" />
    </svg>
  )
}

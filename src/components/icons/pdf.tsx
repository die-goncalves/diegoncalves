interface PDFIconProps {
  className?: string
}
export function PDFIcon({ className }: PDFIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M4 22V2H14L20 8V22H4ZM13 9V4H6V20H18V9H13Z" />
      <path d="M7 18H8V16H9.5L10 15.5V13.5L9.5 13H7V18ZM8 15V14H9V15H8ZM11 18H13.5L14 17.5V13.5L13.5 13H11V18ZM12 17V14H13V17H12ZM15 18H16V16H17V15H16V14H17V13H15V18Z" />
    </svg>
  )
}

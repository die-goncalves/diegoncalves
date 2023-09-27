interface TimerIconProps {
  className?: string
}
export function TimerIcon({ className }: TimerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      {...(className && {
        className
      })}
    >
      <path d="M9 3V1H15V3H9ZM9.925 14.4L8.625 12H3.05C3.3 9.75 4.275 7.85417 5.975 6.3125C7.675 4.77083 9.68334 4 12 4C13.0333 4 14.025 4.16667 14.975 4.5C15.925 4.83333 16.8167 5.31667 17.65 5.95L19.05 4.55L20.45 5.95L19.05 7.35C19.5833 8.05 20.0083 8.7875 20.325 9.5625C20.6417 10.3375 20.85 11.15 20.95 12H16.6L14 7.25L9.925 14.4ZM12 22C9.68334 22 7.675 21.2292 5.975 19.6875C4.275 18.1458 3.3 16.25 3.05 14H7.4L10 18.75L14.075 11.6L15.375 14H20.95C20.7 16.25 19.7292 18.1458 18.0375 19.6875C16.3458 21.2292 14.3333 22 12 22Z" />
    </svg>
  )
}

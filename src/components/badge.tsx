interface IBadge {
  label: string
}
export function Badge({ label }: IBadge) {
  return (
    <div className="flex items-center justify-center bg-black/8 px-4 lowercase dark:bg-white/8">
      <span className="text-sm font-semibold">{label}</span>
    </div>
  )
}

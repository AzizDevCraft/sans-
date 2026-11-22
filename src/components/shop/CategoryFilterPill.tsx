import { cn } from "@/lib/utils"

interface CategoryFilterPillProps {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

export function CategoryFilterPill({
  label,
  count,
  active,
  onClick,
}: CategoryFilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full py-2.5 text-base leading-6 font-semibold",
        active
          ? "bg-primary px-6 text-primary-foreground"
          : "border border-ring px-5 text-foreground"
      )}
    >
      <span>{label}</span>
      <span className="text-card-alt-foreground">{count}</span>
    </button>
  )
}

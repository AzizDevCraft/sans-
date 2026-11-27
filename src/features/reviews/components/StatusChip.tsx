import type { Ref } from "react"

import { handleRadioKeyDown } from "@/lib/radio-group"
import { cn } from "@/lib/utils"

type StatusChipProps = {
  label: string
  /** État coché (accessibilité). */
  selected: boolean
  /** Roving tabindex : seule l'option tabulable (cochée, sinon la première) vaut `true`. */
  tabbable: boolean
  onSelect?: () => void
  ref?: Ref<HTMLButtonElement>
}

export default function StatusChip({
  label,
  selected,
  tabbable,
  onSelect,
  ref,
}: StatusChipProps) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabbable ? 0 : -1}
      onClick={onSelect}
      onKeyDown={handleRadioKeyDown}
      className={cn(
        "rounded-full border border-ring px-3 py-1 text-xs font-medium capitalize transition-colors duration-300 ease-out motion-reduce:transition-none",
        selected ? "bg-ring text-muted" : "text-muted-foreground hover:bg-ring hover:text-muted"
      )}
    >
      {label}
    </button>
  )
}

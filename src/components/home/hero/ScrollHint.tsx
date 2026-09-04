import { ChevronDownIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface ScrollHintProps {
  label: string
  className?: string
}

/** Indice de défilement du hero. Suppose un ancêtre `.dark`. */
export function ScrollHint({ label, className }: ScrollHintProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className="text-[12px]/[15px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <ChevronDownIcon aria-hidden="true" className="size-5 text-muted-foreground" />
    </div>
  )
}
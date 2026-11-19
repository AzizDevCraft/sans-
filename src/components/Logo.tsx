import { cn } from "@/lib/utils"

export interface LogoProps {
  size?: "sm" | "md"
  tone?: "default" | "cream"
  className?: string
}

export function Logo({ size = "md", tone = "default", className }: LogoProps) {
  return (
    <span
      aria-label="SANS+"
      className={cn(
        "inline-flex items-baseline font-heading font-bold tracking-tight",
        size === "sm" ? "text-2xl" : "text-3xl",
        tone === "cream" ? "text-secondary-foreground" : "text-card-foreground",
        className
      )}
    >
      SANS
      <span
        aria-hidden
        className={tone === "cream" ? "text-card-foreground" : "text-card-alt-foreground dark:text-chart-1"}
      >
        +
      </span>
    </span>
  )
}

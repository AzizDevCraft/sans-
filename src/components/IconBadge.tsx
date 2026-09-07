import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface IconBadgeProps {
  /** Contenu = le composant icône (dimensionné à 40×40 par défaut ici, soit `size-10`). */
  children: ReactNode
  /**
   * Taille du carré / cercle :
   * - `sm` ≈ 56 (mobile/tablet engagement, quiz, navigation)
   * - `md` ≈ 64 (promesses)
   * - `lg` ≈ 72 (desktop engagement / quiz / navigation)
   */
  size?: "sm" | "md" | "lg"
  /**
   * Fond :
   * - `card` → vert pistache clair (`bg-card`)
   * - `card-alt` → rosé chaud (`bg-card-alt`)
   * - `surface` → blanc (`bg-background`), utilisé avec `elevated`
   */
  tone?: "card" | "card-alt" | "surface"
  /** `rounded` = carré à coins arrondis (rayon 8 = `rounded-md`) ; `full` = cercle (quiz). */
  shape?: "rounded" | "full"
  /**
   * Ombre portée (engagement / navigation / quiz).
   * ⚠ DESIGN.md n'a AUCUNE spec d'ombres (§5). `shadow-lg` (preset Tailwind) est
   * utilisé faute de token de marque — à remplacer par un token quand DESIGN.md
   * en définira un (voir rapport, point « ombres »).
   */
  elevated?: boolean
  /**
   * Padding interne autour de l'icône :
   * - `md` → `p-3` (12px) : promesses / ingredients
   * - `sm` → `p-1` (4px)  : engagement / navigation / quiz
   */
  inset?: "sm" | "md"
  className?: string
}

const sizeClasses: Record<NonNullable<IconBadgeProps["size"]>, string> = {
  sm: "size-14",
  md: "size-16",
  lg: "size-18",
}

const toneClasses: Record<NonNullable<IconBadgeProps["tone"]>, string> = {
  card: "bg-card text-card-foreground",
  "card-alt": "bg-card-alt text-card-alt-foreground",
  surface: "bg-background text-foreground",
}

export function IconBadge({
  children,
  size = "md",
  tone = "card",
  shape = "rounded",
  elevated = false,
  inset = "md",
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center [&>svg]:size-10",
        sizeClasses[size],
        toneClasses[tone],
        shape === "full" ? "rounded-full" : "rounded-sm",
        inset === "sm" ? "p-1" : "p-3",
        elevated && "shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface SectionHeadingProps {
  /** Libellé de l'eyebrow (petit label uppercase précédé d'un trait). */
  eyebrow?: string
  /** Titre. `ReactNode` pour permettre le mot accentué  */
  title: ReactNode
  /** Sous-titre / phrase d'accroche sous le titre. */
  subtitle?: ReactNode
  /** Alignement du bloc. `start` = aligné à gauche, `center` = centré. */
  align: "start" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 shrink-0 bg-card-foreground" />
          <span className="font-semibold xl:font-medium uppercase tracking-wider text-card-foreground md:text-[20px]/[30px] xl:text-2xl/[31px]">
            {eyebrow}
          </span>
          {align === "center" ? (
            <span className="h-0.5 w-8 shrink-0 bg-card-foreground" />
          ) : null}
        </div>
      ) : null}

      <h2 className="text-foreground font-semibold xl:font-medium text-[28px] leading-8.75 md:text-[32px] md:leading-12 xl:text-5xl xl:leading-14">
        {title}
      </h2>

      {subtitle ? (
        <p className="text-muted-foreground leading-6.5 md:text-xl md:leading-7.5 xl:text-2xl xl:leading-7.75">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

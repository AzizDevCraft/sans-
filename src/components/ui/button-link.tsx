"use client"

import type * as React from "react"
import Link from "next/link"

import { useArrowHover, useFlipHover } from "@/hooks/use-button-hover-effect"
import { cn } from "@/lib/utils"

import { buttonVariants, type ButtonVariantProps } from "./button"

// Propre à `ButtonLink` — `Button` (vrai `<button>` natif) n'a aucun usage
// pour `arrow`/`flip` (animés en GSAP, balisage dédié ci-dessous) et ne peut
// pas les rendre ; pas de raison de les garder dans `buttonVariants`/`Button`.
// `none`/`classic` restent partagés en esprit (même rendu), mais chaque
// composant les déclare pour son propre usage plutôt que via un axe cva commun.
type ButtonLinkHoverEffect = "none" | "classic" | "arrow" | "flip"

const HOVER_EFFECT_CLASSES: Record<ButtonLinkHoverEffect, string> = {
  none: "",
  classic: "hover:bg-accent hover:text-accent-foreground",
  arrow: "",
  flip: "",
}

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  Omit<ButtonVariantProps, "hoverEffect"> & {
    /** Effet de survol — `arrow`/`flip` animés en GSAP, `classic` en CSS pur. */
    hoverEffect?: ButtonLinkHoverEffect
  }

function FlipLabel({ children }: { children?: React.ReactNode }) {
  const { scopeRef, frontRef, backRef } = useFlipHover()

  return (
    <span ref={scopeRef} className="relative inline-grid overflow-hidden">
      <span ref={frontRef} className="col-start-1 row-start-1">
        {children}
      </span>
      <span ref={backRef} aria-hidden="true" className="col-start-1 row-start-1">
        {children}
      </span>
    </span>
  )
}

function ArrowLabel({
  trailingIcon,
  children,
}: {
  trailingIcon: React.ReactNode
  children?: React.ReactNode
}) {
  const { rowRef, textRef, iconRef } = useArrowHover()

  return (
    <span ref={rowRef} className="flex items-center gap-2 overflow-hidden">
      <span ref={textRef}>{children}</span>
      <span ref={iconRef} data-icon="inline-end" className="inline-flex shrink-0">
        {trailingIcon}
      </span>
    </span>
  )
}

/**
 * CTA de navigation stylé comme un `Button` — un vrai `<a>` (`next/link`),
 * aucun contact avec `@base-ui/react/button` : pas de `nativeButton`, pas de
 * warning dev, pas d'attribut `type` invalide sur un lien. Réutilise
 * `buttonVariants` (`variant`/`size`, source unique partagée avec `Button`)
 * et ajoute son propre `hoverEffect` (`classic` en CSS, `arrow`/`flip`
 * animés en GSAP — voir `@/hooks/use-button-hover-effect`), une
 * fonctionnalité que `Button` n'a pas et ne rend pas.
 *
 * À utiliser pour tout CTA qui navigue (remplace `Button render={<Link/>}`).
 */
function ButtonLink({
  className,
  variant = "default",
  size = "default",
  hoverEffect = "none",
  fullWidth = false,
  trailingIcon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        HOVER_EFFECT_CLASSES[hoverEffect],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {hoverEffect === "arrow" && trailingIcon != null ? (
        <ArrowLabel trailingIcon={trailingIcon}>{children}</ArrowLabel>
      ) : (
        <>
          {hoverEffect === "flip" ? <FlipLabel>{children}</FlipLabel> : children}
          {trailingIcon != null ? (
            <span data-icon="inline-end" className="inline-flex shrink-0">
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </Link>
  )
}

export { ButtonLink }
export type { ButtonLinkProps }

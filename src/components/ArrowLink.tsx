import type { ReactNode } from "react"
import type { Route } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import ArrowRightIcon from "./icons/ArrowRightIcon"

export interface ArrowLinkProps {
  /**
   * Destination du lien. Omis → rendu non-interactif (`<span>`), pour les cas
   * où le clic est déjà porté par un ancêtre (ex. carte catégorie recouverte
   * d'un lien qui englobe toute la carte — voir `CategorySection`).
   */
  href?: string
  /** Libellé (« Explorer », « Découvrir », « Commencer », « En savoir plus »). */
  children: ReactNode
  className?: string
}

// Hover posé sur `group-hover` : réagit au survol du BLOC ancêtre
// (`className="group"` sur la carte/le conteneur qui englobe ce composant),
// pas seulement au survol du lien/texte lui-même. Toute utilisation
// d'`ArrowLink` partage ce comportement — un seul endroit à modifier.
const ARROW_LINK_CLASSES =
  "inline-flex origin-left items-center gap-2 p-1 font-semibold text-foreground transition-all duration-200 group-hover:scale-105 group-hover:gap-3"

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  const content = (
    <>
      {children}
      <ArrowRightIcon className="size-5 shrink-0" />
    </>
  )

  if (href == null) {
    return (
      <span className={cn(ARROW_LINK_CLASSES, className)}>{content}</span>
    )
  }

  return (
    // `as Route` : `href` est dynamique (donnée), `typedRoutes` ne peut pas
    // le vérifier contre l'union de routes connues au build.
    <Link href={href as Route} className={cn(ARROW_LINK_CLASSES, className)}>
      {content}
    </Link>
  )
}

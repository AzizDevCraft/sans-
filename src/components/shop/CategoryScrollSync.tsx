import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

import { ALL_FILTER_SLUG } from "@/lib/shop/filter"

interface CategoryScrollSyncProps {
  /** Slug demandé, tel qu'appliqué localement (peut être inconnu). */
  requestedSlug: string
  /** Slug effectivement actif (repli sur « Tous » si inconnu). */
  activeSlug: string
  onCategoryChange: (slug: string) => void
}

/**
 * Ne rend rien : applique les changements d'URL entrants (lien, retour/avance) et scrolle
 * vers la section. Un changement déjà appliqué localement (clic sur une pill) ne scrolle pas.
 */
export function CategoryScrollSync({
  requestedSlug,
  activeSlug,
  onCategoryChange,
}: CategoryScrollSyncProps) {
  const categoryParam = useSearchParams().get("category")
  const appliedSlugRef = useRef(requestedSlug)
  const pendingScrollRef = useRef<string | null>(null)

  // Déclaré avant l'effet d'URL : la ref est à jour quand l'URL suit un clic.
  useEffect(() => {
    appliedSlugRef.current = requestedSlug
  }, [requestedSlug])

  useEffect(() => {
    const target = categoryParam ?? ALL_FILTER_SLUG
    // Déjà appliqué : l'URL vient d'un clic local.
    if (target === appliedSlugRef.current) return

    appliedSlugRef.current = target
    pendingScrollRef.current = target === ALL_FILTER_SLUG ? null : target
    onCategoryChange(target)
  }, [categoryParam, onCategoryChange])

  // Effet séparé : le scroll doit s'exécuter après le commit du filtre.
  useEffect(() => {
    const pending = pendingScrollRef.current
    if (!pending || activeSlug !== pending) return
    pendingScrollRef.current = null

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document
      .getElementById(pending)
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
  }, [activeSlug])

  return null
}

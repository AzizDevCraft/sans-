"use client"

import { useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

/**
 * Cherche la racine du bouton/lien (posée via `data-slot="button"`, portée
 * par un `<button>` natif ou par un `<a>` via `next/link`) à partir d'un
 * élément interne, et y branche les écouteurs de survol. Le déclencheur est
 * TOUJOURS l'élément entier, jamais seulement le fragment qu'on anime.
 */
function attachHoverTrigger(
  fromEl: HTMLElement,
  onEnter: () => void,
  onLeave: () => void
) {
  const trigger = fromEl.closest<HTMLElement>('[data-slot="button"]')
  if (!trigger) return undefined

  trigger.addEventListener("mouseenter", onEnter)
  trigger.addEventListener("mouseleave", onLeave)
  return () => {
    trigger.removeEventListener("mouseenter", onEnter)
    trigger.removeEventListener("mouseleave", onLeave)
  }
}

const HOVER_DURATION = 0.3
const HOVER_EASE = "power2.out"

/**
 * `hoverEffect="flip"` — roue verticale : deux copies du même contenu
 * empilées (CSS Grid, même cellule). Au survol du bouton/lien entier, la
 * copie visible sort par le haut pendant qu'une copie masquée entre par le
 * bas — même contenu, un seul sens de mouvement.
 *
 * À poser sur : conteneur `relative inline-grid overflow-hidden` (`scopeRef`)
 * contenant deux enfants directs `col-start-1 row-start-1` identiques
 * (`frontRef`/`backRef`).
 */
export function useFlipHover() {
  const scopeRef = useRef<HTMLSpanElement>(null)
  const frontRef = useRef<HTMLSpanElement>(null)
  const backRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (!scopeRef.current || !frontRef.current || !backRef.current) return

      gsap.set(backRef.current, { yPercent: 100 })

      const tl = gsap
        .timeline({ paused: true })
        .to(frontRef.current, { yPercent: -100, duration: HOVER_DURATION, ease: HOVER_EASE }, 0)
        .to(backRef.current, { yPercent: 0, duration: HOVER_DURATION, ease: HOVER_EASE }, 0)

      return attachHoverTrigger(
        scopeRef.current,
        () => tl.play(),
        () => tl.reverse()
      )
    },
    { scope: scopeRef }
  )

  return { scopeRef, frontRef, backRef }
}

/**
 * `hoverEffect="arrow"` :
 *  - **entrée** : la flèche sort seule vers la droite (`power2.out`) puis
 *    réapparaît hors champ à gauche (téléportation instantanée — « rentre
 *    par derrière ») et rentre en poussant le texte devant elle, même
 *    mouvement, rebond `elastic.out`.
 *  - **sortie** : retour direct des deux éléments à leur place (`x: 0`),
 *    sans traverser le bouton ni se recroiser, sans élastique.
 * Largeurs mesurées en DOM (`offsetWidth`/`columnGap`) à chaque survol
 * plutôt que codées en dur : s'adapte à toute taille d'icône/longueur de texte.
 *
 * À poser sur : conteneur `flex items-center gap-* overflow-hidden`
 * (`rowRef`) contenant `textRef` (le texte) puis `iconRef` (l'icône), dans
 * cet ordre.
 */
export function useArrowHover() {
  const rowRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      if (!rowRef.current || !textRef.current || !iconRef.current) return

      const row = rowRef.current
      const textEl = textRef.current
      const iconEl = iconRef.current

      const playHover = () => {
        tlRef.current?.kill()

        const gapPx = parseFloat(getComputedStyle(row).columnGap || "0")
        const textWidth = textEl.offsetWidth
        const iconWidth = iconEl.offsetWidth

        tlRef.current = gsap
          .timeline({ defaults: { overwrite: true } })
          // 1. sortie seule, vers la droite.
          .to(iconEl, { x: iconWidth + gapPx, duration: 0.25, ease: "power2.out" })
          // réapparaît hors champ à gauche — instantané, pas d'easing ici.
          .set(iconEl, { x: -(textWidth + gapPx + iconWidth) })
          // 2. rentre en poussant le texte — même mouvement, rebond élastique.
          .to(iconEl, { x: -(textWidth + gapPx), duration: 0.6, ease: "elastic.out(1, 0.55)" })
          .to(textEl, { x: iconWidth + gapPx, duration: 0.6, ease: "elastic.out(1, 0.55)" }, "<")
      }

      // Retour direct, local : pas de sortie/téléportation/rebond ici.
      const resetHover = () => {
        tlRef.current?.kill()
        tlRef.current = gsap
          .timeline({ defaults: { overwrite: true } })
          .to(iconEl, { x: 0, duration: 0.3, ease: "power2.out" }, 0)
          .to(textEl, { x: 0, duration: 0.3, ease: "power2.out" }, 0)
      }

      return attachHoverTrigger(row, playHover, resetHover)
    },
    { scope: rowRef }
  )

  return { rowRef, textRef, iconRef }
}

"use client"

import { useState, type PointerEvent, type Ref } from "react"

import { STAR_COUNT, StarGlyph } from "@/components/StarRating"
import { handleRadioKeyDown } from "@/lib/radio-group"
import { cn } from "@/lib/utils"

// Survol réel uniquement : souris et stylet. Le doigt n'a pas de survol.
const HOVER_POINTERS = new Set(["mouse", "pen"])

type StarRatingInputProps = {
  /** Note sélectionnée, de 0 (aucune) à 5. */
  value: number
  onChange: (value: number) => void
  /** Taille (et tracé si besoin) de chaque étoile, ex. `"size-11 xl:size-12 stroke-3"`. */
  starClassName: string
  /** Couleur via classe sémantique (défaut : `text-card-foreground`). */
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
  /** Ref de la première étoile, pour le focus sur erreur. */
  firstItemRef?: Ref<HTMLButtonElement>
}

/** Saisie d'une note (groupe radio) ; le survol souris prévisualise la note avant le clic. */
export default function StarRatingInput({
  value,
  onChange,
  starClassName,
  className,
  firstItemRef,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: StarRatingInputProps) {
  const [preview, setPreview] = useState<number | null>(null)
  const displayed = preview ?? value

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>, rank: number) {
    if (HOVER_POINTERS.has(event.pointerType)) setPreview(rank)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className={cn("flex items-center text-card-foreground", className)}
      onPointerLeave={() => setPreview(null)}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const rank = index + 1
        const isTabbable = value > 0 ? rank === value : rank === 1

        return (
          <button
            key={rank}
            ref={rank === 1 ? firstItemRef : undefined}
            type="button"
            role="radio"
            aria-label={`${rank} sur ${STAR_COUNT}`}
            aria-checked={rank === value}
            tabIndex={isTabbable ? 0 : -1}
            onClick={() => onChange(rank)}
            onKeyDown={handleRadioKeyDown}
            className="grid"
            onPointerEnter={(event) => handlePointerEnter(event, rank)}
          >
            <StarGlyph
              filled={rank <= displayed}
              className={cn(
                "transition-[fill] duration-150 ease-out motion-reduce:transition-none",
                starClassName
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

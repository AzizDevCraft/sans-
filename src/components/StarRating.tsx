import Star from "@/components/icons/star"
import { cn } from "@/lib/utils"

export const STAR_COUNT = 5

type StarGlyphProps = {
  filled: boolean
  className?: string
}

/** Une étoile pleine ou vide, partagée par l'affichage et la saisie. Même glyphe : seul le remplissage change. */
export function StarGlyph({ filled, className }: StarGlyphProps) {
  return (
    <Star
      aria-hidden="true"
      className={cn(
        // Tracé en px écran, indépendant de la taille (Figma : 2px, 3px pour les grandes étoiles)
        "shrink-0 stroke-2 [&_path]:[vector-effect:non-scaling-stroke]",
        filled ? "fill-current" : "fill-transparent",
        className
      )}
    />
  )
}

type StarRatingProps = {
  /** Moyenne arrondie à l'entier (`Math.round`), de 0 à 5. */
  value: number
  /** Taille (et tracé si besoin) de chaque étoile, ex. `"size-6 xl:size-8"`. */
  starClassName: string
  /** Couleur via classe sémantique (défaut : `text-card-foreground`). */
  className?: string
}

/** Note en lecture seule. Pour la saisie : `StarRatingInput`. */
export default function StarRating({ value, starClassName, className }: StarRatingProps) {
  const filled = Math.round(value)

  return (
    <div
      role="img"
      aria-label={`Note : ${filled} sur ${STAR_COUNT}`}
      className={cn("flex items-center text-card-foreground", className)}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <StarGlyph key={index} filled={index + 1 <= filled} className={starClassName} />
      ))}
    </div>
  )
}

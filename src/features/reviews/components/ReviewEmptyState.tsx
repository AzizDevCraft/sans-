import StarRatingInput from "./StarRatingInput"

type ReviewEmptyStateProps = {
  /** Note du formulaire : l'encart et le formulaire affichent la même. */
  value: number
  onRate: (value: number) => void
}

export default function ReviewEmptyState({ value, onRate }: ReviewEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-card px-3 py-7 xl:gap-5 xl:py-11">
      <p
        id="review-empty-rating-label"
        className="text-xl leading-[1.3] font-medium text-primary-foreground uppercase md:text-2xl xl:text-[32px] xl:leading-10"
      >
        Notez ce produit
      </p>
      <StarRatingInput
        value={value}
        starClassName="size-11 stroke-3 xl:size-12"
        onChange={onRate}
        aria-labelledby="review-empty-rating-label"
        className="gap-3 xl:gap-4"
      />
      <p className="text-center text-base text-primary-soft-foreground md:text-xl md:leading-[1.28]">
        Touchez une étoile pour écrire votre avis
        <br />
        Aucun avis pour le moment
      </p>
    </div>
  )
}

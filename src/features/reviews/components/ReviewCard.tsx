import Quote from "@/components/icons/quote"
import UserIcon from "@/components/icons/user-icon"
import StarRating from "@/components/StarRating"
import type { Review } from "@/data/reviews/reviews"
import { PROFILE_LABELS } from "../lib/profile-labels"

type ReviewCardProps = {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { message, rating, authorName, profile } = review

  return (
    <article className="flex w-full flex-col gap-3 rounded-xl bg-background p-5 shadow-base">
      <div className="flex h-8 items-center justify-between">
        <Quote aria-hidden="true" className="size-7 text-card-foreground" />
        <span className="rounded-full bg-card px-3 py-1 text-xs text-primary-foreground uppercase">
          {PROFILE_LABELS[profile]}
        </span>
      </div>
      <p className="text-base leading-7.5 text-muted-foreground">{message}</p>
      <div className="flex items-center gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card-alt text-card-alt-foreground">
          <UserIcon aria-hidden="true" className="size-6" />
        </span>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {authorName ?? "Anonyme"}
          </span>
          <StarRating value={rating} starClassName="size-6" />
        </div>
      </div>
    </article>
  )
}

import type { Review } from "@/data/reviews/reviews"
import ReviewCard from "./ReviewCard"

type ReviewListProps = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    // Marges négatives + padding : place pour shadow-base (≈24px côtés, 34px bas), sinon coupée par l'overflow
    <ul className="-mx-5 -mt-6 -mb-9 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-5 px-5 pt-6 pb-9 [scrollbar-width:none] md:-mx-6 md:scroll-px-6 md:gap-5 md:px-6 [&::-webkit-scrollbar]:hidden">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="w-full max-w-87.5 shrink-0 snap-start md:w-82.5 md:max-w-none"
        >
          <ReviewCard review={review} />
        </li>
      ))}
    </ul>
  )
}

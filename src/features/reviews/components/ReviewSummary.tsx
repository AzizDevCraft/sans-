import StarRating from "@/components/StarRating"
import { formatDecimal } from "@/lib/format-number"
import type { ReviewSummary as ReviewSummaryData } from "@/data/reviews/reviews"

type ReviewSummaryProps = {
  average: NonNullable<ReviewSummaryData["average"]>
  count: ReviewSummaryData["count"]
}

export default function ReviewSummary({ average, count }: ReviewSummaryProps) {
  return (
    <div className="flex items-center gap-4 rounded-md bg-card px-5 py-4">
      <p className="text-[40px] leading-[1.2] font-bold tracking-figma-m1 text-card-foreground">
        {formatDecimal(average, 1)}
      </p>
      <div className="flex flex-col gap-1">
        <StarRating value={average} starClassName="size-6" />
        <p className="text-base font-medium text-muted-foreground">
          {count} {count === 1 ? "avis vérifié" : "avis vérifiés"}
        </p>
      </div>
    </div>
  )
}

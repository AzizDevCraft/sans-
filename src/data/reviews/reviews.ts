import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import prisma from "@/data/prisma"
import type { Prisma, ReviewerProfile } from "@/generated/prisma/client"

export type { ReviewerProfile }

const LATEST_REVIEWS_LIMIT = 10

const REVIEW_SELECT = {
  id: true,
  rating: true,
  message: true,
  firstName: true,
  profile: true,
} satisfies Prisma.ReviewSelect

type ReviewRow = Prisma.ReviewGetPayload<{ select: typeof REVIEW_SELECT }>

export type Review = Pick<ReviewRow, "id" | "rating" | "message" | "profile"> & {
  /** `firstName` ; `null` → « Anonyme » côté UI. */
  authorName: string | null
}

export type ReviewSummary = {
  /** Arrondi à 1 décimale ; `null` quand il n'y a aucun avis. */
  average: number | null
  count: number
}

export type ProductReviews = {
  summary: ReviewSummary
  reviews: Review[]
}

export type NewReview = Pick<
  Prisma.ReviewCreateWithoutProductInput,
  "rating" | "profile" | "message"
> & {
  productSlug: string
  firstName: string | null
}

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    rating: row.rating,
    message: row.message,
    profile: row.profile,
    authorName: row.firstName,
  }
}

/** Résumé sur **tous** les avis du produit. */
export async function getReviewSummary(productSlug: string): Promise<ReviewSummary> {
  "use cache"
  cacheLife("max")
  cacheTag("reviews", `reviews:${productSlug}`)

  const { _avg, _count } = await prisma.review.aggregate({
    where: { product: { slug: productSlug } },
    _avg: { rating: true },
    _count: { _all: true },
  })

  const count = _count._all
  const average = count === 0 || _avg.rating === null ? null : Math.round(_avg.rating * 10) / 10

  return { average, count }
}

export async function getProductReviews(productSlug: string): Promise<ProductReviews> {
  "use cache"
  cacheLife("max")
  cacheTag("reviews", `reviews:${productSlug}`)

  const [summary, rows] = await Promise.all([
    getReviewSummary(productSlug),
    prisma.review.findMany({
      where: { product: { slug: productSlug } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: LATEST_REVIEWS_LIMIT,
      select: REVIEW_SELECT,
    }),
  ])

  return { summary, reviews: rows.map(toReview) }
}

/** Crée l'avis ; renvoie `false` si le produit n'existe pas. */
export async function createReview(input: NewReview): Promise<boolean> {
  const product = await prisma.product.findUnique({
    where: { slug: input.productSlug },
    select: { id: true },
  })

  if (!product) return false

  await prisma.review.create({
    data: {
      productId: product.id,
      rating: input.rating,
      profile: input.profile,
      firstName: input.firstName,
      message: input.message,
    },
  })

  return true
}

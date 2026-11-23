import "server-only"

import type { ProductReviews } from "./reviews"

/**
 * TEMPORAIRE — démo limitée au produit `MOCK_PRODUCT_SLUG` (@/data/product/mock) : le modèle `Review` existe,
 * ce mock ne le remplace pas et ne s'applique qu'à ce produit tant qu'il est sans avis.
 * TODO(server-builder): à supprimer après le seed.
 */
export const PRODUCT_REVIEWS_MOCK = {
  summary: { average: 4, count: 3 },
  reviews: [
    {
      id: "mock-review-1",
      rating: 5,
      message:
        "Votre mousse est juste succulente, je la prends après chaque cours. Parfait pour tenir jusqu'au soir sans craquer sur autre chose.",
      authorName: null,
      profile: "STUDENT",
    },
    {
      id: "mock-review-2",
      rating: 4,
      message: "Pratique à glisser dans le sac des enfants et dans le mien. On en redemande !",
      authorName: null,
      profile: "ACTIVE_MOM",
    },
    {
      id: "mock-review-3",
      rating: 3,
      message: "Bon goût et bien dosé en protéines, la texture est un peu dense à mon goût après la séance.",
      authorName: "Yassine",
      profile: "ATHLETE",
    },
  ],
} satisfies ProductReviews

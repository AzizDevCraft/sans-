import type { ShopCategory } from "@/data/catalog/shop"

/** Sentinel `activeSlug` pour la pill "Tous" (liste fusionnée, pas une vraie catégorie). */
export const ALL_FILTER_SLUG = "all"

export interface FilterCategoryOption extends Pick<ShopCategory, "slug" | "name"> {
  count: number
}

// Libellé court des pills de filtre (mobile), distinct de `category.name`.
const FILTER_PILL_LABELS: Record<string, string> = {
  snacks: "Snacks",
  meals: "Bowls",
  shots: "Shots",
}

export function toFilterOptions(categories: ShopCategory[]): FilterCategoryOption[] {
  return categories.map((category) => ({
    slug: category.slug,
    name: FILTER_PILL_LABELS[category.slug] ?? category.name,
    count: category.products.length,
  }))
}

import type { ShopCategory } from "@/data/catalog/shop"

/** Sentinel `activeSlug` pour la pill "Tous" (liste fusionnée, pas une vraie catégorie). */
export const ALL_FILTER_SLUG = "all"

export interface FilterCategoryOption extends Pick<ShopCategory, "slug" | "name"> {
  /** `categories[i].products.length` côté parent. */
  count: number
}

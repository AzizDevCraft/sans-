import { CategoryFilterPill } from "@/components/shop/CategoryFilterPill"
import { ALL_FILTER_SLUG, type FilterCategoryOption } from "@/lib/shop/filter"

interface FilterSectionProps {
  /** Catégories de la boutique, hors pill "Tous" (dérivée à part via `totalCount`). */
  categories: FilterCategoryOption[]
  /** Slug de la catégorie active, ou `ALL_FILTER_SLUG` pour "Tous". */
  activeSlug: string
  /** Somme des produits toutes catégories confondues (pill "Tous"). */
  totalCount: number
  /** Nombre de produits affichés pour le filtre actif (texte "X produits"). */
  visibleCount: number
  onSelectCategory: (slug: string) => void
}

// Mobile uniquement.
export function FilterSection({
  categories,
  activeSlug,
  totalCount,
  visibleCount,
  onSelectCategory,
}: FilterSectionProps) {
  return (
    <section
      aria-label="Filtrer les produits"
      className="flex flex-col items-center gap-5 bg-background pt-3 pb-7 md:hidden"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4 overflow-x-auto pl-5">
          <CategoryFilterPill
            label="Tous"
            count={totalCount}
            active={activeSlug === ALL_FILTER_SLUG}
            onClick={() => onSelectCategory(ALL_FILTER_SLUG)}
          />
          {categories.map((category) => (
            <CategoryFilterPill
              key={category.slug}
              label={category.name}
              count={category.count}
              active={activeSlug === category.slug}
              onClick={() => onSelectCategory(category.slug)}
            />
          ))}
        </div>
        <hr className="w-full border-t border-border" />
      </div>

      <p className="mx-auto w-full max-w-87.5 text-base leading-6">
        <span className="font-semibold text-foreground">{visibleCount}</span>{" "}
        <span className="text-muted-foreground">produits</span>
      </p>
    </section>
  )
}

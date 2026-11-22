"use client"

import { Suspense, useLayoutEffect, useState, type ReactNode } from "react"

import { CategoryScrollSync } from "@/components/shop/CategoryScrollSync"
import { FilterSection } from "@/components/shop/FilterSection"
import { ALL_FILTER_SLUG, type FilterCategoryOption } from "@/lib/shop/filter"

interface ShopCatalogProps {
  categories: FilterCategoryOption[]
  totalCount: number
  sections: { slug: string; content: ReactNode }[]
}

export function ShopCatalog({ categories, totalCount, sections }: ShopCatalogProps) {
  const [requestedSlug, setRequestedSlug] = useState(ALL_FILTER_SLUG)

  // Activity (cacheComponents) garde l'état d'une route masquée : on le réinitialise au masquage
  // pour que le retour via l'URL soit traité comme une arrivée (scroll + filtre).
  useLayoutEffect(() => {
    return () => setRequestedSlug(ALL_FILTER_SLUG)
  }, [])

  // Slug inconnu : retombe sur « Tous » plutôt que de masquer toutes les sections.
  const activeCategory = categories.find((category) => category.slug === requestedSlug)
  const activeSlug = activeCategory?.slug ?? ALL_FILTER_SLUG
  const isFiltered = activeCategory !== undefined
  const visibleCount = activeCategory?.count ?? totalCount

  const handleSelectCategory = (slug: string) => {
    if (slug === requestedSlug) return
    setRequestedSlug(slug)
    window.history.pushState(
      null,
      "",
      slug === ALL_FILTER_SLUG ? "/boutique" : `/boutique?${new URLSearchParams({ category: slug })}`,
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        <CategoryScrollSync
          requestedSlug={requestedSlug}
          activeSlug={activeSlug}
          onCategoryChange={setRequestedSlug}
        />
      </Suspense>

      <FilterSection
        categories={categories}
        activeSlug={activeSlug}
        totalCount={totalCount}
        visibleCount={visibleCount}
        onSelectCategory={handleSelectCategory}
      />

      <div data-filtered={isFiltered ? "" : undefined}>
        {sections.map(({ slug, content }) => (
          <div
            key={slug}
            className={!isFiltered || activeSlug === slug ? undefined : "hidden md:block"}
          >
            {content}
          </div>
        ))}
      </div>
    </>
  )
}

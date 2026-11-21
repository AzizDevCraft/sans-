import type { ShopCategory } from "@/data/shop"

import { SectionHeading } from "@/components/SectionHeading"
import type { ProductTone } from "@/components/shop/ProductCard"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { cn } from "@/lib/utils"

export interface ProductSectionProps {
  category: ShopCategory
  tone: ProductTone
}

// Titre/sous-titre affichés, par slug ; slug absent = valeurs de la base.
const SECTION_COPY: Partial<Record<string, {eyebrow: string, title: string; subtitle: string }>> = {
  snacks: {
    eyebrow: "sucré",
    title: "Snacks Protéinés Sucrés",
    subtitle: "Energy balls, proteine barres, cookies et plus encore pour vos envies sucrées",
  },
  meals: {
    eyebrow: "repas complet",
    title: "Bowls Equilibrés",
    subtitle: "Repas complet et nutritifs pour votre déjeuner",
  },
  shots: {
    eyebrow: "shot énergisant",
    title: "Ginger Shots",
    subtitle: "Énergie naturelle qui réveille votre journée",
  },
}

export function ProductSection({ category, tone }: ProductSectionProps) {
  const copy = SECTION_COPY[category.slug]

  return (
    <section
      id={category.slug}
      aria-label={category.name}
      className={cn(
        "w-full scroll-mt-15 pb-10 md:scroll-mt-20 md:p-8 xl:px-0 xl:py-24",
        tone === "alt"
          ? 
            "bg-background-alt max-md:pt-8 max-md:mb-5 in-data-filtered:max-md:bg-background in-data-filtered:max-md:pt-0"
          : "bg-background"
      )}
    >
      <div className="flex w-full flex-col items-start gap-8 md:gap-10 xl:mx-auto xl:max-w-282 xl:gap-16">
        <SectionHeading
          align="start"
          eyebrow={copy?.eyebrow}
          title={copy?.title ?? category.name}
          subtitle={copy?.subtitle ?? category.tagline}
          className="px-5 md:px-0"
        />

        <ProductGrid products={category.products} tone={tone} />
      </div>
    </section>
  )
}

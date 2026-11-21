import { getShopData } from "@/data/shop"

import { PageHeader } from "@/components/PageHeader"
import { ProductSection } from "@/components/shop/ProductSection"
import { ShopCatalog } from "@/components/shop/ShopCatalog"

// Libellé court des pills de filtre (mobile), distinct de `category.name`.
const FILTER_PILL_LABELS: Record<string, string> = {
  snacks: "Snacks",
  meals: "Bowls",
  shots: "Shots",
}

// Eyebrow statique par slug ; slug absent = pas d'eyebrow.
const SECTION_EYEBROWS: Record<string, string> = {
  snacks: "sucré",
  meals: "repas complet",
  shots: "shot énergisant",
}

export async function ShopPageContent() {
  const { categories } = await getShopData()
  const totalProductCount = categories.reduce((sum, c) => sum + c.products.length, 0)

  return (
    <main>
      <PageHeader
        title="Notre Boutique"
        subtitle="Découvrez nos snacks protéinés, nos bowls et nos shots."
      />

      <ShopCatalog
        categories={categories.map((category) => ({
          slug: category.slug,
          name: FILTER_PILL_LABELS[category.slug] ?? category.name,
          count: category.products.length,
        }))}
        totalCount={totalProductCount}
        sections={categories.map((category, index) => ({
          slug: category.slug,
          content: (
            <ProductSection
              category={category}
              eyebrow={SECTION_EYEBROWS[category.slug]}
              tone={index % 2 === 1 ? "alt" : "default"}
            />
          ),
        }))}
      />
    </main>
  )
}

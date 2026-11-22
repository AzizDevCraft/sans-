import { getShopData } from "@/data/catalog/shop"

import { PageHeader } from "@/components/PageHeader"
import { ProductSection } from "./ProductSection"
import { ShopCatalog } from "./ShopCatalog"

// Libellé court des pills de filtre (mobile), distinct de `category.name`.
const FILTER_PILL_LABELS: Record<string, string> = {
  snacks: "Snacks",
  meals: "Bowls",
  shots: "Shots",
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
              tone={index % 2 === 1 ? "alt" : "default"}
            />
          ),
        }))}
      />
    </main>
  )
}

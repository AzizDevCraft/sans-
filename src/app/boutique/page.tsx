import type { Metadata } from "next"

import { PageHeader } from "@/components/PageHeader"
import { getShopData } from "@/data/catalog/shop"
import { ProductSection } from "@/features/catalog/components/ProductSection"
import { ShopCatalog } from "@/features/catalog/components/ShopCatalog"
import { toFilterOptions } from "@/features/catalog/lib/filter"

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez nos snacks protéinés, nos bowls et nos shots — des produits sains et gourmands pour votre énergie quotidienne.",
}

export default async function BoutiquePage() {
  const { categories } = await getShopData()
  const totalProductCount = categories.reduce((sum, c) => sum + c.products.length, 0)

  return (
    <main>
      <PageHeader
        title="Notre Boutique"
        subtitle="Découvrez nos snacks protéinés, nos bowls et nos shots."
      />

      <ShopCatalog
        categories={toFilterOptions(categories)}
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

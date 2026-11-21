import type { ShopProduct } from "@/data/shop"

import { ProductCard } from "@/components/shop/ProductCard"
import type { ProductTone } from "@/components/shop/ProductCard"

export interface ProductGridProps {
  products: ShopProduct[]
  tone: ProductTone
}

// Liste mobile, grille flex-wrap dès md:
export function ProductGrid({ products, tone }: ProductGridProps) {
  return (
    <div className="flex w-full flex-col gap-6 px-5 md:flex-row md:flex-wrap md:gap-5 md:px-0 xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} tone={tone} />
      ))}
    </div>
  )
}

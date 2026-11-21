import type { ShopProduct } from "@/data/shop"

import { ProductCard } from "@/components/shop/ProductCard"
import type { ProductTone } from "@/components/shop/ProductCard"

export interface ProductGridProps {
  products: ShopProduct[]
  tone: ProductTone
}

// Grille fluide auto-fill (colonnes min 300px mobile / 330px md / 360px xl, cartes alignées à gauche)
export function ProductGrid({ products, tone }: ProductGridProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6 px-5 md:grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] md:gap-5 md:px-0 xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))] xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} tone={tone} />
      ))}
    </div>
  )
}

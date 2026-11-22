import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import prisma from "@/data/prisma"
import type { Prisma } from "@/generated/prisma/client"

const PRODUCT_IMAGE_SELECT = {
  url: true,
  alt: true,
} satisfies Prisma.MediaSelect

const PRODUCT_SELECT = {
  id: true,
  slug: true,
  name: true,
  title: true,
  calories: true,
  proteins: true,
  priceInCount: true,
  unitCount: true,
  images: {
    orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }],
    take: 1,
    select: PRODUCT_IMAGE_SELECT,
  },
} satisfies Prisma.ProductSelect

const CATEGORY_WITH_PRODUCTS_SELECT = {
  slug: true,
  name: true,
  tagline: true,
  product: {
    orderBy: [{ createdAt: "asc" }, { slug: "asc" }],
    select: PRODUCT_SELECT,
  },
} satisfies Prisma.CategorySelect

type ProductRow = Prisma.ProductGetPayload<{ select: typeof PRODUCT_SELECT }>
type CategoryWithProductsRow = Prisma.CategoryGetPayload<{
  select: typeof CATEGORY_WITH_PRODUCTS_SELECT
}>

export type ShopProduct = Pick<
  ProductRow,
  "id" | "slug" | "name" | "title" | "calories" | "proteins" | "unitCount"
> & {
  /** `priceInCount` converti en nombre : aucun `Decimal` ne circule dans l'UI. */
  price: number
  image: ProductRow["images"][number]
}

export type ShopCategory = Pick<
  CategoryWithProductsRow,
  "slug" | "name" | "tagline"
> & {
  products: ShopProduct[]
}

type ShopData = { categories: ShopCategory[] }

function toShopProduct(row: ProductRow, categorySlug: string): ShopProduct {
  const [coverImage] = row.images

  if (!coverImage) {
    throw new Error(
      `Produit "${row.slug}" (catégorie "${categorySlug}") n'a aucune image associée.`,
    )
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.title,
    calories: row.calories,
    proteins: row.proteins,
    price: row.priceInCount.toNumber(),
    unitCount: row.unitCount,
    image: coverImage,
  }
}

function toShopCategory(row: CategoryWithProductsRow): ShopCategory {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    products: row.product.map((product) => toShopProduct(product, row.slug)),
  }
}

/** Agrégat consommé par `ShopPageContent`. */
export async function getShopData(): Promise<ShopData> {
  "use cache"
  cacheLife("max")
  cacheTag("categories", "products")

  const rows = await prisma.category.findMany({
    orderBy: [{ order: "asc" }, { slug: "asc" }],
    select: CATEGORY_WITH_PRODUCTS_SELECT,
  })

  return { categories: rows.map(toShopCategory) }
}

import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import prisma from "@/data/prisma"
import { capitalize } from "@/lib/utils"
import { MEDIA_IMAGE_SELECT, toHomeImage, type HomeImage } from "@/data/media"

export interface HomeCategory {
  id: string
  slug: string
  name: string
  tagline: string
  image: HomeImage
  href: string
  position: number
}

export async function getHomeCategories(): Promise<HomeCategory[]> {

  "use cache"
  cacheLife ("max")
  cacheTag ("categories")

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      tagline: true,
      order: true,
      image: { select: MEDIA_IMAGE_SELECT },
    },
  })

  return categories
    .map((cat, index) => ({
      id: cat.id,
      slug: cat.slug,
      name: capitalize(cat.name),
      tagline: cat.tagline ?? "",
      image: toHomeImage(cat.image),
      href: `/boutique?category=${cat.slug}`,
      // `order` est nullable : catégorie sans ordre explicite → reléguée en fin de liste.
      position: cat.order ?? categories.length + index + 1,
    }))
    .sort((a, b) => a.position - b.position)
}

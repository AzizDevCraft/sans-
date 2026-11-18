import "server-only"

import type { StaticImageData } from "next/image"
import { cacheLife, cacheTag } from "next/cache"

import prisma from "@/lib/prisma"

import gallery0 from "@/assets/homepage/gallery0.jpg"
import gallery1 from "@/assets/homepage/gallery1.jpg"
import gallery2 from "@/assets/homepage/gallery2.jpg"
import gallery3 from "@/assets/homepage/gallery3.jpg"
import heroImg from "@/assets/homepage/hero-img.jpg"
import heroOgImg from "@/assets/homepage/hero-img-og.jpg"
import { capitalize } from "@/lib/utils"

export interface HomeImage {
  url: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

export interface HomeCategory {
  id: string
  slug: string
  name: string
  tagline: string
  image: HomeImage
  href: string
  position: number
}

export interface HomeGalleryImage extends HomeImage {
  id: string
  position: number
}

export interface HomePartner {
  id: string
  name: string
  location: string
  position: number
}

export interface HeroContent {
  image: HomeImage
}

export interface HomepageData {
  hero: HeroContent
  categories: HomeCategory[]
  ingredientGallery: HomeGalleryImage[]
  partners: HomePartner[]
}

const FALLBACK_DIMENSION = 1200

type MediaRow = {
  url: string
  alt: string
  width: number | null
  height: number | null
}

function toHomeImage(row: MediaRow): HomeImage {
  return {
    url: row.url,
    alt: row.alt,
    width: row.width ?? FALLBACK_DIMENSION,
    height: row.height ?? FALLBACK_DIMENSION,
  }
}

function toHomeImageFromStatic(image: StaticImageData, alt: string): HomeImage {
  return {
    url: image.src,
    alt,
    width: image.width,
    height: image.height,
    ...(image.blurDataURL ? { blurDataURL: image.blurDataURL } : {}),
  }
}

const MEDIA_IMAGE_SELECT = {
  url: true,
  alt: true,
  width: true,
  height: true,
} as const

const HERO_ALT = "mousse au chocholat protéiné sans sucre ajouté"

export function getHeroContent(): HeroContent {
  return { image: toHomeImageFromStatic(heroImg, HERO_ALT) }
}

/** Crop paysage 1200x630 du hero, dédié aux og:image / twitter:image. */
export function getHeroOgImage(): HomeImage {
  return toHomeImageFromStatic(heroOgImg, HERO_ALT)
}

const GALLERY_IMAGES: readonly { image: StaticImageData; alt: string }[] = [
  { image: gallery0, alt: "Tunny - Sandwich frais au thon" },
  { image: gallery1, alt: "Brownies & Cookie Dough balls" },
  { image: gallery2, alt: "mousse au chocholat protéiné sans sucre ajouté" },
  { image: gallery3, alt: "Crunchies - Protéine Bar" },
]

export function getIngredientGallery(): HomeGalleryImage[] {
  return GALLERY_IMAGES.map(({ image, alt }, position) => ({
    id: `gallery-${position}`,
    position,
    ...toHomeImageFromStatic(image, alt),
  }))
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


export async function getPartners(): Promise<HomePartner[]> {

  "use cache"
  cacheLife ("max")
  cacheTag ("distributors")

  const distributors = await prisma.distributor.findMany ({
    select: {
      id: true,
      name: true,
      zone: true,
      position: true
    },
    orderBy: [{ position: { sort: "asc", nulls: "last" } }, { name: "asc" }, { id: "asc" }],
  })
  return distributors
    .map((distributor, index) => ({
      id: distributor.id,
      name: distributor.name,
      location: distributor.zone.join(", "),
      // `position` est nullable : distributeur sans ordre explicite → relégué en fin de liste.
      position: distributor.position ?? distributors.length + index + 1,
    }))
    .sort((a, b) => a.position - b.position)
}

/** Agrégat consommé par `src/app/page.tsx`. */
export async function getHomepageData(): Promise<HomepageData> {
  const [categories, partners] = await Promise.all([
    getHomeCategories(),
    getPartners(),
  ])

  return {
    hero: getHeroContent(),
    categories,
    ingredientGallery: getIngredientGallery(),
    partners,
  }
}

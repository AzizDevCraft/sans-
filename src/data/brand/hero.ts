import "server-only"

import heroImg from "@/assets/brand/hero-img.jpg"
import heroOgImg from "@/assets/brand/hero-img-og.jpg"
import { toHomeImageFromStatic, type HomeImage } from "@/data/media"

export interface HeroContent {
  image: HomeImage
}

const HERO_ALT = "mousse au chocholat protéiné sans sucre ajouté"

export function getHeroContent(): HeroContent {
  return { image: toHomeImageFromStatic(heroImg, HERO_ALT) }
}

/** Crop paysage 1200x630 du hero, dédié aux og:image / twitter:image. */
export function getHeroOgImage(): HomeImage {
  return toHomeImageFromStatic(heroOgImg, HERO_ALT)
}

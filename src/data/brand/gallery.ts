import "server-only"

import type { StaticImageData } from "next/image"

import gallery0 from "@/assets/brand/gallery0.jpg"
import gallery1 from "@/assets/brand/gallery1.jpg"
import gallery2 from "@/assets/brand/gallery2.jpg"
import gallery3 from "@/assets/brand/gallery3.jpg"
import { toHomeImageFromStatic, type HomeImage } from "@/data/media"

export interface HomeGalleryImage extends HomeImage {
  id: string
  position: number
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

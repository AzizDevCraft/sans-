import "server-only"

import type { StaticImageData } from "next/image"

export interface HomeImage {
  url: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

const FALLBACK_DIMENSION = 1200

type MediaRow = {
  url: string
  alt: string
  width: number | null
  height: number | null
}

export function toHomeImage(row: MediaRow): HomeImage {
  return {
    url: row.url,
    alt: row.alt,
    width: row.width ?? FALLBACK_DIMENSION,
    height: row.height ?? FALLBACK_DIMENSION,
  }
}

export function toHomeImageFromStatic(image: StaticImageData, alt: string): HomeImage {
  return {
    url: image.src,
    alt,
    width: image.width,
    height: image.height,
    ...(image.blurDataURL ? { blurDataURL: image.blurDataURL } : {}),
  }
}

export const MEDIA_IMAGE_SELECT = {
  url: true,
  alt: true,
  width: true,
  height: true,
} as const

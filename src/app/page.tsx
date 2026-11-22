import type { Metadata } from "next"

import { getIngredientGallery } from "@/data/brand/gallery"
import { getHeroContent, getHeroOgImage } from "@/data/brand/hero"
import { getHomeCategories } from "@/data/catalog/categories"
import { getPartners } from "@/data/partners/distributors"
import { EngagementSection } from "@/features/brand/components/EngagementSection"
import { HeroSection } from "@/features/brand/components/HeroSection"
import { IngredientsSection } from "@/features/brand/components/IngredientsSection"
import { PromisesSection } from "@/features/brand/components/PromisesSection"
import { CategorySection } from "@/features/catalog/components/CategorySection"
import { NavigationSection } from "@/features/layout/components/NavigationSection"
import { PartnersSection } from "@/features/partners/components/PartnersSection"
import { QuizSection } from "@/features/quiz/components/QuizSection"

const HOME_TITLE = "SANS+ — Le Plaisir Sain, Sans Compromis"
const HOME_DESCRIPTION =
  "Snacks protéinés gourmands, sans sucre ajouté ni ingrédients cachés. Découvrez les recettes SANS+ pensées pour votre énergie au quotidien."

const heroOgImage = getHeroOgImage()

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: "SANS+",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: heroOgImage.url,
        width: heroOgImage.width,
        height: heroOgImage.height,
        alt: heroOgImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [heroOgImage.url],
  },
}

export default async function Home() {
  const [categories, partners] = await Promise.all([getHomeCategories(), getPartners()])

  return (
    <>
      <main>
        <HeroSection hero={getHeroContent()} />
        <PromisesSection />
        <CategorySection categories={categories} />
        <IngredientsSection ingredientGallery={getIngredientGallery()} />
        <PartnersSection partners={partners} />
        <EngagementSection />
        <QuizSection />
        <NavigationSection />
      </main>
    </>
  )
}

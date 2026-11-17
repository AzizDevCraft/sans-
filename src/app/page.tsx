import type { Metadata } from "next"

import { CategorySection } from "@/components/home/CategorySection"
import { EngagementSection } from "@/components/home/EngagementSection"
import { HeroSection } from "@/components/home/HeroSection"
import { IngredientsSection } from "@/components/home/IngredientsSection"
import { NavigationSection } from "@/components/home/NavigationSection"
import { PartnersSection } from "@/components/home/PartnersSection"
import { PromisesSection } from "@/components/home/PromisesSection"
import { QuizSection } from "@/components/home/QuizSection"
import { getHeroOgImage, getHomepageData } from "@/data/homepage"

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
  const data = await getHomepageData()

  return (
    <>
      <main>
        <HeroSection hero={data.hero} />
        <PromisesSection />
        <CategorySection categories={data.categories} />
        <IngredientsSection ingredientGallery={data.ingredientGallery} />
        <PartnersSection partners={data.partners} />
        <EngagementSection />
        <QuizSection />
        <NavigationSection />
      </main>
    </>
  )
}

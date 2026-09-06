import type { Category } from "../../../design/units/homepage/data-contract"

import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/SectionHeading"
import { ArrowLink } from "@/components/ArrowLink"

// mock — TODO(server-builder): GetHomeCategories (data-contract.ts)
const CATEGORIES: Category[] = [
  {
    id: "category-1",
    slug: "snacks-proteines-sucres",
    name: "Snacks Protéinés Sucrés",
    tagline: "Energy balls, barres, cookies équilibrés",
    image: {
      url: "https://placehold.co/660x640",
      alt: "Snacks Protéinés Sucrés",
      width: 660,
      height: 640,
    },
    href: "/boutique/snacks-proteines-sucres",
    position: 1,
  },
  {
    id: "category-2",
    slug: "bowls-equilibres",
    name: "Bowls Équilibrés",
    tagline: "Repas complets pour le déjeuner",
    image: {
      url: "https://placehold.co/660x640",
      alt: "Bowls Équilibrés",
      width: 660,
      height: 640,
    },
    href: "/boutique/bowls-equilibres",
    position: 2,
  },
  {
    id: "category-3",
    slug: "ginger-shots",
    name: "Ginger shots",
    tagline: "L'énergie naturelle qui vous réveille",
    image: {
      url: "https://placehold.co/660x640",
      alt: "Ginger shots",
      width: 660,
      height: 640,
    },
    href: "/boutique/ginger-shots",
    position: 3,
  },
]

const HEADING_SUBTITLE_TEXT =
  "Découvrez nos gammes de produits pensées pour tous vos moments"

interface CategoryCardProps {
  category: Category
  /** `lg` = carte large (grille tablet, `col-span-2`) ; `sm` = carte étroite. */
  size?: "lg" | "sm"
}

function CategoryCard({ category, size = "sm" }: CategoryCardProps) {
  return (
    <article
      className={cn(
        "dark",
        "relative flex min-w-0 flex-col justify-end overflow-hidden p-5",
        "h-50 rounded-lg",
        "xl:h-80 xl:flex-1 xl:min-w-0 xl:rounded-xl xl:py-4",
        size === "lg" ? "md:col-span-2 md:h-90 md:rounded-2xl" : "md:h-60"
      )}
    >
      {/* mock : next/image via server-builder */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={category.image.url}
        alt={category.image.alt}
        width={category.image.width}
        height={category.image.height}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background-alt/0 to-background/95" />

      <div className="relative flex flex-col gap-1">
        <h3 className="text-xl font-semi-bold text-foreground">
          {category.name}
        </h3>
        <p className="leading-6.5 text-muted-foreground">
          {category.tagline}
        </p>
        <ArrowLink
          href={category.href}
          className="hidden text-foreground xl:inline-flex"
        >
          Explorer
        </ArrowLink>
      </div>
    </article>
  )
}

export function CategorySection() {
  return (
    <section
      aria-label="Nos Catégories"
      className={cn(
        "flex flex-col items-center px-5 pt-3 pb-10",
        "bg-linear-to-b from-background via-background-gradient to-background",
        "md:items-start md:px-8",
        "xl:min-h-200 xl:items-center xl:justify-center xl:p-0"
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col items-center gap-12",
          "xl:mx-auto xl:max-w-282 xl:items-center xl:gap-24"
        )}
      >
        <SectionHeading
          align="center"
          eyebrow="NOS GAMMES"
          title="Nos Catégories"
          subtitle={HEADING_SUBTITLE_TEXT}
        />

        <div
          className={cn(
            "grid w-full grid-cols-1 gap-5",
            "md:grid-cols-2 md:gap-6",
            "xl:flex xl:gap-6"
          )}
        >
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              size={index === 0 ? "lg" : "sm"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

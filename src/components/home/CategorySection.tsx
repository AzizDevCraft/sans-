import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import type { HomeCategory } from "@/data/homepage"

import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/SectionHeading"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"

const HEADING_SUBTITLE_TEXT =
  "Découvrez nos gammes de produits pensées pour tous vos moments"

interface CategoryCardProps {
  category: HomeCategory
  /** `lg` = carte large (grille tablet, `col-span-2`) ; `sm` = carte étroite. */
  size?: "lg" | "sm"
}

const CATEGORY_CARD_XL_SIZE =
  "calc((clamp(1128px, 88.125vw, 1280px) - 90px) / 3)"

const CATEGORY_CARD_SIZES: Record<"lg" | "sm", string> = {
  lg: `(min-width: 1280px) ${CATEGORY_CARD_XL_SIZE}, (min-width: 744px) calc(100vw - 64px), calc(100vw - 40px)`,
  sm: `(min-width: 1280px) ${CATEGORY_CARD_XL_SIZE}, (min-width: 744px) calc(50vw - 44px), calc(100vw - 40px)`,
}

function CategoryCard({ category, size = "sm" }: CategoryCardProps) {
  return (
    <article
      className={cn(
        "dark group",
        "relative flex min-w-0 flex-col justify-end overflow-hidden p-5",
        "h-50 rounded-lg",
        "xl:h-auto xl:aspect-346/320 xl:flex-1 xl:min-w-0 xl:rounded-xl xl:py-4",
        size === "lg" ? "md:col-span-2 md:h-90 md:rounded-2xl" : "md:h-60"
      )}
    >
      <Image
        src={category.image.url}
        alt={category.image.alt}
        fill
        sizes={CATEGORY_CARD_SIZES[size]}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background-alt/0 to-background/95" />

      <div className="relative flex flex-col gap-1">
        <h3 className="text-xl leading-7.5 font-semi-bold text-foreground lg:text-2xl xl:text-xl xl:leading-7.5">
          {category.name}
        </h3>
        <p className="leading-6.5 text-muted-foreground lg:text-xl lg:leading-7.5 xl:text-base xl:leading-6.5">
          {category.tagline}
        </p>
        <span className="hidden origin-left items-center gap-2 p-1 font-semibold text-foreground transition-all duration-200 xl:inline-flex xl:group-hover:scale-105 xl:group-hover:gap-3">
          Explorer
          <ArrowRightIcon className="size-5 shrink-0" />
        </span>
      </div>


      <Link
        href={category.href as Route}
        aria-label={`Explorer la gamme ${category.name}`}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      />
    </article>
  )
}

interface CategorySectionProps {
  categories: HomeCategory[]
}

export function CategorySection({ categories }: CategorySectionProps) {
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
          "xl:mx-auto xl:w-[clamp(1128px,88.125vw,1280px)] xl:items-center xl:gap-24"
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
            "xl:flex xl:gap-11.25"
          )}
        >
          {categories.map((category, index) => (
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

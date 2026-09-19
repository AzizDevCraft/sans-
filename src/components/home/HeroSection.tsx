import type { Route } from "next"
import Image from "next/image"

import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import { ButtonLink } from "@/components/ui/button-link"
import { cn } from "@/lib/utils"

import type { HeroContent, HomeImage } from "@/data/homepage"

import { ScrollHint } from "../ScrollHint"

/** Hero homepage : sombre en mobile/tablet (`.dark`), clair en desktop `xl:`. */

const DISCOVER_HREF = "/boutique"
// `/quiz` n'existe pas encore comme route (contrairement à `/boutique`) →
// `typedRoutes` le refuse tant que `src/app/quiz/` n'existe pas.
const QUIZ_HREF = "/quiz" as Route

function HeroImage({ image }: { image: HomeImage }) {
  return (
    <div className="relative hidden min-w-0 xl:-rotate-3 xl:overflow-hidden xl:rounded-lg xl:shadow-hero-image xl:block xl:h-108 xl:w-xl">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover object-center"
      />
    </div>
  )
}

interface HeroCopyProps {
  /** Posé sur le `<h1>` du sous-arbre mobile/tablet ; absent côté desktop pour éviter un `id` dupliqué. */
  headingId?: string
  /** Classes couleur du bouton outline (sous-arbre mobile/tablet ; neutralise aussi les `dark:` du variant shadcn). */
  outlineCtaClassName?: string
}

// HeroCopy — titre + sous-titre + 2 CTA, rendu une fois par sous-arbre.
function HeroCopy({ headingId, outlineCtaClassName }: HeroCopyProps) {
  return (
    <div className="flex flex-col gap-5 md:w-full md:max-w-170 md:items-start xl:w-full xl:min-w-0 xl:max-w-138 xl:gap-6">
      <h1
        id={headingId}
        className="font-heading font-semibold text-[32px] leading-9.5 text-foreground md:text-[48px] md:leading-[55.2px] xl:text-[60px] xl:leading-16.5"
      >
        Le Plaisir{" "}
        <span className="text-chart-1">Sain</span>, Sans Compromis.
      </h1>

      <p className="text-[16px] leading-6 text-muted-foreground md:text-[20px] md:leading-7.5">
        Des snacks naturels et gourmands pour votre énergie quotidienne
        <span className="hidden md:inline">
          , sans culpabilité ni ingrédients cachés.
        </span>
      </p>

      <div className="flex flex-col gap-4 md:flex-row xl:gap-6">
        <ButtonLink
          href={DISCOVER_HREF}
          variant="primary"
          size="brand"
          hoverEffect="arrow"
          trailingIcon={<ArrowRightIcon className="hidden size-5 xl:block" />}
          className="w-full pr-5 md:w-auto md:pr-4 dark:bg-chart-1 dark:hover:bg-chart-1/80"
        >
          Découvrir les Snacks
        </ButtonLink>
        <ButtonLink
          href={QUIZ_HREF}
          variant="outline"
          size="brand"
          hoverEffect="flip"
          className={cn("w-full md:w-auto", outlineCtaClassName)}
        >
          Faire le quiz
        </ButtonLink>
      </div>
    </div>
  )
}

interface HeroSectionProps {
  hero: HeroContent
}

export function HeroSection({ hero }: HeroSectionProps) {
  const { image } = hero

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden px-5 md:px-0 md:pb-8 xl:min-h-200 xl:justify-center xl:bg-linear-to-b xl:from-card-alt xl:to-background xl:pb-0 xl:mx-auto"
    >
      {/* fond + overlay brun — mobile/tablet ; `.dark` résout `--background` en brun */}
      <div className="dark absolute inset-0 xl:hidden">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/85 md:from-background/50 md:via-transparent md:to-background" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* deux sous-arbres exclusifs : `.dark` mobile/tablet (texte clair sur voile brun)
            vs thème clair desktop — aucun token clair n'est atteignable depuis `.dark`. */}
        <div className="dark flex w-full flex-col gap-8 py-8 md:px-8 md:py-0 xl:hidden">
          <HeroCopy
            headingId="hero-heading"
          />
          {/* ScrollHint — tablet uniquement */}
          <ScrollHint label="QUATRE PROMESSES" className="hidden md:flex" />
        </div>

        <div className="hidden w-full xl:max-w-306 xl:flex xl:min-h-108 xl:flex-row xl:items-center xl:justify-between">
          <HeroCopy 
            outlineCtaClassName="bg-transparent text-foreground border-chart-5"
          />
          <HeroImage image={image} />
        </div>
      </div>
    </section>
  )
}

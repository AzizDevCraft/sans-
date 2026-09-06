import { ArrowRightIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type {
  HeroContent,
  ImageRef,
} from "../../../design/units/homepage/data-contract"

import { ScrollHint } from "./hero/ScrollHint"

/** Hero homepage : sombre en mobile/tablet (`.dark`), clair en desktop `xl:`. */

// mock : données via server-builder
const HERO: HeroContent = {
  image: {
    url: "https://placehold.co/1200x920",
    alt: "Mousse au chocolat onctueuse dans un bol, cuillère en bambou posée dessus, pépites de chocolat éparpillées autour",
    width: 1200,
    height: 920,
  },
}

function HeroImage({ image }: { image: ImageRef }) {
  return (
    <div className="hidden min-w-0 xl:block">
      {/* mock : next/image via server-builder */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-auto w-full max-w-149.25 -rotate-3 rounded-lg object-cover shadow-hero-image"
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

      {/* TODO(logic-builder): navigation des 2 CTA */}
      <div className="flex flex-col gap-4 md:flex-row xl:gap-6">
        <Button
          variant="primary"
          size="brand"
          fullWidth
          trailingIcon={<ArrowRightIcon className="hidden size-5 md:block" />}
          className="pr-5 md:w-auto md:pr-4 dark:bg-chart-1 dark:hover:bg-chart-1/80"
        >
          Découvrir les Snacks
        </Button>
        <Button
          variant="outline"
          size="brand"
          fullWidth
          className={cn("md:w-auto", outlineCtaClassName)}
        >
          Faire le quiz
        </Button>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { image } = HERO

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden px-5 md:px-0 md:pb-8 xl:min-h-200 xl:justify-center xl:bg-linear-to-b xl:from-card-alt xl:to-background xl:pb-0 xl:mx-auto"
    >
      {/* fond + overlay brun — mobile/tablet ; `.dark` résout `--background` en brun */}
      <div className="dark absolute inset-0 xl:hidden">
        {/* mock : next/image via server-builder */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.alt}
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

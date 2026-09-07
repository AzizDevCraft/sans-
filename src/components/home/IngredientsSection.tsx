import type { ComponentType, SVGProps } from "react"

import { IconBadge } from "@/components/IconBadge"
import { SectionHeading } from "@/components/SectionHeading"
import Amande from "@/components/icons/Amande"
import CaloriesIcon from "@/components/icons/CaloriesIcon"
import NoSugar from "@/components/icons/NoSugar"
import { cn } from "@/lib/utils"

import type { IngredientGalleryImage } from "../../../design/units/homepage/data-contract"

const DESCRIPTION =
  "Flocons d'avoine, dattes, amandes, graines naturelles. Pas d'additifs cachés. Pas de noms scientifiques. Juste des aliments que vous connaissez, assemblés avec soin."

interface IngredientItemData {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone: "card" | "card-alt"
  title: string
  subtitle: string
}

const INGREDIENT_ITEMS: readonly IngredientItemData[] = [
  {
    icon: CaloriesIcon,
    tone: "card",
    title: "Flocons d'avoine",
    subtitle: "Source de fibres et d'énergie durable",
  },
  {
    icon: Amande,
    tone: "card-alt",
    title: "Amande",
    subtitle: "Protéines végétales et bonnes graisses",
  },
  {
    icon: NoSugar,
    tone: "card",
    title: "Sucres Naturels",
    subtitle: "Dattes, miel et fruits pour la douceur",
  },
]

// mock — grille dynamique fournie via le contrat `IngredientGalleryImage[]` (server-builder)
const GALLERY_IMAGES: readonly IngredientGalleryImage[] = [
  {
    id: "ingredient-gallery-0",
    position: 0,
    url: "https://placehold.co/530x730",
    alt: "Sandwich complet garni, tenu à la main sur fond jaune",
    width: 530,
    height: 730,
  },
  {
    id: "ingredient-gallery-1",
    position: 1,
    url: "https://placehold.co/530x545",
    alt: "Bol de pâte de dattes avec pépites de chocolat et cuillère en bois",
    width: 530,
    height: 545,
  },
  {
    id: "ingredient-gallery-2",
    position: 2,
    url: "https://placehold.co/530x545",
    alt: "Trois gobelets de snacks SANS+ tenus à la main",
    width: 530,
    height: 545,
  },
  {
    id: "ingredient-gallery-3",
    position: 3,
    url: "https://placehold.co/530x730",
    alt: "Bouchée énergétique tenue au-dessus d'une pile de bouchées sur fond vert",
    width: 530,
    height: 730,
  },
]

function IngredientItem({ icon: Icon, tone, title, subtitle }: IngredientItemData) {
  return (
    <li className="flex items-center gap-4 md:gap-6">
      <IconBadge size="md" tone={tone} shape="rounded" elevated={false} inset="md">
        <Icon aria-hidden />
      </IconBadge>
      <div className="flex min-w-0 flex-col gap-2 xl:gap-3">
        <h3 className="font-semibold leading-6.5 text-foreground md:text-xl md:leading-7.5">
          {title}
        </h3>
        <p className="text-xs leading-3.75 text-muted-foreground md:text-base md:leading-6.5">
          {subtitle}
        </p>
      </div>
    </li>
  )
}

// hauteur d'une tuile selon sa forme (haute / basse)
const TILE_SHAPE = {
  tall: "aspect-[3/4]",
  short: "aspect-square",
} as const

function GalleryTile({
  image,
  shape,
}: {
  image: IngredientGalleryImage
  shape: keyof typeof TILE_SHAPE
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md md:rounded-lg",
        TILE_SHAPE[shape]
      )}
    >
      {/* mock — next/image via server-builder */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

// IngredientImageGrid — 2 colonnes de 2 tuiles, décalage vertical inversé entre colonnes.
function IngredientImageGrid({
  images,
  className,
}: {
  images: readonly IngredientGalleryImage[]
  className?: string
}) {
  const sorted = [...images].sort((a, b) => a.position - b.position)

  if (sorted.length < 4) return null

  const [tile0, tile1, tile2, tile3] = sorted

  return (
    <div
      className={cn(
        "flex w-full flex-row gap-5 md:gap-6 xl:min-w-0 xl:flex-1 xl:max-w-138.5",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-5 pb-6 md:pb-12 md:gap-6 xl:pt-12 xl:pb-0">
        <GalleryTile image={tile0} shape="tall" />
        <GalleryTile image={tile1} shape="short" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-5 pt-6 md:pt-12 md:gap-6 xl:pt-0 xl:pb-12">
        <GalleryTile image={tile2} shape="short" />
        <GalleryTile image={tile3} shape="tall" />
      </div>
    </div>
  )
}

export function IngredientsSection() {
  return (
    <section className="flex flex-col items-start gap-8 rounded-tr-xl bg-background px-5 pt-3 pb-7 md:rounded-tr-none md:px-8 xl:min-h-247 xl:flex-row xl:items-center xl:justify-center xl:gap-13">
      <div className="contents xl:flex xl:w-full xl:min-w-0 xl:max-w-130 xl:flex-col xl:gap-8">
        <SectionHeading
          eyebrow="PRODUITS DE QUALITÉ"
          title="Des ingrédients que vous reconnaissez"
          subtitle={DESCRIPTION}
          align="start"
        />

        <ul className="order-2 flex w-full flex-col gap-6 py-2 xl:order-0">
          {INGREDIENT_ITEMS.map((item) => (
            <IngredientItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <IngredientImageGrid
        images={GALLERY_IMAGES}
        className="order-1 xl:order-0"
      />
    </section>
  )
}

import Image from "next/image"

import type { ShopProduct } from "@/data/shop"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CaloriesIcon from "@/components/icons/CaloriesIcon"
import ProteinIcon from "@/components/icons/ProteinIcon"

export type ProductTone = "default" | "alt"

// "6 DT" si unitCount === 1, sinon "6 DT/3P"
function formatPrice(price: number, unitCount: number) {
  return unitCount === 1 ? `${price} DT` : `${price} DT/${unitCount}P`
}

// Description mobile : `title` ("Nom - description") sans le préfixe "Nom - "
function getMobileDescription(name: string, title: string) {
  const prefix = `${name} - `
  return title.startsWith(prefix) ? title.slice(prefix.length) : title
}

function NutritionRow({
  calories,
  proteins,
}: {
  calories: number | null
  proteins: number
}) {
  return (
    <>
      {/* mobile : pills */}
      <div className="flex items-center gap-1 md:hidden">
        <span className="inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-muted-foreground">
          <CaloriesIcon className="size-4" />
          <span className="text-xs tracking-[0.24px]">{calories ?? "–"} kcal</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-card-alt px-2 py-0.5 text-muted-foreground">
          <ProteinIcon className="size-4" />
          <span className="text-xs tracking-[0.24px]">{proteins} g</span>
        </span>
      </div>

      {/* tablet/desktop : ligne icône + texte, pas de pill */}
      <div className="hidden items-center justify-between md:flex md:w-full">
        <span className="inline-flex items-center gap-0 text-card-alt-foreground">
          <CaloriesIcon className="size-6" />
          <span className="text-base text-muted-foreground">{calories ?? "–"} kcal</span>
        </span>
        <span className="inline-flex items-center gap-1 text-card-foreground">
          <ProteinIcon className="size-6" />
          <span className="text-base text-muted-foreground">{proteins}g</span>
        </span>
      </div>
    </>
  )
}

export interface ProductCardProps {
  product: ShopProduct
  tone: ProductTone
}

// Mobile : carte horizontale sans CTA. Tablet/desktop : verticale avec badge prix + CTA.
export function ProductCard({ product, tone }: ProductCardProps) {
  const { name, title, price, unitCount, calories, proteins, image } = product
  const mobileDescription = getMobileDescription(name, title)

  return (
    // overflow-visible dès md: pour ne pas rogner l'ombre du bloc contenu
    <article className="flex w-full max-w-87.5 overflow-hidden rounded-md bg-background shadow-base md:w-82.5 md:max-w-none md:flex-col md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none xl:w-90">
      <div className="relative h-40 w-31 shrink-0 overflow-hidden rounded-tl-md rounded-bl-md md:h-70 md:w-full md:rounded-tl-xl md:rounded-tr-xl md:rounded-bl-none">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 744px) 330px, 124px"
          className="object-cover"
        />

        {/* badge prix — tablet/desktop uniquement, superposé sur l'image */}
        <span className="hidden items-center justify-center rounded-full bg-background px-3 py-1 text-base font-bold text-foreground md:absolute md:top-3.5 md:right-3.5 md:flex">
          {formatPrice(price, unitCount)}
        </span>
      </div>

      {/* tablet/desktop : ombre sur le bloc contenu seul */}
      <div className="flex min-w-0 flex-1 flex-col justify-between bg-background px-4 py-3 md:items-center md:justify-start md:gap-6 md:rounded-b-xl md:p-3 md:shadow-base">
        {/* mobile : nom + description séparés */}
        <div className="flex flex-col gap-1 md:hidden">
          <h3 className="text-xl leading-6.5 font-semibold text-foreground">{name}</h3>
          <p className="text-xs leading-[15px] font-medium text-muted-foreground">{mobileDescription}</p>
        </div>

        {/* tablet/desktop : titre combiné, hauteur fixe */}
        <h3 className="hidden text-xl leading-8 font-bold text-foreground md:block md:h-16 md:w-full md:line-clamp-2">
          {title}
        </h3>

        {/* md:contents retire le wrapper du flux dès md: */}
        <div className="flex flex-col gap-3 md:contents">
          <NutritionRow calories={calories} proteins={proteins} />

          {/* mobile : prix en texte simple */}
          <p className="text-base leading-6.4 font-semibold text-foreground md:hidden">
            {formatPrice(price, unitCount)}
          </p>
        </div>

        {/* TODO(logic-builder): brancher la navigation vers la fiche produit */}
        <Button
          variant="secondary"
          fullWidth
          className={cn(
            "hidden h-auto rounded-sm px-5.5 py-2.5 text-base font-semibold md:inline-flex",
            tone === "alt"
              ? "bg-primary-soft text-primary-soft-foreground hover:bg-primary-soft/80"
              : "bg-secondary-soft text-secondary-soft-foreground hover:bg-secondary-soft/80"
          )}
        >
          Voir les détails
        </Button>
      </div>
    </article>
  )
}

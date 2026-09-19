import { SectionHeading } from "@/components/SectionHeading"
import type { HomePartner } from "@/data/homepage"

const HEADING_TITLE = "Ils ont choisi SANS+"
const HEADING_SUBTITLE = "Retrouvez nos produits chez nos partenaires de confiance"

interface PartnerItemProps {
  /** Nom de l'établissement. */
  name: string
  /** Localisation affichée sous le nom. */
  location: string
  /** `true` sur la 2ᵉ copie de la bande : item masqué aux lecteurs d'écran. */
  "aria-hidden"?: boolean
}

function PartnerItem({
  name,
  location,
  "aria-hidden": ariaHidden,
}: PartnerItemProps) {
  return (
    <li
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 flex-col items-center gap-1 pr-8 text-center md:pr-24"
    >
      <h3 className="text-xl font-semibold leading-6.5 text-foreground md:text-2xl md:leading-7.75">
        {name}
      </h3>
      <p className="leading-6.5 text-muted-foreground">
        {location}
      </p>
    </li>
  )
}

export interface PartnersSectionProps {
  /** Liste complète des partenaires, triée par `position`. */
  partners: HomePartner[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Pas de partenaires publiés → pas de section (évite un heading orphelin).
  if (partners.length === 0) return null

  const half =
    partners.length >= 4
      ? partners
      : Array.from({ length: Math.ceil(4 / partners.length) }, () => partners).flat()
  const track = [...half, ...half]

  return (
    <section
      aria-label="Nos partenaires"
      className="flex w-full flex-col items-center gap-12 overflow-hidden bg-background-alt px-5 pt-6 pb-7 md:gap-10 md:px-8 xl:gap-24 xl:px-39 xl:py-28"
    >
      <SectionHeading
        align="center"
        eyebrow="NOS PARTENAIRES"
        title={HEADING_TITLE}
        subtitle={HEADING_SUBTITLE}
      />

      <div className="-mx-5 self-stretch overflow-hidden md:-mx-8 xl:-mx-39 motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee hover:paused motion-reduce:animate-none">
          {track.map((partner, i) => (
            <PartnerItem
              key={`${partner.id}-${i}`}
              name={partner.name}
              location={partner.location}
              aria-hidden={i >= half.length}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

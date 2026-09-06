import type { ComponentType, SVGProps } from "react"

import { IconBadge } from "@/components/IconBadge"
import { SectionHeading } from "@/components/SectionHeading"
import {
  CheckIcon,
  EngagementChecklistIcon,
  OpenBookIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

type EngagementTone = "card" | "card-alt"

interface EngagementCardData {
  tone: EngagementTone
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
  items: string[]
}

const HEADING_SUBTITLE = "Transparence totale sur nos recettes et nos valeurs nutritionnelles"

const CARDS: EngagementCardData[] = [
  {
    tone: "card",
    Icon: EngagementChecklistIcon,
    title: "Transparence Nutritionnelle",
    description:
      "Chaque produit affiche clairement ses valeurs nutritionnelles et sa liste d'ingrédients. Pas de surprises, que des informations claires.",
    items: [
      "Tableau nutritionnel complet",
      "Liste d'ingrédients détaillée",
      "Allergènes clairement identifiés",
    ],
  },
  {
    tone: "card-alt",
    Icon: OpenBookIcon,
    title: "Recettes Propres",
    description:
      "Nos recettes sont simples et naturelles. Nous n'utilisons que des ingrédients que vous pourriez avoir dans votre cuisine.",
    items: [
      "Zéro additif artificiel",
      "Pas de conservateurs",
      "Ingrédients reconnaissables",
    ],
  },
]

const toneStyles: Record<
  EngagementTone,
  { card: string; title: string; icon: string }
> = {
  card: {
    card: "bg-card",
    title: "text-primary-foreground",
    icon: "text-card-foreground",
  },
  "card-alt": {
    card: "bg-card-alt",
    title: "text-foreground",
    icon: "text-card-alt-foreground",
  },
}

interface ChecklistItemProps {
  label: string
  iconClassName: string
}

function ChecklistItem({ label, iconClassName }: ChecklistItemProps) {
  return (
    <li className="flex flex-row items-end gap-3 xl:items-center">
      <CheckIcon
        aria-hidden="true"
        className={cn("size-5 shrink-0", iconClassName)}
      />
      <span className="leading-6.5 text-muted-foreground">
        {label}
      </span>
    </li>
  )
}

function EngagementCard({
  tone,
  Icon,
  title,
  description,
  items,
}: EngagementCardData) {
  const styles = toneStyles[tone]

  return (
    <li
      className={cn(
        "flex w-full items-center rounded-xl px-6 py-8 md:min-w-0 md:flex-1 md:px-5 md:h-115 md:max-w-116 xl:h-120 xl:max-w-130 xl:rounded-2xl xl:px-12 xl:py-1",
        styles.card
      )}
    >
      <div className="flex w-full flex-col gap-6 xl:gap-8">
        <IconBadge
          size="sm"
          tone="surface"
          shape="rounded"
          inset="sm"
          elevated
          className="xl:size-18"
        >
          <Icon aria-hidden="true" className={styles.icon} />
        </IconBadge>

        <h3
          className={cn(
            "text-2xl font-semibold leading-7.75",
            styles.title
          )}
        >
          {title}
        </h3>

        <p className="leading-6.5 text-muted-foreground max-w-120">
          {description}
        </p>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <ChecklistItem
              key={item}
              label={item}
              iconClassName={styles.icon}
            />
          ))}
        </ul>
      </div>
    </li>
  )
}

export function EngagementSection() {
  return (
    <section className="flex flex-col items-center bg-background px-5 pt-6 pb-10 md:px-8 md:justify-center xl:min-h-234.5">
      <div className="flex w-full flex-col items-center gap-12 xl:max-w-282 xl:gap-24">
        <SectionHeading
          align="center"
          eyebrow="TRANSPARENCE"
          title="Notre Engagement"
          subtitle={HEADING_SUBTITLE}
        />

        <ul className="flex w-full flex-col items-center gap-6 md:max-w-244 md:flex-row md:justify-between xl:max-w-282 xl:gap-22">
          {CARDS.map((card) => (
            <EngagementCard key={card.title} {...card} />
          ))}
        </ul>
      </div>
    </section>
  )
}

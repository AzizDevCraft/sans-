import type { ComponentType, SVGProps } from "react"

import { ArrowLink } from "@/components/ArrowLink"
import { IconBadge } from "@/components/IconBadge"
import { SectionHeading } from "@/components/SectionHeading"
import Coeur from "@/components/icons/coeur"
import Panier from "@/components/icons/panier"
import QuizIcon from "@/components/icons/quiz"
import { cn } from "@/lib/utils"

type NavCardTone = "card" | "card-alt"

interface NavCardData {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
  linkLabel: string
  href: string
  // `tone` pilote le fond de la carte, la couleur du titre et celle de l'icône
  tone: NavCardTone
  className?: string
}

// TODO(logic-builder): destinations des cartes non spécifiées
const NAV_CARDS: readonly NavCardData[] = [
  {
    icon: Panier,
    title: "Boutique",
    description: "Explorer tous nos produits et commandez en ligne",
    linkLabel: "Découvrir",
    href: "#",
    tone: "card",
    className: "md:col-span-2",
  },
  {
    icon: QuizIcon,
    title: "Quiz Personnalisé",
    description: "Trouvez les snacks adaptés à vos besoins",
    linkLabel: "Commencer",
    href: "#",
    tone: "card-alt",
  },
  {
    icon: Coeur,
    title: "Nos BestSellers",
    description: "Jetez un coup d'œil sur notre trio gagnant",
    linkLabel: "En savoir plus",
    href: "#",
    tone: "card",
  },
]

const toneCardClasses: Record<NavCardTone, string> = {
  card: "bg-card",
  "card-alt": "bg-card-alt",
}

const toneTitleClasses: Record<NavCardTone, string> = {
  card: "text-primary-foreground",
  "card-alt": "text-foreground",
}

const toneIconClasses: Record<NavCardTone, string> = {
  card: "text-card-foreground",
  "card-alt": "text-card-alt-foreground",
}

function NavCard({
  icon: Icon,
  title,
  description,
  linkLabel,
  href,
  tone,
  className,
}: NavCardData) {
  return (
    <article
      className={cn(
        "flex w-full flex-col items-start gap-4 rounded-xl px-7 py-6 md:gap-8 md:p-8 xl:min-w-0 xl:flex-1",
        toneCardClasses[tone],
        className
      )}
    >
      <IconBadge
        size="sm"
        tone="surface"
        shape="rounded"
        elevated
        inset="sm"
        className="md:size-18"
      >
        <Icon
          aria-hidden="true"
          className={cn(toneIconClasses[tone])}
        />
      </IconBadge>

      <div className="flex min-w-0 flex-col gap-2">
        <h3
          className={cn(
            "text-2xl leading-7.75 font-semibold",
            toneTitleClasses[tone]
          )}
        >
          {title}
        </h3>
        <p className="leading-6.5 text-muted-foreground">{description}</p>
      </div>

      <ArrowLink href={href}>{linkLabel}</ArrowLink>
    </article>
  )
}

export function NavigationSection() {
  return (
    <section
      aria-label="Par où voulez-vous commencer ?"
      className="flex flex-col items-start bg-background px-5 pt-3 pb-10 md:px-8 xl:min-h-170 xl:items-center xl:justify-center"
    >
      <div className="flex w-full flex-col gap-8 xl:mx-auto xl:max-w-282 xl:gap-24">
        <SectionHeading
          eyebrow="NAVIGATION"
          title="Par où voulez-vous commencer ?"
          align="start"
          className="w-full"
        />

        <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:grid-rows-2 xl:flex xl:min-h-76 xl:flex-row xl:items-center">
          {NAV_CARDS.map((card) => (
            <NavCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

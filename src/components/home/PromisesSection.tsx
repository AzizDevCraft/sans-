import type { ComponentType, SVGProps } from "react"

import { IconBadge } from "@/components/IconBadge"
import { SectionHeading } from "@/components/SectionHeading"
import Block from "@/components/icons/Block"
import Coeur from "@/components/icons/coeur"
import GymIcon from "../icons/gym-icon"
import Vegan from "../icons/vegan"
import { cn } from "@/lib/utils"

interface PromiseItemData {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  subtitle: string
  tone: "card" | "card-alt"
  // Classes order-* pour l'ordre visuel mobile (1, 2, 4, 3), neutralisées dès md:.
  itemClassName?: string
}

const PROMISES: readonly PromiseItemData[] = [
  {
    icon: Vegan,
    title: "Sans Sucre ajouté",
    subtitle: "Naturellement sucré",
    tone: "card",
  },
  {
    icon: Block,
    title: "Sans Additifs",
    subtitle: "Ingrédients purs",
    tone: "card-alt",
  },
  {
    icon: GymIcon,
    title: "Équilibré",
    subtitle: "Nutrition optimale",
    tone: "card-alt",
    itemClassName: "order-4 md:order-none",
  },
  {
    icon: Coeur,
    title: "Fait Avec Amour",
    subtitle: "Artisanal tunisien",
    tone: "card",
    itemClassName: "order-3 md:order-none",
  },
]

function PromiseItem({ icon: Icon, title, subtitle, tone, itemClassName }: PromiseItemData) {
  return (
    <li
      className={cn(
        "flex items-center gap-4 md:min-w-70 xl:gap-5",
        itemClassName
      )}
    >
      <IconBadge size="md" tone={tone} shape="rounded" elevated={false} inset="md">
        <Icon />
      </IconBadge>
      <div className="flex min-w-0 flex-col">
        <p className="text-[20px]/[30px] font-semibold text-foreground">{title}</p>
        <p className="text-[16px]/[24px] font-medium text-muted-foreground md:text-[16px]/[25.6px]">
          {subtitle}
        </p>
      </div>
    </li>
  )
}

export function PromisesSection() {
  return (
    <section
      aria-label="Quatre promesses"
      className="flex flex-col items-start bg-background px-5 py-10 md:px-8 xl:items-center xl:justify-center xl:p-1"
    >
      <div className="flex w-full flex-col gap-12 md:gap-8 xl:max-w-282 xl:flex-row xl:items-center xl:justify-between">
        <SectionHeading
          eyebrow="NOTRE SIGNATURE"
          title={
            <>
              Quatre promesses,{" "}
              <span className="text-foreground md:text-card-foreground">
                zéro compromis.
              </span>
            </>
          }
          align="start"
          className="md:max-w-96.5 xl:max-w-99"
        />

        <ul className="flex w-full flex-col gap-11 md:flex-row md:flex-wrap md:justify-between md:gap-x-0 md:gap-y-8">
          {PROMISES.map((promise) => (
            <PromiseItem key={promise.title} {...promise} />
          ))}
        </ul>
      </div>
    </section>
  )
}

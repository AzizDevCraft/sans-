import type { Route } from "next"
import Link from "next/link"

import { Logo } from "@/components/Logo"
import Coeur from "@/components/icons/coeur"
import GlovoLogo from "@/components/icons/glovoLogo"
import { NAV_LINKS } from "../lib/nav-links"
import { cn } from "@/lib/utils"

import { SocialLinks } from "./SocialLinks"

interface FooterNavLink {
  label: string
  href: Route
}

const INFORMATION_LINKS: readonly FooterNavLink[] = [
  { label: "Livraison", href: "/livraison" as Route },
  { label: "Paiement", href: "/paiement" as Route },
  { label: "CGV", href: "/cgv" as Route },
  { label: "FAQ", href: "/faq" as Route },
]

function DeliveryBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-4",
        className
      )}
    >
      <GlovoLogo className="size-10 shrink-0 text-foreground" aria-hidden />
      <div className="flex flex-col">
        <span className="leading-6 uppercase text-muted-foreground md:leading-6.5">
          Livraison
        </span>
        <span className="text-xl leading-7.5 font-semibold text-foreground">
          via Glovo uniquement
        </span>
      </div>
    </div>
  )
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: readonly FooterNavLink[]
}) {
  return (
    <div className="flex w-full flex-col gap-4 md:w-auto xl:flex-1">
      <h4 className="text-xl font-semibold leading-6.5 text-foreground">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="leading-6 text-muted-foreground md:leading-6.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FollowUsColumn() {
  return (
    <div className="flex w-full flex-col gap-4 md:w-auto xl:flex-1">
      <h4 className="text-xl font-semibold leading-6.5 text-foreground">
        Suivez-nous
      </h4>
      <SocialLinks
        className="gap-4"
        buttonClassName="size-12 bg-card text-foreground"
      />
      <p className="max-w-64.5 text-sm leading-normal text-muted-foreground">
        Restez connectés pour nos nouveautés
      </p>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="dark bg-background px-5 py-12 md:px-8 md:py-16 xl:px-20 xl:py-16">
      <div className="mx-auto flex w-full max-w-87.5 flex-col gap-10 px-8 md:max-w-none md:px-0 xl:max-w-7xl xl:px-8">
        <div className="flex w-full flex-col gap-10 md:flex-row md:flex-wrap md:items-start md:gap-y-10 xl:flex-nowrap xl:items-start xl:gap-8">
          <div className="flex w-full flex-col gap-10 md:basis-full md:flex-row md:items-center md:justify-between md:gap-5 xl:w-auto xl:basis-auto xl:flex-col xl:items-start xl:justify-start xl:gap-5">
            <div className="flex flex-col gap-5">
              <h3>
                <Logo size="md" />
              </h3>
              <p className="max-w-64.5 leading-6 text-muted-foreground md:leading-6.5">
                Des snacks sains et gourmands pour une vie équilibrée.
              </p>
            </div>
            <DeliveryBadge />
          </div>

          <div className="flex w-full flex-col gap-10 md:basis-full md:flex-row md:flex-wrap md:justify-between md:gap-x-8 md:gap-y-10 xl:basis-auto xl:flex-1 xl:flex-nowrap xl:justify-start xl:gap-8">
            <FooterLinkColumn title="Navigation" links={NAV_LINKS} />
            <FooterLinkColumn title="Informations" links={INFORMATION_LINKS} />
            <FollowUsColumn />
          </div>
        </div>

        <div className="w-full border-t border-card pt-8">
          <p className="text-center leading-6 text-muted-foreground md:hidden">
            © 2024 SANS+. Tous droits réservés.
          </p>
          <p className="hidden text-center leading-6.5 text-muted-foreground md:block">
            © 2024 SANS+. Tous droits réservés. Fait avec{" "}
            <Coeur aria-hidden className="inline-block size-4 align-middle text-chart-1" />
            <span className="sr-only"> ♥ </span>
            en Tunisie
          </p>
        </div>
      </div>
    </footer>
  )
}

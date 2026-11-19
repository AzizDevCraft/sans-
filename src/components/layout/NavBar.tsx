"use client"

import type { Route } from "next"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/Logo"
import Panier from "@/components/icons/panier"
import Profile from "@/components/icons/profile"
import MenuIcon from "@/components/icons/MenuIcon"

export interface NavLinkItem {
  label: string
  href: Route
  active?: boolean
}

export interface NavBarProps {
  /**
   * `on-hero` = mobile/tablet uniquement, fond sombre. `default` = fond clair. 
   * Piloté par SiteChrome via IntersectionObserver sur `[data-hero-boundary]` (absent
   * hors homepage → toujours "default") ; toujours "default" en desktop
   * (xl:) quoi qu'il arrive, appliqué ici en dur via les classes `xl:`.
   */
  variant: "default" | "on-hero"
  /**
   * La page a un hero : sur mobile/tablet la barre est `fixed` dès le départ
   * (posée sur le hero, hors du flux), la variante seule change au scroll.
   */
  hasHero: boolean
  /** Accueil / Boutique / Quiz / Contact — `active` = page courante. */
  links: NavLinkItem[]
  /** Ouvre le MobileMenu (state local dans SiteChrome). */
  onMenuClick: () => void
}

export function NavBar({ variant, hasHero, links, onMenuClick }: NavBarProps) {
  const onHero = variant === "on-hero"

  return (
    <header
      data-navbar
      className={cn(
        "z-50 w-full",
        hasHero ? "fixed inset-x-0 top-0 xl:sticky" : "sticky top-0",
        "max-xl:transition-[background-color,box-shadow,backdrop-filter] max-xl:duration-300 max-xl:ease-out",
        "max-xl:[&_*]:transition-colors max-xl:[&_*]:duration-300 max-xl:[&_*]:ease-out",
        onHero
          ? "bg-background/20 backdrop-blur-[12.5px] md:backdrop-blur-[50px] xl:bg-background xl:shadow-light"
          : "bg-background shadow-light"
      )}
    >
      <div className="flex w-full items-center justify-between px-5 py-3 md:h-20 md:px-8 md:py-0 xl:mx-auto xl:h-20 xl:w-282 xl:px-0">
        <Link href="/" aria-label="Accueil" className="md:hidden">
          <Logo size="sm" tone={onHero ? "cream" : "default"} />
        </Link>
        <Link href="/" aria-label="Accueil" className="hidden md:inline-flex xl:hidden">
          <Logo size="md" tone={onHero ? "cream" : "default"} />
        </Link>
        <Link href="/" aria-label="Accueil" className="hidden xl:inline-flex">
          <Logo size="md" tone="default" />
        </Link>

 
        <div className="flex items-center gap-4 md:hidden">
          <CartButton iconClassName={cn(onHero ? "text-muted" : "text-muted-foreground")} />
          <button type="button" onClick={onMenuClick} aria-label="Ouvrir le menu">
            <MenuIcon aria-hidden="true" className={cn("size-9", onHero ? "text-muted" : "text-muted-foreground")} />
          </button>
        </div>

        {/* Liens + séparateur + user + panier : tablet/desktop */}
        <div className="hidden items-center md:flex md:gap-4 xl:gap-6">
          <nav aria-label="Navigation principale">
            <ul className="flex items-center gap-6 leading-6.5 xl:gap-8 xl:text-xl xl:leading-7.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "font-medium",
                      onHero ? "text-muted xl:text-foreground" : "text-foreground",
                      link.active &&
                        cn(
                          "border-b-2 pb-1",
                          onHero ? "border-secondary-soft-foreground xl:border-card-foreground" : "border-card-foreground"
                        )
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <span aria-hidden className="h-6 w-px bg-border" />

          {/* UI seule : pas d'authentification pour l'instant. */}
          <button type="button" aria-label="Mon compte">
            <Profile
              aria-hidden="true"
              className={cn("size-6", onHero ? "text-muted xl:text-muted-foreground" : "text-muted-foreground")}
            />
          </button>
          <CartButton
            iconClassName={cn(onHero ? "text-muted xl:text-muted-foreground" : "text-muted-foreground")}
          />
        </div>
      </div>
    </header>
  )
}

// UI seule : pas de panier pour l'instant.
function CartButton({ iconClassName }: { iconClassName: string }) {
  return (
    <button type="button" aria-label="Voir le panier">
      <Panier aria-hidden="true" className={cn("size-6", iconClassName)} />
    </button>
  )
}

import Link from "next/link"

import { Logo } from "@/components/Logo"
import CloseIcon from "@/components/icons/CloseIcon"
import LoginIcon from "@/components/icons/login-icon"
import Panier from "@/components/icons/panier"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { NavLinkItem } from "./NavBar"
import { SocialLinks } from "./SocialLinks"

// Montage conditionnel et scroll-lock gérés par SiteChrome : ce composant
// reste un pur rendu contrôlé par props.

export interface MobileMenuProps {
  /** Accueil / Boutique / Quiz / Contact — `active` déjà résolu via pathname (SiteChrome). */
  links: readonly NavLinkItem[]
  /** Ferme le panneau (croix ou clic sur un lien). */
  onClose: () => void
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-background-alt px-5 py-10"
    >
      <div className="flex w-full max-w-87.5 flex-col gap-15 self-center">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Accueil" onClick={onClose}>
            <Logo size="sm" />
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="text-foreground size-11 place-items-center"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <nav aria-label="Navigation principale">
          <ul className="flex flex-col gap-6">
            {links.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  onClick={onClose}
                  className="flex flex-col gap-5"
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={cn(
                        "flex-1 font-heading text-8 leading-10 font-bold tracking-figma-1",
                        item.active ? "text-card-foreground" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="leading-5 font-semibold text-card-alt-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="h-px w-full bg-card-alt" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex w-full max-w-87.5 flex-col items-center gap-8 self-center">
        {/* Carte panier (1340:984) — UI seule, valeurs en dur : pas de panier pour l'instant. */}
        <div
          className="flex w-full items-center justify-between rounded-md bg-background px-3 py-2 shadow-base"
        >
          <span className="flex items-center gap-3">
            <Panier className="size-9 shrink-0 text-muted-foreground" />
            <span className="font-medium text-foreground">
              Mon panier · 0
            </span>
          </span>
          <span className="text-xl leading-6.5 font-semibold text-foreground">
            0 DT
          </span>
        </div>

        {/* Bouton « Se Connecter » (1543:5227) — UI seule : pas d'authentification pour l'instant. */}
        <Button
          type="button"
          variant="primary"
          size="brand"
          fullWidth
        >
          <LoginIcon />
          Se Connecter
        </Button>

        <SocialLinks
          className="gap-5"
          buttonClassName="size-11 bg-background p-1 text-muted-foreground shadow-base"
        />
      </div>
    </div>
  )
}

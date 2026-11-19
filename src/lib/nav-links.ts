import type { Route } from "next"

import type { NavLinkItem } from "@/components/layout/NavBar"

interface NavLinkBase {
  label: string
  href: Route
}

/** Source unique — réutilisée par NavBar (tablet/desktop), MobileMenu et Footer. */
export const NAV_LINKS: readonly NavLinkBase[] = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Quiz", href: "/quiz" },
  { label: "Contact", href: "/contact" },
]

/** Calcule l'état `active` de chaque lien à partir du pathname courant. */
export function getNavLinks(pathname: string): NavLinkItem[] {
  return NAV_LINKS.map((link) => ({
    ...link,
    active: pathname === link.href || pathname.startsWith(`${link.href}/`),
  }))
}

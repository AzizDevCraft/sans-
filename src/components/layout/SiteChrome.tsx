"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import { usePathname } from "next/navigation"

import { getNavLinks } from "@/lib/nav-links"

import { MobileMenu } from "./MobileMenu"
import { NavBar } from "./NavBar"

export interface SiteChromeProps {
  children: ReactNode
}

/**
 * Wrapper client (state menu mobile, variante `on-hero`) — rend
 * NavBar + le contenu de page + MobileMenu. `layout.tsx` reste un Server
 * Component, seul ce fichier passe côté client.
 */
export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname()
  // "/" est actuellement la seule page avec un hero sombre ;
  const hasHero = pathname === "/"

  const [menuOpen, setMenuOpen] = useState(false)
  // Variante initiale dérivée de la route pour éviter un flash au premier rendu
  const [variant, setVariant] = useState<"default" | "on-hero">(
    hasHero ? "on-hero" : "default" 
  )

  const links = getNavLinks(pathname)

  // Ferme le menu et réinitialise la variante à chaque changement de route
  // (pattern React « adjusting state when a prop changes »).
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMenuOpen(false)
    setVariant(hasHero ? "on-hero" : "default")
  }

  useEffect(() => {
    const heroEl = document.querySelector<HTMLElement>("[data-hero-boundary]")
    if (!heroEl) return

    const navHeight = document.querySelector<HTMLElement>("[data-navbar]")?.offsetHeight ?? 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVariant(entry.isIntersecting ? "on-hero" : "default")
      },
      { threshold: 0, rootMargin: `-${navHeight}px 0px 0px 0px` }
    )

    observer.observe(heroEl)

    return () => observer.disconnect()
  }, [pathname])

  // Bloque le scroll de la page tant que MobileMenu est ouvert.
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <div className="flex flex-1 flex-col">
      <NavBar
        variant={variant}
        hasHero={hasHero}
        links={links}
        onMenuClick={() => setMenuOpen(true)}
      />

      {children}

      {menuOpen && <MobileMenu links={links} onClose={() => setMenuOpen(false)} />}
    </div>
  )
}

import type { ComponentType } from "react"

import type { IconProps } from "@/config/types"
import FacebookIcon from "@/components/icons/FacebookIcon"
import InstaLogo from "@/components/icons/instaLogo"
import TiktokLogo from "@/components/icons/tiktokLogo"
import { cn } from "@/lib/utils"

interface SocialLink {
  label: string
  href: string
  Icon: ComponentType<IconProps>
}

// Ordre unique pour tous les emplacements : Instagram, TikTok, Facebook.
const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/sans.plus_/", Icon: InstaLogo },
  { label: "TikTok", href: "https://www.tiktok.com/@sans.plus__", Icon: TiktokLogo },
  // Compte Facebook à venir : bouton conservé, URL générique en attendant.
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
]

export interface SocialLinksProps {
  className?: string
  /** Taille, fond et couleur du rond, propres à chaque emplacement. */
  buttonClassName?: string
}

/** Rangée de ronds sociaux — partagée par Footer et MobileMenu. */
export function SocialLinks({ className, buttonClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex", className)}>
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn("flex items-center justify-center rounded-full", buttonClassName)}
        >
          <Icon className="size-6" aria-hidden />
        </a>
      ))}
    </div>
  )
}

import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import ArrowRightIcon from "./icons/ArrowRightIcon"

export interface ArrowLinkProps {
  /** Destination du lien. */
  href: string
  /** Libellé (« Explorer », « Découvrir », « Commencer », « En savoir plus »). */
  children: ReactNode
  className?: string
}

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 p-1 font-semibold text-foreground",
        className
      )}
    >
      {children}
      <ArrowRightIcon className="size-5 shrink-0" />
    </Link>
  )
}

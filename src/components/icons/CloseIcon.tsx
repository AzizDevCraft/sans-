import type { SVGProps } from "react"

/** X de fermeture. Source : src/components/icons/svg/close.svg (viewBox 44). */
export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16 16L28 28M16 28L28 16" />
    </svg>
  )
}

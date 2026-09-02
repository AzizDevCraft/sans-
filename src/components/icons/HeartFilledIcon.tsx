import type { SVGProps } from "react"

/**
 * Source : src/components/icons/svg/line-md-heart-filled.svg (viewBox 40x40, déjà carré).
 * Utilisé par la carte « Nos BestSellers » de la navigation sur tablet/desktop.
 * Fill + stroke passés en currentColor.
 */
export function HeartFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 13.3333C20 13.3333 20 13.3333 21.2667 11.6667C22.7333 9.73333 24.9 8.33333 27.5 8.33333C31.65 8.33333 35 11.6833 35 15.8333C35 17.3833 34.5333 18.8167 33.7333 20C32.3833 22.0167 20 35 20 35C20 35 7.61667 22.0167 6.26667 20C5.46667 18.8167 5 17.3833 5 15.8333C5 11.6833 8.35 8.33333 12.5 8.33333C15.1 8.33333 17.2833 9.73333 18.7333 11.6667C20 13.3333 20 13.3333 20 13.3333Z"
        fill="currentColor"
      />
      <path
        d="M20 13.3333C20 13.3333 20 13.3333 18.7333 11.6667C17.2667 9.73333 15.1 8.33333 12.5 8.33333C8.35 8.33333 5 11.6833 5 15.8333C5 17.3833 5.46667 18.8167 6.26667 20C7.61667 22.0167 20 35 20 35M20 13.3333C20 13.3333 20 13.3333 21.2667 11.6667C22.7333 9.73333 24.9 8.33333 27.5 8.33333C31.65 8.33333 35 11.6833 35 15.8333C35 17.3833 34.5333 18.8167 33.7333 20C32.3833 22.0167 20 35 20 35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

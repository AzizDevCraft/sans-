import type { SVGProps } from "react"

/**
 * Source : src/components/icons/svg/health-gym.svg (viewBox 40x40).
 * Le tracé déborde légèrement (~0.2px) hors du cadre 0-40 dans le SVG d'origine ;
 * conservé tel quel, viewBox carré 40x40.
 */
export function GymIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#gym-clip)">
        <path
          d="M33.4704 13.2707L33.4704 9.90016H30.0998V18.3147H9.90016L9.90016 9.90016L6.52962 9.90016L6.52962 13.2707L3.15907 13.2707L3.15907 18.3147L-0.211469 18.3147V21.6853L3.15907 21.6853L3.15907 26.7293L6.52962 26.7293L6.52962 30.0998L9.90016 30.0998L9.90016 21.6853H30.0998V30.0998H33.4704L33.4704 26.7293L36.8409 26.7293V21.6853L40.2115 21.6853V18.3147L36.8409 18.3147V13.2707L33.4704 13.2707Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="gym-clip">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

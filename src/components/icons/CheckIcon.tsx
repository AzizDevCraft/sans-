import type { SVGProps } from "react"

/**
 * Source : src/components/icons/svg/check.svg (glyphe « pastille cochée »).
 * `check-brown.svg` est LE MÊME glyphe, seule la couleur diffère — un seul wrapper
 * suffit, la couleur vient de `currentColor` (piloter via `text-*` chez le parent).
 * SVG d'origine : viewBox non carré (22.3629 x 20), preserveAspectRatio="none",
 * fill en dur. Normalisé ici : viewBox carré 22.3629 x 22.3629, tracé recentré
 * verticalement (+1.18145), fill passé en currentColor.
 */
export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22.3629 22.3629"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#check-clip)" transform="translate(0 1.18145)">
        <path
          d="M11.2399 0C5.06498 0 0.0584906 4.4775 0.0584906 10C0.0584906 15.5225 5.06498 20 11.2399 20C17.4149 20 22.4214 15.5225 22.4214 10C22.4214 4.4775 17.4149 0 11.2399 0ZM16.4197 7.23375L11.0638 14.555C11.0624 14.5563 11.0596 14.5575 11.0596 14.5588C11.0317 14.5963 11.0163 14.6388 10.9814 14.6738C10.9324 14.7213 10.8695 14.7463 10.8136 14.7825C10.7997 14.7913 10.7857 14.8012 10.7703 14.81C10.6836 14.8587 10.5942 14.8913 10.4964 14.9125C10.4642 14.92 10.4349 14.9275 10.4013 14.9325C10.3235 14.9421 10.2446 14.9429 10.1665 14.935C10.1114 14.9319 10.0566 14.9244 10.003 14.9125C9.94763 14.8976 9.89384 14.8783 9.84225 14.855C9.79752 14.8362 9.75 14.8312 9.70807 14.8075C9.67732 14.79 9.66055 14.7625 9.63399 14.7413C9.62281 14.7325 9.60883 14.73 9.59765 14.7213L6.47943 12.1425C6.2946 11.9838 6.18677 11.7665 6.17912 11.5375C6.17147 11.3084 6.26461 11.0858 6.43852 10.9175C6.61243 10.7492 6.85323 10.6486 7.10917 10.6374C7.3651 10.6262 7.61575 10.7052 7.80723 10.8575L10.0645 12.725L14.7816 6.27625C14.9236 6.08198 15.1461 5.9461 15.4001 5.89852C15.654 5.85093 15.9188 5.89553 16.136 6.0225C16.3532 6.14947 16.5051 6.34842 16.5584 6.57557C16.6116 6.80273 16.5617 7.03948 16.4197 7.23375Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="check-clip">
          <rect width="22.3629" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

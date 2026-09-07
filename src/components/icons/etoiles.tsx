import { IconProps } from "@/config/types";

export default function Etoiles (props: IconProps) {
    return (
        <svg viewBox="0 0 40 40" fill="currentColor" {...props}>
          <g transform="translate(2 2) scale(0.818)">
            <path d="M16 6L21 17L32 22L21 27L16 38L11 27L0 22L11 17L16 6ZM16 15.66L14 20L9.66 22L14 24L16 28.34L18 24L22.34 22L18 20L16 15.66ZM36 16L33.48 10.52L28 8L33.48 5.5L36 0L38.5 5.5L44 8L38.5 10.52L36 16ZM36 44L33.48 38.52L28 36L33.48 33.5L36 28L38.5 33.5L44 36L38.5 38.52L36 44Z" />
          </g>
        </svg>
    )
}
import { IconProps } from "@/config/types"

export default function HamburgerMenuIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H30M6 18H30M6 27H30" />
    </svg>
  )
}

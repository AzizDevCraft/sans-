import { IconProps } from "@/config/types";

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 16L28 28M16 28L28 16" />
    </svg>
  )
}
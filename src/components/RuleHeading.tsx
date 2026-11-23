import { cn } from "@/lib/utils"

type RuleHeadingProps = {
  title: string
  className?: string
}

export default function RuleHeading({ title, className }: RuleHeadingProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <h2 className="text-xl leading-[1.3] font-semibold whitespace-nowrap text-secondary-soft-foreground uppercase xl:text-2xl xl:font-medium">
        {title}
      </h2>
      <span aria-hidden="true" className="h-0.5 min-w-0 flex-1 bg-card-alt" />
    </div>
  )
}

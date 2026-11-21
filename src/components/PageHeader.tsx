import { useId } from "react"

export interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col items-center justify-center bg-linear-to-b from-background-gradient to-background px-5 py-10 text-center md:px-1 md:py-24"
    >
      <div className="flex flex-col items-center gap-4">
        <h1
          id={headingId}
          className="font-heading text-[40px] font-semibold leading-11.5 text-foreground md:text-5xl md:leading-13.5 xl:text-[60px] xl:leading-16.5"
        >
          {title}
        </h1>
        <p className="max-w-87.5 text-xl leading-7.5 text-muted-foreground md:max-w-132 md:text-2xl md:leading-8 xl:max-w-215">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

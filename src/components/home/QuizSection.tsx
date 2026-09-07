import QstMark from "@/components/icons/qstMark"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import { IconBadge } from "@/components/IconBadge"
import { SectionHeading } from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"

const CONTENT = {
  title: "Quel snack vous correspond ?",
  subtitle:
    "Répondez à quelques questions simples et découvrez les produits SANS+ adaptés à votre style de vie et vos objectifs.",
  ctaLabel: "Commencez le Quiz",
} as const

function QuizCTA() {
  return (
    <div className="flex w-full flex-col items-center gap-9 text-center px-2 md:px-4 md:gap-12 md:rounded-2xl md:bg-background md:py-16 md:shadow-base md:max-w-225 xl:max-w-282">
      <IconBadge
        tone="card"
        shape="full"
        size="sm"
        inset="md"
        elevated={false}
        className="[&>svg]:size-8 md:size-18 md:[&>svg]:size-10"
      >
        <QstMark />
      </IconBadge>

      <SectionHeading
        align="center"
        title={CONTENT.title}
        subtitle={CONTENT.subtitle}
        className="w-full gap-4 md:max-w-191 xl:max-w-200"
      />

      {/* TODO(logic-builder): navigation vers le quiz */}
      <Button
        variant="primary"
        size="brand"
        fullWidth
        trailingIcon={<ArrowRightIcon className="size-5" />}
        className="w-full md:w-auto"
      >
        {CONTENT.ctaLabel}
      </Button>
    </div>
  )
}

export function QuizSection() {
  return (
    <section className="flex flex-col bg-background px-5 pt-3 pb-10 md:min-h-133 md:justify-center md:items-center md:bg-background-alt md:px-8 md:py-10 xl:min-h-200">
      <QuizCTA />
    </section>
  )
}

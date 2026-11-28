import PencilIcon from "@/components/icons/pencil-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ReviewForm, { type ReviewFormProps } from "./ReviewForm"

const ITEM_VALUE = "review-form"

type ReviewFormAccordionProps = ReviewFormProps & {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ReviewFormAccordion({
  open,
  onOpenChange,
  ...formProps
}: ReviewFormAccordionProps) {
  return (
    <Accordion
      value={open ? [ITEM_VALUE] : []}
      onValueChange={(value) => onOpenChange(value.includes(ITEM_VALUE))}
    >
      <AccordionItem
        value={ITEM_VALUE}
        className="rounded-md border border-dashed border-card-alt-foreground bg-card-alt px-4 py-5 md:px-6"
      >
        <AccordionTrigger className="items-center gap-3 rounded-md border-0 p-0 text-base text-muted-foreground hover:no-underline md:gap-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-background text-card-alt-foreground shadow-base">
            <PencilIcon aria-hidden="true" className="size-7" />
          </span>
          <span className="flex flex-col gap-2 pl-2">
            <span className="text-xl leading-[1.3] font-semibold text-foreground">
              Laisser un avis
            </span>
            <span className="text-base font-normal text-muted-foreground">
              Déjà essayer ? Partagez votre expérience.
            </span>
          </span>
        </AccordionTrigger>
        {/* Panneau élargi de 4px (compensé par le padding) : l'overflow ne coupe plus les anneaux de focus */}
        <AccordionContent
          panelClassName="-mx-1 -mb-1"
          className="px-1 pt-9 pb-1 [&_p:not(:last-child)]:mb-0"
        >
          <ReviewForm {...formProps} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

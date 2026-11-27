import ErrorOutlineIcon from "@/components/icons/error-outline-icon"

type FieldErrorProps = {
  message: string
  id?: string
}

export default function FieldError({ message, id }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-0.5 text-xs font-light text-destructive capitalize"
    >
      <ErrorOutlineIcon aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  )
}

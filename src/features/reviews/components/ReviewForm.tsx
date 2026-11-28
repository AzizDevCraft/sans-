import type { BaseSyntheticEvent, RefObject } from "react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { PROFILE_LABELS, REVIEWER_PROFILES } from "../lib/profile-labels"
import type { ReviewFormValues } from "../schemas/review"
import FieldError from "./FieldError"
import StarRatingInput from "./StarRatingInput"
import StatusChip from "./StatusChip"

export type ReviewFormProps = {
  form: UseFormReturn<ReviewFormValues>
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
  /** Erreur non rattachée à un champ (produit introuvable, erreur serveur). */
  globalError?: string | null
  /** Champ piège anti-spam, non contrôlé : lu à l'envoi par le parent. */
  honeypotRef: RefObject<HTMLInputElement | null>
}

const LABEL = "text-base leading-[1.3] font-semibold text-foreground capitalize"
// Le design garde la bordure inchangée en erreur : on neutralise le rouge shadcn.
const FIELD = "h-auto rounded-md border-border px-4 py-3 text-base md:text-base aria-invalid:border-border aria-invalid:ring-0 aria-invalid:focus-visible:border-ring aria-invalid:focus-visible:ring-3 aria-invalid:focus-visible:ring-ring/50 dark:aria-invalid:border-border dark:aria-invalid:ring-0 dark:aria-invalid:focus-visible:border-ring dark:aria-invalid:focus-visible:ring-3 dark:aria-invalid:focus-visible:ring-ring/50"
const ROW = "flex flex-col gap-3 md:flex-row md:items-center md:gap-5 xl:flex-col xl:items-stretch xl:gap-3"

export default function ReviewForm({ form, onSubmit, globalError, honeypotRef }: ReviewFormProps) {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="review-website">Site web</label>
        <input
          ref={honeypotRef}
          id="review-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
        <div className="flex min-w-0 flex-col gap-4 xl:max-w-109.5 xl:flex-1 xl:gap-6">
          <div className="flex flex-col gap-2">
            <div className={ROW}>
              <p id="review-rating-label" className={LABEL}>
                Notez votre expérience :
              </p>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                  <StarRatingInput
                    value={field.value}
                    starClassName="size-6"
                    onChange={field.onChange}
                    firstItemRef={field.ref}
                    aria-labelledby="review-rating-label"
                    aria-invalid={Boolean(errors.rating)}
                    aria-describedby={errors.rating ? "review-rating-error" : undefined}
                  />
                )}
              />
            </div>
            {errors.rating?.message ? (
              <FieldError id="review-rating-error" message={errors.rating.message} />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className={ROW}>
              <p id="review-profile-label" className={LABEL}>
                Vous êtes :
              </p>
              <Controller
                control={control}
                name="profile"
                render={({ field }) => (
                  <div
                    role="radiogroup"
                    aria-labelledby="review-profile-label"
                    aria-invalid={Boolean(errors.profile)}
                    aria-describedby={errors.profile ? "review-profile-error" : undefined}
                    className="flex flex-wrap gap-x-2 gap-y-3 md:flex-1 xl:gap-x-3"
                  >
                    {REVIEWER_PROFILES.map((item, index) => (
                      <StatusChip
                        key={item}
                        ref={index === 0 ? field.ref : undefined}
                        label={PROFILE_LABELS[item]}
                        selected={item === field.value}
                        tabbable={field.value ? item === field.value : index === 0}
                        onSelect={() => field.onChange(item)}
                      />
                    ))}
                  </div>
                )}
              />
            </div>
            {errors.profile?.message ? (
              <FieldError id="review-profile-error" message={errors.profile.message} />
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 xl:max-w-138.25 xl:flex-1">
          <div className="flex flex-col gap-3">
            <label htmlFor="review-first-name" className={LABEL}>
              Prénom <span className="text-card-alt-foreground">(Optionnel)</span>
            </label>
            <Input
              id="review-first-name"
              placeholder="Foulen Ben Foulen"
              className={FIELD}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "review-first-name-error" : undefined}
              {...register("firstName")}
            />
            {errors.firstName?.message ? (
              <FieldError id="review-first-name-error" message={errors.firstName.message} />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <label htmlFor="review-message" className={LABEL}>
                Partagez votre expérience
              </label>
              <Textarea
                id="review-message"
                placeholder={"Qu’avez-vous pensé de\nnos produits ?"}
                className={`${FIELD} h-30 min-h-30 field-sizing-fixed resize-none`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "review-message-error" : undefined}
                {...register("message")}
              />
            </div>
            {errors.message?.message ? (
              <FieldError id="review-message-error" message={errors.message.message} />
            ) : null}
          </div>
        </div>
      </div>

      {globalError ? <FieldError message={globalError} /> : null}

      <Button
        type="submit"
        variant="secondary"
        size="brand"
        disabled={isSubmitting}
        focusableWhenDisabled
        className="w-full data-disabled:pointer-events-none data-disabled:opacity-50 md:w-auto md:self-end"
      >
        Partager mon avis
      </Button>
    </form>
  )
}

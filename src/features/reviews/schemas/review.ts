import { z } from "zod"

import type { ReviewerProfile } from "@/generated/prisma/client"

export const RATING_MIN = 1
export const RATING_MAX = 5
export const FIRST_NAME_MAX = 50
export const MESSAGE_MIN = 6
export const MESSAGE_MAX = 1000
/** Délai minimal (ms) entre l'ouverture du formulaire et son envoi ; au delà, l'envoi est ignoré. */
export const MIN_FILL_DURATION_MS = 3000

// Caractères invisibles (zero-width, BOM) et de contrôle C0/C1, hors \n.
const INVISIBLE_CHARS = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200B-\u200D\u2060\uFEFF]/g

function sanitizeText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(INVISIBLE_CHARS, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

const REVIEWER_PROFILE_VALUES = [
  "STUDENT",
  "ATHLETE",
  "ACTIVE_MOM",
  "COACH",
  "ENTREPRENEUR",
  "OTHER",
] as const

// Échoue à la compilation si l'enum Prisma et cette liste divergent (dans un sens ou l'autre).
type ProfileValue = (typeof REVIEWER_PROFILE_VALUES)[number]
const PROFILES_IN_SYNC: [ProfileValue] extends [ReviewerProfile]
  ? [ReviewerProfile] extends [ProfileValue]
    ? true
    : never
  : never = true
void PROFILES_IN_SYNC

/** Champs saisis dans le formulaire d'avis — partagé client (zodResolver) et serveur (Server Action). */
export const reviewFormSchema = z.object({
  rating: z
    .number({ error: "Veuillez sélectionner une note" })
    .int({ error: "Veuillez sélectionner une note" })
    .min(RATING_MIN, { error: "Veuillez sélectionner une note" })
    .max(RATING_MAX, { error: "Veuillez sélectionner une note" }),
  profile: z.enum(REVIEWER_PROFILE_VALUES, { error: "Veuillez choisir un statut" }),
  firstName: z
    .string({ error: "Prénom invalide" })
    .overwrite(sanitizeText)
    .max(FIRST_NAME_MAX, { error: `${FIRST_NAME_MAX} caractères maximum` })
    .optional(),
  message: z
    .string({ error: "il faut minimum 6 caractères" })
    .overwrite(sanitizeText)
    .min(MESSAGE_MIN, { error: "il faut minimum 6 caractères" })
    .max(MESSAGE_MAX, { error: `${MESSAGE_MAX} caractères maximum` }),
})

/** Entrée de la Server Action : le formulaire + le produit ciblé. */
export const submitReviewSchema = reviewFormSchema.extend({
  productSlug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  /** Honeypot : champ caché qui doit rester vide. */
  website: z.string().max(200).optional(),
  /** Durée de remplissage mesurée côté client (ms) : indépendante des horloges client/serveur. */
  fillDurationMs: z.number().int().nonnegative(),
})

export type ReviewFormValues = z.infer<typeof reviewFormSchema>
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>

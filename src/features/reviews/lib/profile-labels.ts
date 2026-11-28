import type { ReviewerProfile } from "@/data/reviews/reviews"

export const PROFILE_LABELS: Record<ReviewerProfile, string> = {
  STUDENT: "Étudiant",
  ATHLETE: "Sportif",
  ACTIVE_MOM: "Maman active",
  COACH: "Coach",
  ENTREPRENEUR: "Entrepreneur",
  OTHER: "Autre",
}

/** Ordre d'affichage des chips du formulaire. */
export const REVIEWER_PROFILES: ReviewerProfile[] = [
  "STUDENT",
  "ATHLETE",
  "ACTIVE_MOM",
  "COACH",
  "ENTREPRENEUR",
  "OTHER",
]

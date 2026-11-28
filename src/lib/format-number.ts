const LOCALE = "fr-FR"

/** Nombre au format français : 12 → "12", 12.5 → "12,5", (4, 1) → "4,0". */
export function formatDecimal(value: number, fractionDigits = 0): string {
  return value.toLocaleString(LOCALE, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: Math.max(fractionDigits, 1),
  })
}

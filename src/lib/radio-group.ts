import type { KeyboardEvent } from "react"

const NEXT_KEYS = ["ArrowRight", "ArrowDown"]
const PREVIOUS_KEYS = ["ArrowLeft", "ArrowUp"]

/**
 * Navigation clavier d'un `role="radiogroup"` (roving tabindex) : flèches = option
 * suivante/précédente avec bouclage, Début/Fin = extrémités. Le focus suit la sélection
 * (le clic de l'option cible déclenche son `onClick`).
 */
export function handleRadioKeyDown(event: KeyboardEvent<HTMLElement>): void {
  const group = event.currentTarget.closest<HTMLElement>('[role="radiogroup"]')
  if (!group) return

  const radios = Array.from(
    group.querySelectorAll<HTMLElement>('[role="radio"]:not(:disabled)'),
  )
  if (event.altKey || event.ctrlKey || event.metaKey) return
  const current = radios.indexOf(event.currentTarget)
  if (current === -1) return

  let target: number
  if (NEXT_KEYS.includes(event.key)) target = (current + 1) % radios.length
  else if (PREVIOUS_KEYS.includes(event.key)) target = (current - 1 + radios.length) % radios.length
  else if (event.key === "Home") target = 0
  else if (event.key === "End") target = radios.length - 1
  else return

  event.preventDefault()
  radios[target].focus()
  radios[target].click()
}

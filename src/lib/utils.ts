import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function capitalize (words: string) {
  if (typeof words === "string") {
    return words.split(" ").map (word => word.at(0)?.toUpperCase() + word.slice(1)).join (" ")
  }
  throw new Error ("type not confom !")
}
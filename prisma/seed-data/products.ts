import { createId } from "@paralleldrive/cuid2"

import { benefits } from "./benef"
import { ingredients } from "./ingredient"

export const categories = [
  {
    id: createId(),
    name: "snacks",
    slug: "snacks",
  },
  {
    id: createId(),
    name: "repas",
    slug: "repas",
  },
  {
    id: createId(),
    name: "shots",
    slug: "shots",
  },
]

type ProductSeed = {
  id: string
  name: string
  title: string
  categorieID: string
  calories: number | null
  proteins: number
  priceInCount: number
  /** Prix au kilo — `null` quand non commercialisé au poids. */
  secondPriceInKg: number | null
  unitCount: number
  slug: string
}

export const products: ProductSeed[] = [
  {
    id: createId(),
    name: "power pops",
    title: "Power pops - Brownies Balls Protéinées",
    categorieID: categories.find((cat) => cat.name === "snacks")!.id,
    calories: 40,
    proteins: 4,
    priceInCount: 6,
    secondPriceInKg: 95,
    unitCount: 3,
    slug: "power-pops",
  },
  {
    id: createId(),
    name: "doughies",
    title: "Doughies - Cookie Dough Balls",
    categorieID: categories.find((cat) => cat.name === "snacks")!.id,
    calories: 40,
    proteins: 3,
    priceInCount: 6,
    secondPriceInKg: 95,
    unitCount: 3,
    slug: "doughies",
  },
  {
    id: createId(),
    name: "good mouse",
    title: "Good Mouse - mousse au chocholat protéiné",
    categorieID: categories.find((cat) => cat.name === "snacks")!.id,
    calories: 150,
    proteins: 12,
    priceInCount: 11,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "good-mousse",
  },
  {
    id: createId(),
    name: "crunchies",
    title: "Crunchies - Protéine Bar",
    categorieID: categories.find((cat) => cat.name === "snacks")!.id,
    calories: 50,
    proteins: 3,
    priceInCount: 15,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "crunchies",
  },
  {
    id: createId(),
    name: "fudgy",
    title: "Fudgy - Brownies Protéiné",
    categorieID: categories.find((cat) => cat.name === "snacks")!.id,
    calories: 160,
    proteins: 7,
    priceInCount: 6,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "fudgy",
  },
  {
    id: createId(),
    name: "chickly",
    title: "Chickly - Bowl Poulet & Boulgour",
    categorieID: categories.find((cat) => cat.name === "repas")!.id,
    calories: 560,
    proteins: 50,
    priceInCount: 20,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "chickly",
  },
  {
    id: createId(),
    name: "shrimpy",
    title: "Shrimpy - Bowl Crevette & Quinoa",
    categorieID: categories.find((cat) => cat.name === "repas")!.id,
    calories: 400,
    proteins: 30,
    priceInCount: 28,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "shrimpy",
  },
  {
    id: createId(),
    name: "tunny",
    title: "Tunny - Sandwich au thon",
    categorieID: categories.find((cat) => cat.name === "repas")!.id,
    calories: 540,
    proteins: 40,
    priceInCount: 10,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "tunny",
  },
  {
    id: createId(),
    name: "gingy shot carotte",
    title: "Gingy Shot - Sunny carotte orange twist",
    categorieID: categories.find((cat) => cat.name === "shots")!.id,
    calories: null,
    proteins: 0,
    priceInCount: 5,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "gingy-shot-carotte",
  },
  {
    id: createId(),
    name: "gingy shot lemon",
    title: "Gingy Shot - apple lemon & ginger",
    categorieID: categories.find((cat) => cat.name === "shots")!.id,
    calories: null,
    proteins: 0,
    priceInCount: 5,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "gingy-shot-lemon",
  },
]

/**
 * Paires produit ↔ bénéfice (jointure `ProductBenefits`).
 * Dérivé de `benef.ts` : chaque bénéfice liste les noms des produits qui le portent.
 * Les `id` sont ceux générés à l'import (mémoire du process). Le seed les
 * retraduit vers les vrais ids DB via des maps fileId → id.
 */
export const ProductBenefits = products.flatMap((prod) =>
  benefits
    .filter((benef) => benef.product.includes(prod.name))
    .map((b) => ({ idProd: prod.id, idBenef: b.id })),
)

/**
 * Paires produit ↔ ingrédient (jointure `ProductIngredients`).
 * Même principe que `ProductBenefits`, dérivé de `ingredient.ts`.
 */
export const ProductIngredients = products.flatMap((prod) =>
  ingredients
    .filter((ing) => ing.product.includes(prod.name))
    .map((ing) => ({ idProd: prod.id, idIngredient: ing.id })),
)

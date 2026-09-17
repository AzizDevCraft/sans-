type CategorySeed = {
  name: "snacks" | "meals" | "shots"
  tagline: string 
  order: number 
  imageName: string 
  slug: "snacks" | "meals" | "shots"
}

type ProductSeed = {
  name: string
  title: string
  categorie: string
  calories: number | null
  proteins: number
  priceInCount: number
  /** Prix au kilo — `null` quand non commercialisé au poids. */
  secondPriceInKg: number | null
  unitCount: number
  slug: string
}

export const category: CategorySeed[] = [
  {
    name: "snacks",
    tagline: "Energy balls, barres, cookies équilibrés",
    order: 1,
    imageName: "echequier-v2.jpg",
    slug: "snacks",
  },
  {
    name: "meals",
    tagline: "Repas complets pour le déjeuner",
    order: 2,
    imageName: "bowls-2.jpg",
    slug: "meals",
  },
  {
    name: "shots",
    tagline: "L'énergie naturelle qui vous réveille",
    order: 3,
    imageName: "healthyShot.jpg",
    slug: "shots",
  },
]

export const products: ProductSeed[] = [
  {
    name: "power pops",
    title: "Power pops - Brownies Balls Protéinées",
    categorie: "snacks",
    calories: 40,
    proteins: 4,
    priceInCount: 6,
    secondPriceInKg: 95,
    unitCount: 3,
    slug: "power-pops",
  },
  {
    name: "doughies",
    title: "Doughies - Cookie Dough Balls",
    categorie: "snacks",
    calories: 40,
    proteins: 3,
    priceInCount: 6,
    secondPriceInKg: 95,
    unitCount: 3,
    slug: "doughies",
  },
  {
    name: "good mouse",
    title: "Good Mouse - mousse au chocholat protéiné",
    categorie: "snacks",
    calories: 150,
    proteins: 12,
    priceInCount: 11,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "good-mousse",
  },
  {
    name: "crunchies",
    title: "Crunchies - Protéine Bar",
    categorie: "snacks",
    calories: 50,
    proteins: 3,
    priceInCount: 15,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "crunchies",
  },
  {
    name: "fudgy",
    title: "Fudgy - Brownies Protéiné",
    categorie: "snacks",
    calories: 160,
    proteins: 7,
    priceInCount: 6,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "fudgy",
  },
  {
    name: "chickly",
    title: "Chickly - Bowl Poulet & Boulgour",
    categorie: "meals",
    calories: 560,
    proteins: 50,
    priceInCount: 20,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "chickly",
  },
  {
    name: "shrimpy",
    title: "Shrimpy - Bowl Crevette & Quinoa",
    categorie: "meals",
    calories: 400,
    proteins: 30,
    priceInCount: 28,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "shrimpy",
  },
  {
    name: "tunny",
    title: "Tunny - Sandwich au thon",
    categorie: "meals",
    calories: 540,
    proteins: 40,
    priceInCount: 10,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "tunny",
  },
  {
    name: "gingy shot carotte",
    title: "Gingy Shot - Sunny carotte orange twist",
    categorie: "shots",
    calories: null,
    proteins: 0,
    priceInCount: 5,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "gingy-shot-carotte",
  },
  {
    name: "gingy shot lemon",
    title: "Gingy Shot - apple lemon & ginger",
    categorie: "shots",
    calories: null,
    proteins: 0,
    priceInCount: 5,
    secondPriceInKg: null,
    unitCount: 1,
    slug: "gingy-shot-lemon",
  },
]
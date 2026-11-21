export type MediaSeed = {
  url: string
  name: string
  alt: string
  productSlug: string | null
  /** Ordre parmi les images du produit (0 = couverture). Omis pour les images sans produit. */
  position?: number
}

export const media: MediaSeed[] = [
  // ── Produits — mapping sûr ────────────────────────────────────────────────
  { url: "/brown.jpg", name: "brown.jpg", alt: "Fudgy - Brownies Protéiné", productSlug: "fudgy", position: 0 },
  { url: "/crunchies.jpg", name: "crunchies.jpg", alt: "Crunchies - Protéine Bar", productSlug: "crunchies", position: 0 },
  { url: "/doughies.jpg", name: "doughies.jpg", alt: "Doughies - Cookie Dough Balls", productSlug: "doughies", position: 0 },
  { url: "/Bowls-Poulet.jpg", name: "Bowls-Poulet.jpg", alt: "Chickly - Bowl Poulet & Boulgour", productSlug: "chickly", position: 0 },
  { url: "/Bowls-Poulet1.jpg", name: "Bowls-Poulet1.jpg", alt: "Chickly - Bowl Poulet & Boulgour", productSlug: "chickly", position: 1 },
  { url: "/bowls-3.jpg", name: "bowls-3.jpg", alt: "Shrimpy - Bowl Crevette & Quinoa", productSlug: "shrimpy", position: 0 },
  { url: "/bowls-4.jpg", name: "bowls-4.jpg", alt: "Shrimpy - Bowl Crevette & Quinoa", productSlug: "shrimpy", position: 1 },
  { url: "/mousseAuChocolat-1.jpg", name: "mousseAuChocolat-1.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productSlug: "good-mousse", position: 0 },
  { url: "/mousseAuChocolat-2.jpg", name: "mousseAuChocolat-2.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productSlug: "good-mousse", position: 1 },
  { url: "/mousseAuChocolat-3.jpg", name: "mousseAuChocolat-3.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productSlug: "good-mousse", position: 2 },
  { url: "/power-Pops-2.jpg", name: "power-Pops-2.jpg", alt: "Power pops - Brownies Balls Protéinées", productSlug: "power-pops", position: 0 },
  { url: "/thuna-1.jpg", name: "thuna-1.jpg", alt: "Tunny - Sandwich au thon", productSlug: "tunny", position: 0 },
  { url: "/thuna-2.jpg", name: "thuna-2.jpg", alt: "Tunny - Sandwich au thon", productSlug: "tunny", position: 1 },

  { url: "/gingershot-1.jpg", name: "gingershot-1.jpg", alt: "Gingy Shot - apple lemon & ginger", productSlug: "gingy-shot-lemon", position: 0 },
  { url: "/gingershot-2.jpg", name: "gingershot-2.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productSlug: "gingy-shot-carotte", position: 0 },
  { url: "/gingershot-3.jpg", name: "gingershot-3.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productSlug: "gingy-shot-carotte", position: 1 },
  { url: "/gingershot-4.jpg", name: "gingershot-4.jpg", alt: "Gingy Shot - apple lemon & ginger", productSlug: "gingy-shot-lemon", position: 1 },
  { url: "/gingershot-5.jpg", name: "gingershot-5.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productSlug: "gingy-shot-carotte", position: 2 },

  // ── Non rattachées à un produit ─────────────────────────────────────────
  { url: "/healthyShot.jpg", name: "healthyShot.jpg", alt: "ginger shots", productSlug: null },
  { url: "/bowls-1.jpg", name: "bowls-1.jpg", alt: "repas complet et équilibré", productSlug: null },
  { url: "/bowls-2.jpg", name: "bowls-2.jpg", alt: "repas complet et équilibré", productSlug: null },
  { url: "/echequier.jpg", name: "echequier.jpg", alt: "snacks protéinés", productSlug: null },
  { url: "/echequier-v2.jpg", name: "echequier-v2.jpg", alt: "snacks protéinés", productSlug: null },
  { url: "/HBA-maps.JPG", name: "HBA-maps.JPG", alt: "localisation HBA", productSlug: null },
  { url: "/logo-HBA.jpg", name: "logo-HBA.jpg", alt: "logo HBA", productSlug: null },
  { url: "/Logo-patisserie-ines.JPG", name: "Logo-patisserie-ines.JPG", alt: "logo patisserie ines", productSlug: null },
  { url: "/Logo-bolo-healthy-restaurant.JPG", name: "Logo-bolo-healthy-restaurant.JPG", alt: "logo bolo healthy restaurant", productSlug: null },
  { url: "/Logo-mon-coin-nature.JPG", name: "Logo-mon-coin-nature.JPG", alt: "logo mon coin nature", productSlug: null },
  { url: "/Logo-Triangle-fitness.JPG", name: "Logo-Triangle-fitness.JPG", alt: "logo Triangle fitness", productSlug: null },
]

import { createId } from "@paralleldrive/cuid2"

/**
 * Mock de toutes les images présentes dans `public/` (27 fichiers au 2026-09-08).
 *
 * Champs :
 *  - `id`        : cuid (comme les autres fichiers input).
 *  - `url`       : chemin public servi par Next (`public/<fichier>` → `/<fichier>`).
 *                  PROVISOIRE — à remplacer par une URL de CDN plus tard.
 *  - `name`      : nom du fichier tel quel.
 *  - `alt`       : VIDE — à renseigner manuellement (accessibilité / SEO).
 *  - `productId` : **slug** du produit rattaché (le seed le retraduit en id réel
 *                  via une map slug → id), ou `null` si l'image n'est liée à
 *                  aucun produit (logo / carte distributeur / visuel décoratif).
 *
 * ⚠️ À arbitrer (laissés en `null` + commentaire `TODO`) :
 *  - `bowls_1..4.jpg`      : visuels « bowls » génériques — shrimpy ? gamme repas ? homepage ?
 *  - `gingershot_1..5.jpg` : gingy shot — carotte (`gingy-shot-carotte`) ou lemon (`gingy-shot-lemon`) ?
 *  - `healthyShot.jpg`     : shot générique ?
 *  - `powerPops&Doughies.jpg` : visuel commun power pops + doughies — rattaché à `power-pops` par défaut.
 *  - `power Pops-2.jpg` / `powerPops&Doughies.jpg` : noms de fichiers avec espace / `&`
 *    (url encodée ici) — envisager un renommage.
 *  - `échéquier*.jpg`      : visuels décoratifs (motif échiquier) — aucun produit.
 */
export type MediaSeed = {
  id: string
  url: string
  name: string
  alt: string
  productId: string | null
}

export const media: MediaSeed[] = [
  // ── Produits — mapping sûr ────────────────────────────────────────────────
  { id: createId(), url: "/brown.jpg", name: "brown.jpg", alt: "Fudgy - Brownies Protéiné", productId: "fudgy" },
  { id: createId(), url: "/crunchies.jpg", name: "crunchies.jpg", alt: "Crunchies - Protéine Bar", productId: "crunchies" },
  { id: createId(), url: "/doughies.jpg", name: "doughies.jpg", alt: "Doughies - Cookie Dough Balls", productId: "doughies" },
  { id: createId(), url: "/Bowls_Poulet.jpg", name: "Bowls_Poulet.jpg", alt: "Chickly - Bowl Poulet & Boulgour", productId: "chickly" },
  { id: createId(), url: "/Bowls_Poulet1.jpg", name: "Bowls_Poulet1.jpg", alt: "Chickly - Bowl Poulet & Boulgour", productId: "chickly" },
  { id: createId(), url: "/mousseAuChocolat_1.jpg", name: "mousseAuChocolat_1.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productId: "good-mousse" },
  { id: createId(), url: "/mousseAuChocolat_2.jpg", name: "mousseAuChocolat_2.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productId: "good-mousse" },
  { id: createId(), url: "/mousseAuChocolat_3.jpg", name: "mousseAuChocolat_3.jpg", alt: "Good Mouse - mousse au chocholat protéiné", productId: "good-mousse" },
  { id: createId(), url: "/power%20Pops-2.jpg", name: "power Pops-2.jpg", alt: "Power pops - Brownies Balls Protéinées", productId: "power-pops" },
  { id: createId(), url: "/thuna_1.jpg", name: "thuna_1.jpg", alt: "Tunny - Sandwich au thon", productId: "tunny" },
  { id: createId(), url: "/thuna_2.jpg", name: "thuna_2.jpg", alt: "Tunny - Sandwich au thon", productId: "tunny" },

  // ── Produits — mapping à confirmer ───────────────────────────────────────
  // TODO(mapping) : power pops + doughies sur le même visuel — rattaché à power-pops par défaut
  { id: createId(), url: "/powerPops%26Doughies.jpg", name: "powerPops&Doughies.jpg", alt: "", productId: null },
  // TODO(mapping) : gingy shot — carotte ou lemon ?
  { id: createId(), url: "/gingershot_1.jpg", name: "gingershot_1.jpg", alt: "Gingy Shot - apple lemon & ginger", productId: "gingy-shot-lemon" },
  { id: createId(), url: "/gingershot_2.jpg", name: "gingershot_2.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productId: "gingy-shot-carotte" },
  { id: createId(), url: "/gingershot_3.jpg", name: "gingershot_3.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productId: "gingy-shot-carotte" },
  { id: createId(), url: "/gingershot_4.jpg", name: "gingershot_4.jpg", alt: "Gingy Shot - apple lemon & ginger", productId: "gingy-shot-lemon" },
  { id: createId(), url: "/gingershot_5.jpg", name: "gingershot_5.jpg", alt: "Gingy Shot - Sunny carotte orange twist", productId: "gingy-shot-carotte" },
  // TODO(mapping) : « bowls » génériques — shrimpy ? gamme repas ? homepage ?
  { id: createId(), url: "/bowls_1.jpg", name: "bowls_1.jpg", alt: "repas complet et équilibré", productId: null },
  { id: createId(), url: "/bowls_2.jpg", name: "bowls_2.jpg", alt: "repas complet et équilibré", productId: null },
  { id: createId(), url: "/bowls_3.jpg", name: "bowls_3.jpg", alt: "Shrimpy - Bowl Crevette & Quinoa", productId: "shrimpy" },
  { id: createId(), url: "/bowls_4.jpg", name: "bowls_4.jpg", alt: "Shrimpy - Bowl Crevette & Quinoa", productId: "shrimpy" },
  // TODO(mapping) : shot générique ?
  { id: createId(), url: "/healthyShot.jpg", name: "healthyShot.jpg", alt: "ginger shots", productId: null },

  // ── Non rattachées à un produit ─────────────────────────────────────────
  { id: createId(), url: "/échéquier.jpg", name: "échéquier.jpg", alt: "snacks protéinés", productId: null },
  { id: createId(), url: "/échéquier-v2.jpg", name: "échéquier-v2.jpg", alt: "snacks protéinés", productId: null },
  { id: createId(), url: "/HBA-maps.JPG", name: "HBA-maps.JPG", alt: "localisation HBA", productId: null },
  { id: createId(), url: "/logo-HBA.jpg", name: "logo-HBA.jpg", alt: "logo HBA", productId: null },
  { id: createId(), url: "/Logo-patisserie-ines.JPG", name: "Logo-patisserie-ines.JPG", alt: "logo patisserie ines", productId: null },
]

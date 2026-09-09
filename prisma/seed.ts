/**
 * Seed — SANS+
 * ────────────────────────────────────────────────────────────────────────────
 * Données transcrites depuis `input/` :
 *   - input/products.ts   → Categorie, Product (+ jointures dérivées)
 *   - input/ingredient.ts → Ingredient
 *   - input/benef.ts      → Benefit
 *   - input/media.ts      → Media (mock de public/)
 *
 * Exécution ordonnée, phase par phase : chaque phase renseigne des maps
 * `fileId → idDB` que la phase suivante utilise pour créer les liens.
 *
 * Idempotent :
 *   - Categorie / Product / Ingredient / Benefit → `upsert` sur clé unique
 *     (slug, slug, name, benef). Relancer met à jour, ne duplique pas.
 *   - ProductIngredients / ProductBenefits / Media → données 100 % dérivées :
 *     `deleteMany` puis recréation à chaque run.
 *
 * Lancer :  pnpm exec tsx prisma/seed.ts   (ou `prisma db seed`)
 * Prérequis : `DATABASE_URL` défini + schéma poussé (`prisma db push`).
 */
import "dotenv/config"

import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient } from "../src/generated/prisma/client"
import { benefits } from "../input/benef"
import { ingredients } from "../input/ingredient"
import { media } from "../input/media"
import {
  categories,
  products,
  ProductBenefits,
  ProductIngredients,
} from "../input/products"

const connectionString =
  process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL (ou DIRECT_DATABASE_URL) n'est pas défini")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

async function main() {
  // ─── 1. Catégories ───────────────────────────────────────────────────────
  const categorieIdByFileId = new Map<string, string>()
  for (const c of categories) {
    const row = await prisma.categorie.upsert({
      where: { slug: c.slug },
      create: { id: c.id, name: c.name, slug: c.slug },
      update: { name: c.name },
      select: { id: true },
    })
    categorieIdByFileId.set(c.id, row.id)
  }
  console.info(`✓ catégories : ${categories.length}`)

  // ─── 2. Produits ─────────────────────────────────────────────────────────
  const productIdByFileId = new Map<string, string>()
  const productIdBySlug = new Map<string, string>()
  const productIdByName = new Map<string, string>()
  for (const p of products) {
    const categorieId = categorieIdByFileId.get(p.categorieID)
    if (!categorieId) {
      throw new Error(`Produit "${p.name}" : catégorie (fileId ${p.categorieID}) introuvable`)
    }

    const data = {
      name: p.name,
      title: p.title,
      calories: p.calories,
      proteins: p.proteins,
      priceInCount: p.priceInCount,
      secondPriceInKg: p.secondPriceInKg,
      unitCount: p.unitCount,
      categorie: { connect: { id: categorieId } },
    }

    const row = await prisma.product.upsert({
      where: { slug: p.slug },
      create: { id: p.id, slug: p.slug, ...data },
      update: data,
      select: { id: true, slug: true, name: true },
    })
    productIdByFileId.set(p.id, row.id)
    productIdBySlug.set(row.slug, row.id)
    productIdByName.set(row.name, row.id)
  }
  if (productIdByName.size !== products.length) {
    throw new Error(
      "Noms de produits non uniques — la résolution des jointures serait ambiguë",
    )
  }
  console.info(`✓ produits : ${products.length}`)

  // ─── 3. Ingrédients ──────────────────────────────────────────────────────
  const ingredientIdByFileId = new Map<string, string>()
  for (const ing of ingredients) {
    const row = await prisma.ingredient.upsert({
      where: { name: ing.name },
      create: { id: ing.id, name: ing.name },
      update: {},
      select: { id: true },
    })
    ingredientIdByFileId.set(ing.id, row.id)
  }
  console.info(`✓ ingrédients : ${ingredients.length}`)

  // ─── 4. Bénéfices ────────────────────────────────────────────────────────
  const benefitIdByFileId = new Map<string, string>()
  for (const b of benefits) {
    const row = await prisma.benefit.upsert({
      where: { benef: b.benef },
      create: { id: b.id, benef: b.benef },
      update: {},
      select: { id: true },
    })
    benefitIdByFileId.set(b.id, row.id)
  }
  console.info(`✓ bénéfices : ${benefits.length}`)

  // ─── 5. Jointure Produit ↔ Ingrédient ────────────────────────────────────
  await prisma.productIngredients.deleteMany()
  const productIngredientRows = ProductIngredients.map((pair) => ({
    idProd: productIdByFileId.get(pair.idProd),
    idIngredient: ingredientIdByFileId.get(pair.idIngredient),
  })).filter(
    (r): r is { idProd: string; idIngredient: string } =>
      Boolean(r.idProd) && Boolean(r.idIngredient),
  )
  await prisma.productIngredients.createMany({
    data: productIngredientRows,
    skipDuplicates: true,
  })
  console.info(`✓ produit ↔ ingrédient : ${productIngredientRows.length}`)

  // ─── 6. Jointure Produit ↔ Bénéfice ──────────────────────────────────────
  await prisma.productBenefits.deleteMany()
  const productBenefitRows = ProductBenefits.map((pair) => ({
    idProd: productIdByFileId.get(pair.idProd),
    idBenef: benefitIdByFileId.get(pair.idBenef),
  })).filter(
    (r): r is { idProd: string; idBenef: string } =>
      Boolean(r.idProd) && Boolean(r.idBenef),
  )
  await prisma.productBenefits.createMany({
    data: productBenefitRows,
    skipDuplicates: true,
  })
  console.info(`✓ produit ↔ bénéfice : ${productBenefitRows.length}`)

  // ─── 7. Media (mock de public/) ──────────────────────────────────────────
  // `Media` n'a pas de clé naturelle unique → on repart de zéro.
  // `productId` porte un SLUG dans input/media.ts : on le retraduit en id réel.
  await prisma.media.deleteMany()
  const mediaRows = media.map((m) => {
    let productId: string | null = null
    if (m.productId) {
      productId = productIdBySlug.get(m.productId) ?? null
      if (!productId) {
        console.warn(
          `  ⚠ media "${m.name}" : slug produit "${m.productId}" introuvable → productId = null`,
        )
      }
    }
    return {
      id: m.id,
      url: m.url,
      name: m.name,
      alt: m.alt,
      size: null,
      productId,
    }
  })
  await prisma.media.createMany({ data: mediaRows })
  const mediaLinked = mediaRows.filter((m) => m.productId).length
  console.info(
    `✓ media : ${mediaRows.length} (${mediaLinked} liées à un produit, ${mediaRows.length - mediaLinked} sans)`,
  )

  // ─── Récapitulatif ───────────────────────────────────────────────────────
  console.info("\nEn base :", {
    categories: await prisma.categorie.count(),
    products: await prisma.product.count(),
    ingredients: await prisma.ingredient.count(),
    benefits: await prisma.benefit.count(),
    productIngredients: await prisma.productIngredients.count(),
    productBenefits: await prisma.productBenefits.count(),
    media: await prisma.media.count(),
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

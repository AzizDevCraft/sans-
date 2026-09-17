import "dotenv/config"

import { PrismaPg } from "@prisma/adapter-pg"

import { PrismaClient, Prisma } from "../src/generated/prisma/client"
import { benefits } from "./seed-data/benef"
import { ingredients } from "./seed-data/ingredient"
import { media } from "./seed-data/media"
import { distributors } from "./seed-data/distributeur"
import {
  category,
  products,
} from "./seed-data/products"

const connectionString =
  process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL (ou DIRECT_DATABASE_URL) n'est pas défini")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})

async function main() {

  // 1a. Media 
  const mediaIdByName = new Map<string, string>()
  for (const m of media) {
    const row = await prisma.media.upsert ({
      where:  { name: m.name },
      update: { name: m.name },
      create: { url: m.url, name: m.name , alt: m.alt },
      select: { id: true , name: true }
    })
    mediaIdByName.set (row.name, row.id)
  }
  console.info(`✓ media : ${media.length}`)

  // 2. Category 
  const categoryIdBySlug = new Map<string, string>()
  const categoryWithMedia: Prisma.CategoryCreateInput[] = category.map (cat => {
    const mediaId = mediaIdByName.get(cat.imageName)
    if (!mediaId)
      throw new Error (`pas d'image qui correspond pour la categorie ${cat.name} !`)
    return {
      name: cat.name,
      tagline: cat.tagline,
      order: cat.order,
      slug: cat.slug,
      image: { connect: { id: mediaId } }
    }})
  for (const c of categoryWithMedia) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: { name: c.name },
      select: { id: true, slug: true },
    })
    categoryIdBySlug.set(row.slug, row.id)
  }
  console.info(`✓ catégories : ${category.length}`)

  // 3. Produits 
  const productIdBySlug = new Map<string, string>()
  for (const p of products) {
    const categorieId = categoryIdBySlug.get(p.categorie)
    if (!categorieId) {
      throw new Error(`Produit "${p.name}" : catégorie (fileId ${p.categorie}) introuvable`)
    }

    const data: Prisma.ProductCreateInput = {
      name: p.name,
      title: p.title,
      slug: p.slug,
      calories: p.calories,
      proteins: p.proteins,
      priceInCount: p.priceInCount,
      secondPriceInKg: p.secondPriceInKg,
      unitCount: p.unitCount,
      categorie: { connect: { id: categorieId } },
    }

    const row = await prisma.product.upsert({
      where: { slug: p.slug },
      create: data,
      update: data,
      select: { id: true, slug: true, name: true },
    })
    productIdBySlug.set(row.slug, row.id)
  }
  if (productIdBySlug.size !== products.length) {
    throw new Error(
      "slug de produits non uniques — la résolution des jointures serait ambiguë",
    )
  }
  console.info(`✓ produits : ${products.length}`)

  //1b. linker les images avec leurs produits
  for (const m of media) {
    if (m.productSlug) {
      const productId = productIdBySlug.get(m.productSlug)
      if (!productId) {
        throw new Error(`produit "${m.productSlug}" introuvable pour le media "${m.name}"`)
      }
      const row = await prisma.media.upsert ({
        where: { name: m.name },
        update: { productId },
        create: { url: m.url, name: m.name , alt: m.alt, productId },
        select: { id: true , name: true }
      })
      mediaIdByName.set (row.name, row.id)
    }
  }
  console.info(`✓ media Linked : ${media.length}`)

  // 4. Ingrédients 
  const ingredientIdByName = new Map<string, string>()
  for (const ing of ingredients) {
    const row = await prisma.ingredient.upsert({
      where: { name: ing.name },
      create: { name: ing.name },
      update: {},
    })
    ingredientIdByName.set(row.name, row.id)
  }
  console.info(`✓ ingrédients : ${ingredients.length}`)

  // 5. Bénéfices
  const benefitIdByBenef = new Map<string, string>()
  for (const b of benefits) {
    const row = await prisma.benefit.upsert({
      where: { benef: b.benef },
      create: { benef: b.benef },
      update: {},
    })
    benefitIdByBenef.set(row.benef, row.id)
  }
  console.info(`✓ bénéfices : ${benefits.length}`)

  // 6. Jointure Produit & Ingrédient
  await prisma.productIngredients.deleteMany ()

  const productIngredientRows = Array.from(productIdBySlug.keys()).flatMap (productSlug => {
    return ingredients.filter (ing => ing.productsBySlug.includes (productSlug))
      .map (ing => {
        const idProd = productIdBySlug.get (productSlug)
        const idIngredient = ingredientIdByName.get (ing.name)
        if (!idProd || !idIngredient)
          throw new Error (`jointure produit↔ingrédient invalide : produit "${productSlug}" / ingrédient "${ing.name}`)
        return {idProd, idIngredient}
      })
  }) 

  await prisma.productIngredients.createMany ({
    data: productIngredientRows,
    skipDuplicates: true 
  })

  console.info(`✓ produit <-> ingrédient : ${productIngredientRows.length}`)

  // 7. Jointure Produit & Bénéfice 
  await prisma.productBenefits.deleteMany()
  const productBenefitRows = Array.from(productIdBySlug.keys()).flatMap (productSlug => {
    return benefits.filter (benef => benef.productsBySlug.includes (productSlug))
      .map (benef => {
        const idProd = productIdBySlug.get (productSlug)
        const idBenef = benefitIdByBenef.get (benef.benef)
        if (!idProd || !idBenef)
          throw new Error (`jointure produit <-> bénéfice invalide : produit "${productSlug}" / bénéfice "${benef.benef}`)
        return {idProd, idBenef}
      })
  })

  await prisma.productBenefits.createMany ({
    data: productBenefitRows,
    skipDuplicates: true 
  })

  console.info(`✓ produit ↔ bénéfice : ${productBenefitRows.length}`)

  // 8. Distributeurs
  const distributorIdBySlug = new Map<string, string> ()
  for (const d of distributors) {
    const mediaId = mediaIdByName.get (d.logo)
    if (!mediaId) throw new Error (`le partenaire ${d.name} n'as pas de logo qui lui correspondant`)
    const data: Prisma.DistributorCreateInput = {
      slug: d.slug,
      name: d.name,
      zone: d.zone, 
      position: d.position,
      phone: d.phone,
      mapEmbedUrl: d.mapEmbedUrl,
      openingHours: d.openingHours, 
      logo: { connect: { id: mediaId } }

    }
    const row = await prisma.distributor.upsert ({
      where: { slug: d.slug },
      update: {}, 
      create: data, 
      select: { id: true, slug: true }
    })
    distributorIdBySlug.set (row.slug, row.id)
  }
  console.info(`✓ distributeurs : ${distributors.length}`)

  // ─── Récapitulatif ───────────────────────────────────────────────────────
  console.info("\nEn base :", {
    media: await prisma.media.count(),
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
    ingredients: await prisma.ingredient.count(),
    benefits: await prisma.benefit.count(),
    productIngredients: await prisma.productIngredients.count(),
    productBenefits: await prisma.productBenefits.count(),
    distributors: await prisma.distributor.count ()
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
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- Backfill : conserve l'ordre actuel des images de chaque produit
-- (rang 0-based par createdAt, puis id). Les images sans produit restent à 0.
UPDATE "Media" AS m
SET "position" = r.rn
FROM (
  SELECT "id",
         ROW_NUMBER() OVER (PARTITION BY "productId" ORDER BY "createdAt" ASC, "id" ASC) - 1 AS rn
  FROM "Media"
  WHERE "productId" IS NOT NULL
) AS r
WHERE m."id" = r."id";

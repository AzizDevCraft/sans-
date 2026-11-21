-- Aligne la base sur le schéma : Category.tagline et Category.order passent en NOT NULL.
-- Aucune valeur NULL existante (vérifié en lecture seule le 2026-11-21).
ALTER TABLE "Category" ALTER COLUMN "tagline" SET NOT NULL,
ALTER COLUMN "order" SET NOT NULL;

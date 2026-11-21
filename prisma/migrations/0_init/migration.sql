-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Benefit" (
    "id" TEXT NOT NULL,
    "benef" TEXT NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "order" INTEGER,
    "slug" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zone" TEXT[],
    "phone" TEXT NOT NULL,
    "mapEmbedUrl" TEXT NOT NULL,
    "openingHours" JSONB NOT NULL,
    "logoId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" INTEGER,
    "publish" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categorieID" TEXT NOT NULL,
    "calories" INTEGER,
    "proteins" INTEGER NOT NULL,
    "priceInCount" DECIMAL(4,1) NOT NULL,
    "secondPriceInKg" DECIMAL(4,1),
    "unitCount" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductBenefits" (
    "idProd" TEXT NOT NULL,
    "idBenef" TEXT NOT NULL,

    CONSTRAINT "ProductBenefits_pkey" PRIMARY KEY ("idProd","idBenef")
);

-- CreateTable
CREATE TABLE "public"."ProductIngredients" (
    "idProd" TEXT NOT NULL,
    "idIngredient" TEXT NOT NULL,

    CONSTRAINT "ProductIngredients_pkey" PRIMARY KEY ("idProd","idIngredient")
);

-- CreateIndex
CREATE UNIQUE INDEX "Benefit_benef_key" ON "public"."Benefit"("benef" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Category_imageId_key" ON "public"."Category"("imageId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_logoId_key" ON "public"."Distributor"("logoId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_slug_key" ON "public"."Distributor"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "public"."Ingredient"("name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Media_key_key" ON "public"."Media"("key" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "public"."Media"("name" ASC);

-- CreateIndex
CREATE INDEX "Media_productId_idx" ON "public"."Media"("productId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug" ASC);

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "public"."Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Distributor" ADD CONSTRAINT "Distributor_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "public"."Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categorieID_fkey" FOREIGN KEY ("categorieID") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductBenefits" ADD CONSTRAINT "ProductBenefits_idBenef_fkey" FOREIGN KEY ("idBenef") REFERENCES "public"."Benefit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductBenefits" ADD CONSTRAINT "ProductBenefits_idProd_fkey" FOREIGN KEY ("idProd") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductIngredients" ADD CONSTRAINT "ProductIngredients_idIngredient_fkey" FOREIGN KEY ("idIngredient") REFERENCES "public"."Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductIngredients" ADD CONSTRAINT "ProductIngredients_idProd_fkey" FOREIGN KEY ("idProd") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

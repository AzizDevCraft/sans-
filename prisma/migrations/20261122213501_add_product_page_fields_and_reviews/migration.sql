-- CreateEnum
CREATE TYPE "ReviewerProfile" AS ENUM ('STUDENT', 'ATHLETE', 'ACTIVE_MOM', 'COACH', 'ENTREPRENEUR', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "carbsPer100g" DECIMAL(4,1),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "fatPer100g" DECIMAL(4,1),
ADD COLUMN     "fiberPer100g" DECIMAL(4,1),
ADD COLUMN     "proteinsPer100g" DECIMAL(4,1);

-- AlterTable
ALTER TABLE "ProductIngredients" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "profile" "ReviewerProfile" NOT NULL,
    "firstName" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_productId_createdAt_idx" ON "Review"("productId", "createdAt");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

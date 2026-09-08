import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

// Singleton : on réutilise l'instance entre les hot reloads de Next
const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

// En prod, on ne touche pas à global (pas de hot reload)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

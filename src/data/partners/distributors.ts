import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import prisma from "@/data/prisma"

export interface HomePartner {
  id: string
  name: string
  location: string
  position: number
}

export async function getPartners(): Promise<HomePartner[]> {

  "use cache"
  cacheLife ("max")
  cacheTag ("distributors")

  const distributors = await prisma.distributor.findMany ({
    select: {
      id: true,
      name: true,
      zone: true,
      position: true
    },
    orderBy: [{ position: { sort: "asc", nulls: "last" } }, { name: "asc" }, { id: "asc" }],
  })
  return distributors
    .map((distributor, index) => ({
      id: distributor.id,
      name: distributor.name,
      location: distributor.zone.join(", "),
      // `position` est nullable : distributeur sans ordre explicite → relégué en fin de liste.
      position: distributor.position ?? distributors.length + index + 1,
    }))
    .sort((a, b) => a.position - b.position)
}

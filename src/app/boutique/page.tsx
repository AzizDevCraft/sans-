import type { Metadata } from "next"

import { ShopPageContent } from "@/features/catalog/components/ShopPageContent"

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez nos snacks protéinés, nos bowls et nos shots — des produits sains et gourmands pour votre énergie quotidienne.",
}

export default function BoutiquePage() {
  return <ShopPageContent />
}

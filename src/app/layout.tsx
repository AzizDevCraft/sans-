import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import heroOgImg from "@/assets/brand/hero-img-og.jpg";
import { Footer } from "@/features/layout/components/Footer";
import { SiteChrome } from "@/features/layout/components/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const SITE_NAME = "SANS+"
const SITE_DESCRIPTION =
  "Snacks sains et gourmands, sans sucre ajouté ni compromis sur le goût. SANS+ réinvente le snacking plaisir pour votre énergie au quotidien."

// Domaine réel à fournir via NEXT_PUBLIC_SITE_URL (Vercel) — nécessaire pour que
// les URLs og:image/canonical résolues en absolu pointent vers le vrai domaine.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · SANS+",
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: heroOgImg.src,
        width: heroOgImg.width,
        height: heroOgImg.height,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [heroOgImg.src],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
        <Footer />
      </body>
    </html>
  );
}

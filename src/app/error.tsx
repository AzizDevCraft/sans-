"use client"

import { Button } from "@/components/ui/button"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-5 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Une erreur est survenue
        </h1>
        <p className="text-muted-foreground">
          Impossible d&apos;afficher cette page pour le moment. Merci de réessayer
          dans un instant.
        </p>
      </div>
      <Button variant="primary" size="brand" onClick={reset}>
        Réessayer
      </Button>
    </main>
  )
}

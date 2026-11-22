# Cache — SANS+

Source de vérité du cache (Cache Components, Next.js 16). Tenu par `cache-builder`.
`cacheComponents: true` est activé dans `next.config.ts`.

## Conventions

- `"use cache"` est TOUJOURS accompagné de `cacheLife(...)` ET `cacheTag(...)` dans la
  même fonction : jamais de durée de vie implicite, jamais d'entrée sans tag.
- Format des tags (2 niveaux par défaut) : group = entité au pluriel (`categories`),
  unité = `group:<slug>` (`categories:<slug>`). Le slug est préféré à l'id ; l'id
  n'est utilisé que si l'entité n'a pas de slug (à documenter).
- Layer (couche) OPTIONNEL : ajouté uniquement si un événement réel doit invalider
  plusieurs groupes ensemble. C'est un tag autonome supplémentaire (`catalog`), jamais
  un préfixe du groupe : on l'ajoute ou le retire sans renommer les tags existants.
- Les tags Next.js sont plats : chaque fonction en cache porte TOUTE sa chaîne.
  Liste : tag de groupe (+ layer s'il existe). Élément : unité + groupe (+ layer).
- Invalidation : toujours le tag le plus étroit qui couvre le changement.
  Modification d'un élément = son unité ; ajout/suppression = le groupe ;
  changement global = la couche (si elle existe).
- Aucun tag hors taxonomie.
- Profils intégrés disponibles : `default`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `max`.
- Méthodes d'invalidation : `updateTag` (immédiate, l'utilisateur voit sa propre
  écriture) ; `revalidateTag(tag, profil)` (stale-while-revalidate, délai acceptable).

## Taxonomie des tags

| Group | Unité | Layer | Regroupe | Pourquoi |
|---|---|---|---|---|
| `categories` | `categories:<slug>` (motif réservé, aucune fonction ne le porte) | aucun | Catégories de produits (Category + image Media) | Données catalogue qui changent uniquement par seed/déploiement |
| `products` | `products:<slug>` (motif réservé, aucune fonction ne le porte) | aucun | Produits de la boutique (Product + images Media du produit) | Données catalogue qui changent uniquement par seed/déploiement. Les images (Media) n'ont pas de groupe propre : elles sont portées par leur entité propriétaire (`categories` pour l'image de catégorie, `products` pour les images de produit) |
| `distributors` | `distributors:<slug>` (motif réservé, aucune fonction ne le porte) | aucun | Partenaires / distributeurs (Distributor) | S'invalide à l'arrivée, la modification ou la suppression d'un partenaire |

Aucun layer : aucun événement réel n'invalide plusieurs groupes ensemble à ce jour (seed + redéploiement renouvelle tout le cache, pas d'invalidation runtime).

## Carte des données

| Fonction | Chemin | Chaîne de tags | Profil | Consommée par | Statut | Raison |
|---|---|---|---|---|---|---|
| `getHomeCategories` | `src/data/catalog/categories.ts` | `categories` | `max` | `/` (CategorySection) | En cache | Donnée partagée, change uniquement via seed/déploiement |
| `getShopData` | `src/data/catalog/shop.ts` | `categories`, `products` | `max` | `/boutique` (ShopPageContent) | En cache | Donnée partagée (catégories + produits + 1re image), change uniquement via seed/déploiement. Renvoie une liste de catégories contenant des produits : porte le groupe de chaque entité qu'elle contient (`categories` et `products`) |
| `getPartners` | `src/data/partners/distributors.ts` | `distributors` | `max` | `/` (PartnersSection) | En cache | Donnée partagée, invalidée à l'arrivée d'un partenaire |
| `getHeroContent` | `src/data/brand/hero.ts` | aucun | n/a | `/` (HeroSection) | Non caché | Assets statiques importés, pas de DB |
| `getHeroOgImage` | `src/data/brand/hero.ts` | aucun | n/a | `/` (metadata) | Non caché | Asset statique importé |
| `getIngredientGallery` | `src/data/brand/gallery.ts` | aucun | n/a | `/` (IngredientsSection) | Non caché | Assets statiques importés |

## Règles d'invalidation

| Événement | Produit par | Tags à invalider | Méthode | Statut | Justification |
|---|---|---|---|---|---|
| Création d'un partenaire (Distributor) | Future Server Action de création de partenaire (n'existe pas encore) | `distributors` | `revalidateTag("distributors", "max")` | EN ATTENTE DE BRANCHEMENT (server-builder) | Ajout = tag du groupe. Le visiteur de la homepage ne voit pas sa propre écriture, un délai est acceptable : revalidation stale-while-revalidate, pas `updateTag`. Profil `max` cohérent avec le `cacheLife("max")` de la fonction |
| Modification / suppression d'un partenaire | Futures actions correspondantes | `distributors` | `revalidateTag("distributors", "max")` | EN ATTENTE DE BRANCHEMENT (server-builder), validée par l'utilisateur | La homepage liste tous les partenaires : la même règle s'applique. Pas d'unité taguée car aucune fonction ne renvoie un partenaire seul |
| Changement de catégorie (Category / Media) | Aucun : seed ou déploiement | aucun | aucune invalidation runtime | Décision utilisateur | Les catégories ne changent que via seed/déploiement ; un déploiement renouvelle le cache. Tout seed exécuté sur la DB de production DOIT être suivi d'un redéploiement, sinon la homepage et la boutique restent obsolètes jusqu'à la revalidation `max` (30 j). Le tag `categories` est porté par `getHomeCategories` (`/`) ET `getShopData` (`/boutique`) : la règle couvre les deux pages. Si une mutation runtime apparaît, ajouter une règle sur `categories` |
| Changement de produit / image de produit (Product / Media) de la boutique | Aucun : seed ou déploiement | aucun | aucune invalidation runtime | Décision utilisateur 2026-11-21 | Les produits et leurs images ne changent que via seed/déploiement, comme les catégories. Tout seed exécuté sur la DB de production DOIT être suivi d'un redéploiement, sinon `/boutique` reste obsolète jusqu'à la revalidation `max` (30 j). Si une mutation runtime apparaît (ajout/suppression : `products` ; modification : `products` tant qu'aucune fonction ne porte `products:<slug>`), ajouter une règle |

## Carte des pages

| Route | Coquille statique | Parties dynamiques | Frontière Suspense | Raison |
|---|---|---|---|---|
| `/` | Page entière (statique, ○ au build) | Aucune | Aucune | Données DB en cache (`max`), reste en assets statiques ; aucune lecture de cookies, en-têtes ou paramètres |
| `/contact` | Page entière (statique, placeholder) | Aucune | Aucune | Aucune donnée, aucune lecture de cookies, en-têtes ou paramètres |
| `/quiz` | Page entière (statique, placeholder) | Aucune | Aucune | Aucune donnée, aucune lecture de cookies, en-têtes ou paramètres |
| `/boutique` | Page entière : en-tête, filtre et sections produit (données `getShopData` en cache `max`) | `CategoryScrollSync` (client, ne rend rien) : lit `useSearchParams` | `<Suspense fallback={null}>` dans `ShopCatalog` (déjà en place) | Aucune donnée dynamique côté serveur : pas de cookies, en-têtes, session ni `searchParams` serveur. Les sections produit (Server Components) sont hors de la frontière. pas d'`instant = false` (inutile, donnée cachée) |

## Profils personnalisés

Aucun. Tous les profils utilisés sont intégrés à Next.js (`max`).

## Historique

- 2026-11-17 — Mode 0 : création de `docs/cache.md` ; `cacheComponents: true` vérifié, non modifié.
- 2026-11-17 — Taxonomie créée : layers `catalog` et `distribution`, groups `catalog:categories` et `distribution:distributors`.
- 2026-11-17 — `getHomeCategories` : tag plat `categories` remplacé par `catalog`, `catalog:categories` ; profil `max` conservé.
- 2026-11-17 — `getPartners` : tag plat `partners` remplacé par `distribution`, `distribution:distributors` ; profil `max` conservé.
- 2026-11-17 — Règles d'invalidation documentées : création de partenaire (en attente de branchement), modification/suppression (proposition), catégories (aucune invalidation runtime).
- 2026-11-17 — Carte des pages : `/` documentée ; `/boutique` notée non couverte.
- 2026-11-17 — Correction suite au review : `/contact` et `/quiz` ajoutées à la carte des pages (statiques) ; règle explicite « aucun événement global » pour `catalog` et `distribution` ; tags unit précisés « motif réservé » ; règle catégories complétée (seed en production suivi d'un redéploiement) ; profil `default` ajouté aux profils intégrés.
- 2026-11-17 — Règle modification/suppression de partenaire validée par l'utilisateur : passe de PROPOSITION à EN ATTENTE DE BRANCHEMENT (`revalidateTag("distribution:distributors", "max")`).
- 2026-11-18 — Conventions révisées (décision utilisateur) : trio `"use cache"` + `cacheLife` + `cacheTag` obligatoire ; taxonomie à 2 niveaux par défaut (group, unité `group:<slug>`, slug préféré à l'id) ; layer optionnel, tag autonome ajouté seulement sur besoin réel.
- 2026-11-18 — Layers `catalog` et `distribution` supprimés (aucun événement ne les visait). `getHomeCategories` : `catalog`, `catalog:categories` → `categories`. `getPartners` : `distribution`, `distribution:distributors` → `distributors`. Règles d'invalidation partenaires : `revalidateTag("distributors", "max")`. Ligne « changement global de couche » retirée.
- 2026-11-21 — Mode A boutique : group `products` ajouté à la taxonomie (unité `products:<slug>` en motif réservé, pas de layer). Media sans groupe propre (porté par son entité propriétaire).
- 2026-11-21 — `getShopData` mise en cache : `"use cache"` + `cacheLife("max")` + `cacheTag("categories", "products")`. Requête, types et mapping inchangés.
- 2026-11-21 — Règle ajoutée : changement produit/média de la boutique = aucune invalidation runtime, seed + redéploiement (décision utilisateur). Règle catégories étendue à `/boutique` (tag `categories` partagé avec `getHomeCategories`).
- 2026-11-21 — Carte des pages : `/boutique` documentée (statique ; `CategoryScrollSync` sous Suspense existant). `export const instant = false` absent de `page.tsx` à l'état courant, rien à retirer.
- 2026-11-22 — Réorganisation de la couche data par domaine (aucun changement de cache) : `src/data/homepage.ts` éclaté en `catalog/categories.ts`, `brand/hero.ts`, `brand/gallery.ts`, `partners/distributors.ts` (+ helpers image partagés `src/data/media.ts`) ; `src/data/shop.ts` → `src/data/catalog/shop.ts`. Agrégateur `getHomepageData` supprimé : `src/app/page.tsx` appelle directement les fonctions. Directives, tags et profils inchangés.

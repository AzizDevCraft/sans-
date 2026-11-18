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
| `distributors` | `distributors:<slug>` (motif réservé, aucune fonction ne le porte) | aucun | Partenaires / distributeurs (Distributor) | S'invalide à l'arrivée, la modification ou la suppression d'un partenaire |

Aucun layer : aucun événement réel n'invalide plusieurs groupes ensemble à ce jour.

## Carte des données

| Fonction | Chemin | Chaîne de tags | Profil | Consommée par | Statut | Raison |
|---|---|---|---|---|---|---|
| `getHomeCategories` | `src/data/homepage.ts` | `categories` | `max` | `/` (CategorySection) | En cache | Donnée partagée, change uniquement via seed/déploiement |
| `getPartners` | `src/data/homepage.ts` | `distributors` | `max` | `/` (PartnersSection) | En cache | Donnée partagée, invalidée à l'arrivée d'un partenaire |
| `getHeroContent` | `src/data/homepage.ts` | aucun | n/a | `/` (HeroSection) | Non caché | Assets statiques importés, pas de DB |
| `getHeroOgImage` | `src/data/homepage.ts` | aucun | n/a | `/` (metadata) | Non caché | Asset statique importé |
| `getIngredientGallery` | `src/data/homepage.ts` | aucun | n/a | `/` (IngredientsSection) | Non caché | Assets statiques importés |
| `getHomepageData` | `src/data/homepage.ts` | aucun | n/a | `/` | Non caché | Agrégateur ; hérite du cache des fonctions appelées |

## Règles d'invalidation

| Événement | Produit par | Tags à invalider | Méthode | Statut | Justification |
|---|---|---|---|---|---|
| Création d'un partenaire (Distributor) | Future Server Action de création de partenaire (n'existe pas encore) | `distributors` | `revalidateTag("distributors", "max")` | EN ATTENTE DE BRANCHEMENT (server-builder) | Ajout = tag du groupe. Le visiteur de la homepage ne voit pas sa propre écriture, un délai est acceptable : revalidation stale-while-revalidate, pas `updateTag`. Profil `max` cohérent avec le `cacheLife("max")` de la fonction |
| Modification / suppression d'un partenaire | Futures actions correspondantes | `distributors` | `revalidateTag("distributors", "max")` | EN ATTENTE DE BRANCHEMENT (server-builder), validée par l'utilisateur | La homepage liste tous les partenaires : la même règle s'applique. Pas d'unité taguée car aucune fonction ne renvoie un partenaire seul |
| Changement de catégorie (Category / Media) | Aucun : seed ou déploiement | aucun | aucune invalidation runtime | Décision utilisateur | Les catégories ne changent que via seed/déploiement ; un déploiement renouvelle le cache. Tout seed exécuté sur la DB de production DOIT être suivi d'un redéploiement, sinon la homepage reste obsolète jusqu'à la revalidation `max` (30 j). Si une mutation runtime apparaît, ajouter une règle sur `categories` |

## Carte des pages

| Route | Coquille statique | Parties dynamiques | Frontière Suspense | Raison |
|---|---|---|---|---|
| `/` | Page entière (statique, ○ au build) | Aucune | Aucune | Données DB en cache (`max`), reste en assets statiques ; aucune lecture de cookies, en-têtes ou paramètres |
| `/contact` | Page entière (statique, placeholder) | Aucune | Aucune | Aucune donnée, aucune lecture de cookies, en-têtes ou paramètres |
| `/quiz` | Page entière (statique, placeholder) | Aucune | Aucune | Aucune donnée, aucune lecture de cookies, en-têtes ou paramètres |
| `/boutique` | Non couverte | Non couverte | Non couverte | Autre fonctionnalité, à traiter dans un Mode A dédié (`src/app/boutique/`, `src/lib/shop/`, `src/data/shop.ts`) |

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

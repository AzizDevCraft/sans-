import { readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Couches : app → features → data → base (components, lib, hooks, config, assets, generated).
// Chaque couche n'importe que celles qui sont en dessous d'elle.
const BASE = ["./src/components", "./src/lib", "./src/hooks", "./src/config"];
const FEATURES = readdirSync("src/features", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

// Contrôle sur le fichier réellement résolu : couvre les imports `@/…` ET relatifs (`../../`).
const couches = {
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    "import/no-restricted-paths": ["error", {
      zones: [
        ...FEATURES.map((feature) => ({
          target: `./src/features/${feature}`,
          from: "./src/features",
          except: [`./${feature}`],
          message: "Une feature n'importe pas une autre feature : la page compose.",
        })),
        { target: "./src/features", from: "./src/app", message: "Une feature ne dépend pas du routage." },
        {
          target: "./src/data",
          from: ["./src/app", "./src/features", "./src/components", "./src/hooks"],
          message: "La couche data ne dépend de rien au-dessus d'elle.",
        },
        {
          target: BASE,
          from: ["./src/app", "./src/features", "./src/data"],
          message: "La base (composants génériques, utilitaires, hooks) ne connaît pas le métier.",
        },
        {
          target: ["./src/app", "./src/features"],
          from: "./src/data/prisma.ts",
          message: "Seule la couche data parle à Prisma : passe par une fonction de @/data.",
        },
      ],
    }],
  },
};

// Dans une feature, les imports internes sont relatifs : tout `@/features/…` est interdit
// (une autre feature est déjà bloquée ci-dessus, la même feature doit passer en relatif).
const relatifDansFeature = {
  files: ["src/features/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-imports": ["error", {
      patterns: [{
        group: ["@/features/*"],
        message: "À l'intérieur d'une feature, imports relatifs ; une autre feature : la page compose.",
      }],
    }],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  couches,
  relatifDansFeature,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
  ]),
]);

export default eslintConfig;

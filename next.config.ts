import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  partialPrefetching: false,
  serverExternalPackages: ["@prisma/adapter-pg"]
};

export default nextConfig;

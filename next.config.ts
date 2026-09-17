import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  serverExternalPackages: ["@prisma/adapter-pg"]
};

export default nextConfig;

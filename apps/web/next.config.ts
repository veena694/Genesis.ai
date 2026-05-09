import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@genforge/shared", "@genforge/ui-engine"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@genforge/shared", "@genforge/ui-engine"],
};

export default nextConfig;

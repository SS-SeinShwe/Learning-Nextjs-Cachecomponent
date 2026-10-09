import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 152 start
  cacheComponents: true,
  reactCompiler: true,
  // 152 end
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

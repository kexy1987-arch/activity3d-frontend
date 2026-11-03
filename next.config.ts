import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jteqdkmnqvrtpcntjszq.supabase.co",
        pathname: "/storage/v1/object/public/players/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
  experimental: {
    agentFeedback: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  cacheComponents: true,
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

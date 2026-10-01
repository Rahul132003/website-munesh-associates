import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the user's home folder otherwise wins root inference
  turbopack: { root: __dirname },
  // Career form uploads a resume (capped at 4 MB in lib/careers.ts) plus multipart overhead
  experimental: { serverActions: { bodySizeLimit: "4.5mb" } },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // 75 is Next's default and visibly softens large architectural photography
    qualities: [75, 90],
  },
};

export default nextConfig;

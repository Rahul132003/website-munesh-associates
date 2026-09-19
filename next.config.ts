import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the user's home folder otherwise wins root inference
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // 75 is Next's default and visibly softens large architectural photography
    qualities: [75, 90],
  },
};

export default nextConfig;

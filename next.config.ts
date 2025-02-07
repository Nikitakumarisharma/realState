import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["th.bing.com"], // ✅ Allow external images from this domain
  },
  /* config options here */
};

export default nextConfig;

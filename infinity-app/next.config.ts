import type { NextConfig } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: STRAPI_URL.includes('localhost') ? 'http' : 'https',
        hostname: STRAPI_URL,
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

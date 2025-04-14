import type { NextConfig } from "next";
import { URL } from "url";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
if (!STRAPI_URL) {
  throw new Error("❌ Missing required environment variable: STRAPI_URL");
}

console.log("STRAPI_URL = ", STRAPI_URL);

const parsed = new URL(STRAPI_URL);
const protocol = parsed.protocol.replace(":", "") as "http" | "https";
console.log("protocol = ", protocol);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol,
        hostname: parsed.hostname,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

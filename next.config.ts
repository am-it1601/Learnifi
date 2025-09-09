import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh", // covers your custom file subdomains
      },
    ],
  },
    typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

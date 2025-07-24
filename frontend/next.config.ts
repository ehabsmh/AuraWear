import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Accept all paths
      },
    ],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // only if you want faster dev, not recommended long-term
  },
};

export default nextConfig;

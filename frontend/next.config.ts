import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images.himalayas.app",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/backend/:path*",
      destination: `${process.env.BACKEND_URL}/:path*`,
    },
  ],
};

export default nextConfig;

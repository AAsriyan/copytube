import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "7zmcxdb9d8.ufs.sh",
      },
    ],
  },
};

export default nextConfig;

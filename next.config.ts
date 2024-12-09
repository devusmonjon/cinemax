import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "picsum.photos",
      "cdn4.cdn-telegram.org",
      "s3-alpha-sig.figma.com",
    ],
  },
};

export default nextConfig;

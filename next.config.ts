import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn4.cdn-telegram.org",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "s3-alpha-sig.figma.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "picsum.photos",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "x.sex-studentki.tube",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "i.ytimg.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

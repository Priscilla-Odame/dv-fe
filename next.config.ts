import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  // output: "standalone",
  env: {
    NEXT_PUBLIC_APP_URL: "https://https://dv-be.onrender.com/api/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  // output: "standalone",
  env: {
    // NEXT_PUBLIC_APP_URL: "https://7ae2-109-40-241-12.ngrok-free.app/api/",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000/api/",
    NEXT_PUBLIC_CLIENT_URL: "http://localhost:3001/api/",
    // NEXT_PUBLIC_APP_URL: "https://dv-be.onrender.com/api/",
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

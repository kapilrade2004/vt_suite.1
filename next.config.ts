import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false as any,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      }
    ];
  }
};

export default nextConfig;

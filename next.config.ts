import type { NextConfig } from "next";

const backendUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://vasifysute-backend-u28q.onrender.com').replace(/\/+$/, '');
const destination = backendUrl.endsWith('/api') ? `${backendUrl}/:path*` : `${backendUrl}/api/:path*`;

const nextConfig: NextConfig = {
  devIndicators: false as any,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination
      }
    ];
  }
};

export default nextConfig;

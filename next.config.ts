import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['insurance-platform-nackend.onrender.com'],
  },
  async rewrites() {
    // Проверяем окружение
    const isDevelopment = process.env.NODE_ENV === 'development'
    const apiBaseUrl = isDevelopment 
      ? "http://127.0.0.1:8000" 
      : "https://insurance-platform-nackend.onrender.com"
    
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
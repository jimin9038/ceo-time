/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    typedRoutes: true,
    turbo: true
  },
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/next-auth/api/auth`
      : process.env.NEXTAUTH_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ceotimebucket.s3.ap-northeast-2.amazonaws.com'
      }
    ]
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    turbo: true
  },
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/next-auth/api/auth`
      : process.env.NEXTAUTH_URL
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ceotimebucket-migrated.s3.ap-northeast-2.amazonaws.com'
      }
    ]
  }
}

module.exports = nextConfig

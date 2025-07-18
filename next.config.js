/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mui/joy', '@mui/icons-material'],
  },
  transpilePackages: ['@mui/joy', '@mui/material', '@mui/icons-material'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
  // Configuration for deployment
  output: 'standalone',
  trailingSlash: false,
  // Optimize for production deployment
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;

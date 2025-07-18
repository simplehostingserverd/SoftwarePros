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
  // Configuration for deployment
  output: 'standalone',
  trailingSlash: false,
  // Optimize for production deployment
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

};

module.exports = nextConfig;

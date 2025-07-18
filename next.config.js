/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mui/joy', '@mui/icons-material'],
  },
  transpilePackages: ['@mui/joy', '@mui/material', '@mui/icons-material', 'framer-motion'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  // Fix for framer-motion bundling issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    // Handle framer-motion properly
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        'framer-motion': 'framer-motion',
      });
    }

    return config;
  },
  // Optimize for production deployment
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Handle static optimization
  trailingSlash: false,
  // Configuration for CPanel deployment
  output: 'standalone',
};

module.exports = nextConfig;

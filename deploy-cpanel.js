#!/usr/bin/env node

/**
 * cPanel Deployment Script for SoftwarePros Website
 * 
 * This script prepares the Next.js application for deployment on cPanel hosting
 * with Node.js support. It creates a production build that works with the
 * custom app.js server configuration.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting cPanel deployment preparation...');

try {
  // Step 1: Clean previous builds
  console.log('📦 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('dist-cpanel')) {
    execSync('rm -rf dist-cpanel', { stdio: 'inherit' });
  }

  // Step 2: Run production build
  console.log('🔨 Building production application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step 3: Create deployment directory
  console.log('📁 Creating deployment directory...');
  fs.mkdirSync('dist-cpanel', { recursive: true });

  // Step 4: Copy necessary files
  console.log('📋 Copying deployment files...');
  
  // Copy built application
  execSync('cp -r .next dist-cpanel/', { stdio: 'inherit' });
  
  // Copy public assets
  if (fs.existsSync('public')) {
    execSync('cp -r public dist-cpanel/', { stdio: 'inherit' });
  }
  
  // Copy package.json and lock file
  execSync('cp package.json dist-cpanel/', { stdio: 'inherit' });
  if (fs.existsSync('package-lock.json')) {
    execSync('cp package-lock.json dist-cpanel/', { stdio: 'inherit' });
  }
  
  // Copy server files
  execSync('cp app.js dist-cpanel/', { stdio: 'inherit' });
  execSync('cp server.js dist-cpanel/', { stdio: 'inherit' });
  
  // Copy next config
  execSync('cp next.config.js dist-cpanel/', { stdio: 'inherit' });

  // Copy environment files if they exist
  if (fs.existsSync('.env.local')) {
    execSync('cp .env.local dist-cpanel/', { stdio: 'inherit' });
  }
  if (fs.existsSync('.env.example')) {
    execSync('cp .env.example dist-cpanel/', { stdio: 'inherit' });
  }

  // Step 5: Create deployment instructions
  const deploymentReadme = `
# cPanel Deployment Instructions

## Upload Process
1. Compress the contents of the 'dist-cpanel' directory into a ZIP file
2. Upload the ZIP file to your cPanel File Manager
3. Extract the contents to your Node.js app directory

## Setup in cPanel
1. In Node.js Selector:
   - Set Node.js version to 18.x or later
   - Set Application root to your app directory
   - Set Application URL to your domain
   - Set Application startup file to 'app.js'

2. Install dependencies:
   \`npm install --production\`

3. Set environment variables in Node.js Selector:
   - NODE_ENV=production
   - SMTP_HOST=your-smtp-host
   - SMTP_PORT=587
   - SMTP_USER=your-email
   - SMTP_PASS=your-password

## Start the Application
The application will start automatically with 'app.js' as the startup file.
Visit your domain to see the live website.

## File Structure
- app.js - cPanel-optimized server
- .next/ - Built Next.js application
- public/ - Static assets
- package.json - Dependencies

## Troubleshooting
- Check cPanel error logs if the app doesn't start
- Ensure all environment variables are set
- Verify Node.js version is 18.x or later
`;

  fs.writeFileSync('dist-cpanel/DEPLOYMENT.md', deploymentReadme);

  console.log('✅ cPanel deployment package ready in dist-cpanel/');
  console.log('📖 Read DEPLOYMENT.md in dist-cpanel/ for upload instructions');

} catch (error) {
  console.error('❌ Deployment preparation failed:', error.message);
  process.exit(1);
}
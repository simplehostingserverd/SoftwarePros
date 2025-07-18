#!/bin/bash

# Software Pros Website - CPanel Deployment Script
# This script helps prepare the application for CPanel deployment

echo "🚀 Starting Software Pros Website Deployment Preparation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js version check passed: $(node --version)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
print_status "Installing dependencies..."
if npm ci; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting and formatting
print_status "Running code quality checks..."
npm run lint:fix
npm run format

# Build the application
print_status "Building the application for production..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Create deployment package
print_status "Creating deployment package..."
DEPLOY_DIR="software-pros-deploy"
rm -rf $DEPLOY_DIR
mkdir $DEPLOY_DIR

# Copy necessary files
cp -r .next $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp -r src $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp next.config.js $DEPLOY_DIR/
cp server.js $DEPLOY_DIR/
cp app.js $DEPLOY_DIR/
cp .env.production $DEPLOY_DIR/.env.local
cp biome.json $DEPLOY_DIR/
cp tailwind.config.js $DEPLOY_DIR/
cp postcss.config.mjs $DEPLOY_DIR/
cp tsconfig.json $DEPLOY_DIR/

# Copy prisma if it exists
if [ -d "prisma" ]; then
    cp -r prisma $DEPLOY_DIR/
fi

# Create a README for deployment
cat > $DEPLOY_DIR/DEPLOYMENT_README.md << EOF
# Software Pros Website - CPanel Deployment

## Quick Start

1. Upload all files to your CPanel application directory
2. In CPanel Node.js settings:
   - Set startup file to: \`app.js\`
   - Set Node.js version to: 18.x or higher
3. Install dependencies: \`npm install --production\`
4. Start the application in CPanel

## Environment Variables

Set these in CPanel Node.js environment variables:
- NODE_ENV=production
- NEXT_PUBLIC_SITE_URL=https://yourdomain.com

## Troubleshooting

If you encounter issues:
1. Check CPanel error logs
2. Ensure Node.js version is 18+
3. Verify all files uploaded correctly
4. Check file permissions (755 for directories, 644 for files)

For support: info@softwarepros.com
EOF

# Create zip file for easy upload
print_status "Creating zip file for upload..."
cd $DEPLOY_DIR
zip -r ../software-pros-website-deploy.zip . -x "*.log" "*.tmp"
cd ..

print_success "Deployment package created successfully!"
print_status "Files created:"
echo "  📁 $DEPLOY_DIR/ - Deployment directory"
echo "  📦 software-pros-website-deploy.zip - Upload this to CPanel"

print_status "Next steps:"
echo "  1. Upload software-pros-website-deploy.zip to your CPanel file manager"
echo "  2. Extract the zip file in your application directory"
echo "  3. Configure Node.js app in CPanel:"
echo "     - Startup file: app.js"
echo "     - Node.js version: 18.x+"
echo "  4. Set environment variables in CPanel"
echo "  5. Start the application"

print_success "Deployment preparation complete! 🎉"

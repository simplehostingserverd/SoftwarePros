#!/bin/bash

# Deploy NextAuth.js Schema to Coolify PostgreSQL
# Run this script from the project root directory

echo "🚀 Deploying NextAuth.js authentication schema to Coolify PostgreSQL..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    echo "Please set your DATABASE_URL from Coolify before running this script"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "🗄️  Pushing schema to database..."
npx prisma db push

echo "✅ Schema deployment completed successfully!"
echo ""
echo "🔐 NextAuth.js is now configured with:"
echo "   - NEXTAUTH_SECRET: $(echo $NEXTAUTH_SECRET | cut -c1-10)..."
echo "   - NEXTAUTH_URL: $NEXTAUTH_URL"
echo "   - Database: PostgreSQL (via Coolify)"
echo ""
echo "🎉 You can now use NextAuth.js authentication in your application!"
@echo off
REM Deploy NextAuth.js Schema to Coolify PostgreSQL
REM Run this batch file from the project root directory

echo 🚀 Deploying NextAuth.js authentication schema to Coolify PostgreSQL...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if DATABASE_URL is set
if "%DATABASE_URL%"=="" (
    echo ❌ Error: DATABASE_URL environment variable is not set
    echo Please set your DATABASE_URL from Coolify before running this script
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

echo 🔄 Generating Prisma client...
call npx prisma generate

echo 🗄️  Pushing schema to database...
call npx prisma db push

echo ✅ Schema deployment completed successfully!
echo.
echo 🔐 NextAuth.js is now configured with:
echo    - NEXTAUTH_SECRET: %NEXTAUTH_SECRET%
echo    - NEXTAUTH_URL: %NEXTAUTH_URL%
echo    - Database: PostgreSQL (via Coolify)
echo.
echo 🎉 You can now use NextAuth.js authentication in your application!
pause
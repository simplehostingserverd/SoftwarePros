@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Creating CPanel Deployment Package (Simple Version)...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js version: 
node --version

echo.
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [INFO] Creating deployment package without build...
set DEPLOY_DIR=software-pros-deploy-simple
if exist %DEPLOY_DIR% rmdir /s /q %DEPLOY_DIR%
mkdir %DEPLOY_DIR%

REM Copy source files
echo [INFO] Copying source files...
xcopy /e /i src %DEPLOY_DIR%\src
xcopy /e /i public %DEPLOY_DIR%\public
copy package.json %DEPLOY_DIR%\
copy next.config.js %DEPLOY_DIR%\
copy server.js %DEPLOY_DIR%\
copy app.js %DEPLOY_DIR%\
copy .env.production %DEPLOY_DIR%\.env.local
copy biome.json %DEPLOY_DIR%\
copy tailwind.config.js %DEPLOY_DIR%\
copy postcss.config.mjs %DEPLOY_DIR%\
copy tsconfig.json %DEPLOY_DIR%\

REM Copy prisma if it exists
if exist prisma xcopy /e /i prisma %DEPLOY_DIR%\prisma

REM Create a special package.json for CPanel
echo [INFO] Creating CPanel-optimized package.json...
(
echo {
echo   "name": "software-pros-website",
echo   "version": "0.1.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "next dev",
echo     "build": "next build",
echo     "start": "node app.js",
echo     "postinstall": "npm run build"
echo   },
echo   "dependencies": {
echo     "@emotion/react": "^11.11.1",
echo     "@emotion/styled": "^11.11.0",
echo     "@hookform/resolvers": "^3.10.0",
echo     "@mui/icons-material": "^5.15.1",
echo     "@mui/joy": "^5.0.0-beta.40",
echo     "@mui/material": "^5.15.1",
echo     "framer-motion": "^10.16.16",
echo     "next": "14.2.30",
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-hook-form": "^7.60.0",
echo     "zod": "^3.25.76"
echo   },
echo   "devDependencies": {
echo     "@types/node": "^20",
echo     "@types/react": "^18.2.0",
echo     "@types/react-dom": "^18.2.0",
echo     "autoprefixer": "^10.4.21",
echo     "postcss": "^8.5.6",
echo     "tailwindcss": "^3.4.17",
echo     "typescript": "^5"
echo   }
echo }
) > %DEPLOY_DIR%\package.json

REM Create deployment instructions
echo [INFO] Creating deployment instructions...
(
echo # Software Pros Website - CPanel Deployment Instructions
echo.
echo ## Upload and Setup
echo 1. Upload all files to your CPanel application directory
echo 2. In CPanel Node.js App settings:
echo    - Application Root: /public_html ^(or your domain folder^)
echo    - Application URL: https://yourdomain.com
echo    - Application Startup File: app.js
echo    - Node.js Version: 18.x or higher
echo.
echo ## Environment Variables
echo Set these in CPanel Node.js environment variables:
echo - NODE_ENV=production
echo - NEXT_PUBLIC_SITE_URL=https://yourdomain.com
echo.
echo ## Installation Commands
echo Run these in CPanel Terminal or SSH:
echo ```
echo cd /home/yourusername/public_html
echo npm install
echo npm run build
echo ```
echo.
echo ## Start Application
echo In CPanel Node.js interface, click "Start App"
echo.
echo ## Troubleshooting
echo - Check CPanel error logs if app won't start
echo - Ensure Node.js version is 18+
echo - Verify file permissions ^(755 for directories, 644 for files^)
echo - Check that all dependencies installed correctly
echo.
echo For support: info@softwarepros.com
) > %DEPLOY_DIR%\DEPLOYMENT_INSTRUCTIONS.md

echo.
echo [INFO] Creating zip file...
powershell -command "Compress-Archive -Path '%DEPLOY_DIR%\*' -DestinationPath 'software-pros-cpanel-deploy.zip' -Force"

echo.
echo [SUCCESS] CPanel deployment package created!
echo.
echo Files created:
echo   📁 %DEPLOY_DIR%\ - Deployment directory
echo   📦 software-pros-cpanel-deploy.zip - Upload this to CPanel
echo.
echo Next steps:
echo   1. Upload software-pros-cpanel-deploy.zip to CPanel File Manager
echo   2. Extract in your application directory
echo   3. Configure Node.js app in CPanel with startup file: app.js
echo   4. Set environment variables
echo   5. The build will happen automatically when you start the app
echo.
echo [SUCCESS] Ready for CPanel deployment! 🎉
echo.
pause

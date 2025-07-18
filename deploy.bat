@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Starting Software Pros Website Deployment Preparation...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js version check passed: 
node --version

echo.
echo [INFO] Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo [INFO] Installing dependencies...
call npm ci
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

echo.
echo [INFO] Running code quality checks...
call npm run lint:fix
call npm run format

echo.
echo [INFO] Building the application for production...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed successfully

echo.
echo [INFO] Creating deployment package...
set DEPLOY_DIR=software-pros-deploy
if exist %DEPLOY_DIR% rmdir /s /q %DEPLOY_DIR%
mkdir %DEPLOY_DIR%

REM Copy necessary files
echo [INFO] Copying files...
xcopy /e /i .next %DEPLOY_DIR%\.next
xcopy /e /i public %DEPLOY_DIR%\public
xcopy /e /i src %DEPLOY_DIR%\src
copy package.json %DEPLOY_DIR%\
copy package-lock.json %DEPLOY_DIR%\
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

REM Create deployment README
echo # Software Pros Website - CPanel Deployment > %DEPLOY_DIR%\DEPLOYMENT_README.md
echo. >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo ## Quick Start >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo. >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo 1. Upload all files to your CPanel application directory >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo 2. In CPanel Node.js settings: >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo    - Set startup file to: app.js >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo    - Set Node.js version to: 18.x or higher >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo 3. Install dependencies: npm install --production >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo 4. Start the application in CPanel >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo. >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo ## Environment Variables >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo. >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo Set these in CPanel Node.js environment variables: >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo - NODE_ENV=production >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo - NEXT_PUBLIC_SITE_URL=https://yourdomain.com >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo. >> %DEPLOY_DIR%\DEPLOYMENT_README.md
echo For support: info@softwarepros.com >> %DEPLOY_DIR%\DEPLOYMENT_README.md

echo.
echo [INFO] Creating zip file for upload...
powershell -command "Compress-Archive -Path '%DEPLOY_DIR%\*' -DestinationPath 'software-pros-website-deploy.zip' -Force"

echo.
echo [SUCCESS] Deployment package created successfully!
echo.
echo [INFO] Files created:
echo   📁 %DEPLOY_DIR%\ - Deployment directory
echo   📦 software-pros-website-deploy.zip - Upload this to CPanel
echo.
echo [INFO] Next steps:
echo   1. Upload software-pros-website-deploy.zip to your CPanel file manager
echo   2. Extract the zip file in your application directory
echo   3. Configure Node.js app in CPanel:
echo      - Startup file: app.js
echo      - Node.js version: 18.x+
echo   4. Set environment variables in CPanel
echo   5. Start the application
echo.
echo [SUCCESS] Deployment preparation complete! 🎉
echo.
pause

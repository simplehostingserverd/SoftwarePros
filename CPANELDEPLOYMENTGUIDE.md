# cPanel Deployment Guide for Software Pros Website

This guide provides step-by-step instructions for deploying the Software Pros Next.js website on a cPanel hosting environment with Node.js support.

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

- cPanel hosting account with Node.js support (version 18.x or higher)
- SSH access to your hosting account (recommended)
- Domain name configured and pointing to your hosting account
- Basic knowledge of command line operations

## 🔧 Server Requirements

### Minimum Requirements
- **Node.js**: Version 18.x or higher
- **RAM**: Minimum 1GB (2GB+ recommended)
- **Storage**: At least 500MB free space
- **Bandwidth**: Sufficient for your expected traffic

### Recommended Hosting Providers
- **A2 Hosting** - Excellent Node.js support
- **HostGator** - Good performance and support
- **SiteGround** - Reliable with Node.js capabilities
- **InMotion Hosting** - Developer-friendly features

## 🚀 Deployment Steps

### Step 1: Prepare Your Local Environment

1. **Build the production version**
   ```bash
   npm run build
   ```

2. **Test the production build locally**
   ```bash
   npm start
   ```
   Verify everything works correctly at `http://localhost:3000`

3. **Create a deployment package**
   ```bash
   # Create a zip file with necessary files
   zip -r software-pros-website.zip . -x "node_modules/*" ".git/*" ".next/*" "*.log"
   ```

### Step 2: Access cPanel and Setup Node.js

1. **Log into your cPanel account**
   - Navigate to your hosting provider's cPanel login
   - Enter your credentials

2. **Enable Node.js**
   - Look for "Node.js" or "Node.js Selector" in cPanel
   - Click on it and create a new Node.js application
   - Select Node.js version 18.x or higher
   - Set the application root (usually `public_html` or a subdomain folder)
   - Set the application URL (your domain)
   - Click "Create"

3. **Configure Node.js Application**
   - **Application Root**: `/public_html` (or your domain folder)
   - **Application URL**: `https://yourdomain.com`
   - **Application Startup File**: `server.js` (we'll create this)
   - **Node.js Version**: 18.x or higher

### Step 3: Upload and Configure Files

1. **Upload your files**
   - Use File Manager in cPanel or FTP client
   - Upload the zip file to your application root
   - Extract the files

2. **Create a custom server file**
   Create `server.js` in your application root:
   ```javascript
   const { createServer } = require('http');
   const { parse } = require('url');
   const next = require('next');

   const dev = process.env.NODE_ENV !== 'production';
   const hostname = 'localhost';
   const port = process.env.PORT || 3000;

   const app = next({ dev, hostname, port });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     createServer(async (req, res) => {
       try {
         const parsedUrl = parse(req.url, true);
         await handle(req, res, parsedUrl);
       } catch (err) {
         console.error('Error occurred handling', req.url, err);
         res.statusCode = 500;
         res.end('internal server error');
       }
     })
       .once('error', (err) => {
         console.error(err);
         process.exit(1);
       })
       .listen(port, () => {
         console.log(`> Ready on http://${hostname}:${port}`);
       });
   });
   ```

3. **Update package.json for production**
   Ensure your `package.json` has the correct scripts:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "node server.js",
       "lint": "biome check .",
       "lint:fix": "biome check --write .",
       "format": "biome format --write ."
     }
   }
   ```

### Step 4: Install Dependencies and Build

1. **Access Terminal/SSH**
   - Use cPanel Terminal or SSH into your server
   - Navigate to your application directory:
     ```bash
     cd /home/yourusername/public_html
     ```

2. **Install Node.js dependencies**
   ```bash
   npm install --production
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

### Step 5: Configure Environment Variables

1. **Create environment file**
   Create `.env.local` in your application root:
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Set environment variables in cPanel**
   - Go to Node.js app settings in cPanel
   - Add environment variables:
     - `NODE_ENV`: `production`
     - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`

### Step 6: Start the Application

1. **Start the Node.js application**
   - In cPanel Node.js interface, click "Start App"
   - Or via terminal: `npm start`

2. **Verify deployment**
   - Visit your domain to ensure the site loads correctly
   - Check all pages and functionality

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Module not found" errors
**Solution**: Ensure all dependencies are installed
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Build fails due to memory limits
**Solution**: Increase Node.js memory limit
```bash
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

#### Issue: Static files not loading
**Solution**: Check file permissions and paths
```bash
chmod -R 755 public/
chmod -R 755 .next/
```

#### Issue: Application won't start
**Solution**: Check logs and restart
```bash
# Check application logs in cPanel
# Or restart the Node.js application
```

### Performance Optimization

1. **Enable compression**
   Add to your `next.config.ts`:
   ```typescript
   const nextConfig: NextConfig = {
     compress: true,
     poweredByHeader: false,
     // ... other config
   };
   ```

2. **Configure caching**
   - Enable browser caching in cPanel
   - Set appropriate cache headers

3. **Monitor performance**
   - Use cPanel metrics to monitor resource usage
   - Consider upgrading hosting plan if needed

## 🔒 Security Considerations

### SSL Certificate
1. **Enable SSL in cPanel**
   - Go to SSL/TLS section
   - Install Let's Encrypt certificate (free)
   - Force HTTPS redirects

### Security Headers
Add security headers to `.htaccess`:
```apache
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

### File Permissions
Set appropriate permissions:
```bash
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 600 .env.local
```

## 📊 Monitoring and Maintenance

### Regular Maintenance Tasks

1. **Update dependencies monthly**
   ```bash
   npm update
   npm audit fix
   ```

2. **Monitor logs**
   - Check cPanel error logs regularly
   - Monitor application performance

3. **Backup regularly**
   - Use cPanel backup features
   - Keep local backups of your code

### Performance Monitoring

1. **Use cPanel metrics**
   - Monitor CPU and memory usage
   - Track bandwidth consumption

2. **Set up monitoring alerts**
   - Configure email alerts for downtime
   - Monitor response times

## 🆘 Support and Resources

### Getting Help

1. **Hosting Provider Support**
   - Contact your hosting provider for server-specific issues
   - Check their Node.js documentation

2. **Next.js Resources**
   - [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
   - [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

3. **Software Pros Support**
   - Email: info@softwarepros.com
   - Phone: (956) 555-0123

### Useful Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# View running processes
ps aux | grep node

# Check disk usage
df -h

# Check memory usage
free -m

# Restart Node.js app (if you have PM2)
pm2 restart all
```

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly on your domain
- [ ] All pages are accessible and functional
- [ ] Contact form works and sends emails
- [ ] SSL certificate is installed and working
- [ ] All images and assets load properly
- [ ] Mobile responsiveness works correctly
- [ ] SEO meta tags are present
- [ ] Google Analytics/tracking is configured
- [ ] Backup system is in place
- [ ] Monitoring is set up

---

**Congratulations! Your Software Pros website is now live and ready to attract healthcare clients!**

For additional support or custom deployment assistance, contact Software Pros at info@softwarepros.com.

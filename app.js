// CPanel Node.js App Entry Point
// This file is required by some CPanel hosting providers

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number.parseInt(process.env.PORT, 10) || 3000;

// Create Next.js app
const app = next({
  dev,
  hostname,
  port,
  dir: __dirname,
});
const handle = app.getRequestHandler();

console.log(`[${new Date().toISOString()}] Starting Next.js application...`);
console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV}`);
console.log(`[${new Date().toISOString()}] Directory: ${__dirname}`);

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        // Add CORS headers for development
        if (dev) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
          return;
        }

        // Parse the URL
        const parsedUrl = parse(req.url, true);

        // Log requests in development
        if (dev) {
          console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        }

        // Handle the request with Next.js
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Error handling ${req.url}:`, err);
        res.statusCode = 500;
        res.end('Internal server error');
      }
    });

    server.once('error', (err) => {
      console.error(`[${new Date().toISOString()}] Server error:`, err);
      process.exit(1);
    });

    server.listen(port, hostname, () => {
      console.log(`[${new Date().toISOString()}] > Server ready on http://${hostname}:${port}`);
      console.log(`[${new Date().toISOString()}] > Environment: ${process.env.NODE_ENV}`);
      console.log(`[${new Date().toISOString()}] > PID: ${process.pid}`);
    });

    // Export the server for CPanel compatibility
    module.exports = server;
  })
  .catch((err) => {
    console.error(`[${new Date().toISOString()}] Failed to start Next.js:`, err);
    process.exit(1);
  });

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log(`[${new Date().toISOString()}] SIGTERM received, shutting down gracefully`);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(`[${new Date().toISOString()}] SIGINT received, shutting down gracefully`);
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `[${new Date().toISOString()}] Unhandled Rejection at:`,
    promise,
    'reason:',
    reason
  );
  process.exit(1);
});

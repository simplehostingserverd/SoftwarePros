'use client';

import { useEffect, useState } from 'react';
import { PerformanceMonitor, type PerformanceMetrics } from './PerformanceOptimizer';

interface PerformanceLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PerformanceLayout({ children, className = '' }: PerformanceLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    // Mark as loaded after initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMetrics = (newMetrics: PerformanceMetrics) => {
    setMetrics((previousMetrics: Record<string, number>) => ({
      ...previousMetrics,
      ...newMetrics,
    }));

    // Log Core Web Vitals in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Core Web Vitals:', newMetrics);
    }

    // Send metrics to analytics in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics if present
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof window !== 'undefined' && typeof w.gtag === 'function') {
        Object.entries(newMetrics).forEach(([key, value]) => {
          w.gtag?.('event', 'core_web_vitals', {
            metric_name: key,
            metric_value: value,
            metric_id: `${key}_${Date.now()}`,
          });
        });
      }
    }
  };

  return (
    <>
      <PerformanceMonitor onMetrics={handleMetrics} />

      <div
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        {children}
      </div>

      {/* Performance debugging info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded text-xs font-mono z-50">
          <div>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'N/A'}</div>
          <div>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'N/A'}</div>
          <div>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}</div>
        </div>
      )}
    </>
  );
}

// Preload critical resources
export function PreloadResources() {
  useEffect(() => {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/globals.css';
    document.head.appendChild(criticalCSS);

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.href = '/fonts/inter-var.woff2';
    document.head.appendChild(fontPreload);

    // Preload critical images
    const imagePreload = document.createElement('link');
    imagePreload.rel = 'preload';
    imagePreload.as = 'image';
    imagePreload.href = '/web-app-manifest-512x512.png';
    document.head.appendChild(imagePreload);

    return () => {
      document.head.removeChild(criticalCSS);
      document.head.removeChild(fontPreload);
      document.head.removeChild(imagePreload);
    };
  }, []);

  return null;
}

// Resource hints for better performance
export function ResourceHints() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />

      {/* Preload critical resources */}
      <link rel="preload" href="/globals.css" as="style" />
      <link rel="preload" href="/web-app-manifest-512x512.png" as="image" />
    </>
  );
}

// Service Worker registration for caching
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return null;
}

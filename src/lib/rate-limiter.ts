import { getRedisClient } from "./redis";

/**
 * Redis-backed rate limiter with in-memory fallback
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private useRedis: boolean;

  constructor(windowMs?: number, maxRequests?: number, useRedis = true) {
    this.windowMs = windowMs || Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"); // 15 minutes
    this.maxRequests = maxRequests || Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100");
    this.useRedis = useRedis;

    // Clean up old entries every 5 minutes (only for in-memory fallback)
    if (!this.useRedis) {
      setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  /**
   * Check if the identifier can make a request
   */
  async canMakeRequest(identifier: string): Promise<boolean> {
    if (this.useRedis) {
      return this.canMakeRequestRedis(identifier);
    } else {
      return this.canMakeRequestMemory(identifier);
    }
  }

  /**
   * Redis-based rate limiting
   */
  private async canMakeRequestRedis(identifier: string): Promise<boolean> {
    try {
      const redis = await getRedisClient();
      if (!redis) {
        console.warn("Redis not available, falling back to in-memory rate limiting");
        return this.canMakeRequestMemory(identifier);
      }

      const key = `rate_limit:${identifier}`;
      const now = Date.now();
      const windowStart = now - this.windowMs;

      // Use Redis sorted set to store timestamps
      const multi = redis.multi();

      // Remove old entries
      multi.zRemRangeByScore(key, 0, windowStart);

      // Count current entries
      multi.zCard(key);

      // Add current timestamp
      multi.zAdd(key, { score: now, value: now.toString() });

      // Set expiration
      multi.expire(key, Math.ceil(this.windowMs / 1000));

      const results = await multi.exec();
      const currentCount = results && results[1] && typeof results[1] === "number" ? results[1] : 0;

      // Check if under the limit (before adding current request)
      return currentCount < this.maxRequests;
    } catch (error) {
      console.error("Redis rate limiting error, falling back to memory:", error);
      return this.canMakeRequestMemory(identifier);
    }
  }

  /**
   * In-memory rate limiting (fallback)
   */
  private canMakeRequestMemory(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get or create request history for this identifier
    const requests = this.requests.get(identifier) || [];

    // Filter out old requests outside the window
    const recentRequests = requests.filter((timestamp) => timestamp > windowStart);

    // Check if under the limit
    if (recentRequests.length < this.maxRequests) {
      // Add current request
      recentRequests.push(now);
      this.requests.set(identifier, recentRequests);
      return true;
    }

    return false;
  }

  /**
   * Get remaining requests for an identifier
   */
  async getRemainingRequests(identifier: string): Promise<number> {
    if (this.useRedis) {
      return this.getRemainingRequestsRedis(identifier);
    } else {
      return this.getRemainingRequestsMemory(identifier);
    }
  }

  private async getRemainingRequestsRedis(identifier: string): Promise<number> {
    try {
      const redis = await getRedisClient();
      if (!redis) {
        return this.getRemainingRequestsMemory(identifier);
      }

      const key = `rate_limit:${identifier}`;
      const now = Date.now();
      const windowStart = now - this.windowMs;

      // Remove old entries and count
      await redis.zRemRangeByScore(key, 0, windowStart);
      const currentCount = await redis.zCard(key);

      return Math.max(0, this.maxRequests - currentCount);
    } catch (error) {
      console.error("Redis rate limiting error, falling back to memory:", error);
      return this.getRemainingRequestsMemory(identifier);
    }
  }

  private getRemainingRequestsMemory(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const requests = this.requests.get(identifier) || [];
    const recentRequests = requests.filter((timestamp) => timestamp > windowStart);

    return Math.max(0, this.maxRequests - recentRequests.length);
  }

  /**
   * Get time until next allowed request (in milliseconds)
   */
  async getTimeUntilNextRequest(identifier: string): Promise<number> {
    if (this.useRedis) {
      return this.getTimeUntilNextRequestRedis(identifier);
    } else {
      return this.getTimeUntilNextRequestMemory(identifier);
    }
  }

  private async getTimeUntilNextRequestRedis(identifier: string): Promise<number> {
    try {
      const redis = await getRedisClient();
      if (!redis) {
        return this.getTimeUntilNextRequestMemory(identifier);
      }

      const key = `rate_limit:${identifier}`;
      const now = Date.now();
      const windowStart = now - this.windowMs;

      // Get oldest entry in the current window
      const oldestEntries = await redis.zRangeByScore(key, windowStart, "+inf", {
        LIMIT: { offset: 0, count: 1 },
      });

      if (oldestEntries.length === 0) return 0;

      const oldestRequest = Number.parseInt(oldestEntries[0]);
      return Math.max(0, oldestRequest + this.windowMs - now);
    } catch (error) {
      console.error("Redis rate limiting error, falling back to memory:", error);
      return this.getTimeUntilNextRequestMemory(identifier);
    }
  }

  private getTimeUntilNextRequestMemory(identifier: string): number {
    const requests = this.requests.get(identifier) || [];
    if (requests.length === 0) return 0;

    const oldestRequest = Math.min(...requests);
    const windowStart = Date.now() - this.windowMs;

    if (oldestRequest <= windowStart) return 0;

    return oldestRequest - windowStart;
  }

  /**
   * Clean up old entries to prevent memory leaks (in-memory only)
   */
  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [identifier, requests] of this.requests.entries()) {
      const recentRequests = requests.filter((timestamp) => timestamp > windowStart);

      if (recentRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recentRequests);
      }
    }
  }
}

// Global rate limiter instances
export const emailRateLimiter = new RateLimiter(15 * 60 * 1000, 10); // 10 emails per 15 minutes
export const apiRateLimiter = new RateLimiter(15 * 60 * 1000, 100); // 100 API requests per 15 minutes

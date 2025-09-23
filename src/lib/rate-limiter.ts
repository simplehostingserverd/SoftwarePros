/**
 * Simple in-memory rate limiter for email sending
 * In production, consider using Redis or a database for distributed rate limiting
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if the identifier can make a request
   */
  canMakeRequest(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get or create request history for this identifier
    const requests = this.requests.get(identifier) || [];

    // Filter out old requests outside the window
    const recentRequests = requests.filter(timestamp => timestamp > windowStart);

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
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const requests = this.requests.get(identifier) || [];
    const recentRequests = requests.filter(timestamp => timestamp > windowStart);

    return Math.max(0, this.maxRequests - recentRequests.length);
  }

  /**
   * Get time until next allowed request (in milliseconds)
   */
  getTimeUntilNextRequest(identifier: string): number {
    const requests = this.requests.get(identifier) || [];
    if (requests.length === 0) return 0;

    const oldestRequest = Math.min(...requests);
    const windowStart = Date.now() - this.windowMs;

    if (oldestRequest <= windowStart) return 0;

    return oldestRequest - windowStart;
  }

  /**
   * Clean up old entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [identifier, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(timestamp => timestamp > windowStart);

      if (recentRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recentRequests);
      }
    }
  }
}
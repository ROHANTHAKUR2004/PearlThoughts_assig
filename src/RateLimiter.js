export class RateLimiter {
  constructor(limit, intervalMs) {
    this.limit = limit;
    this.intervalMs = intervalMs;
    this.tokens = limit;
    this.lastRefill = Date.now();
  }

  isAllowed() {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }

  refill() {
    const now = Date.now();
    if (now - this.lastRefill > this.intervalMs) {
      this.tokens = this.limit;
      this.lastRefill = now;
    }
  }
}

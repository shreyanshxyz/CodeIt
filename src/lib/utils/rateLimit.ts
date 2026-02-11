import 'server-only';

interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitData>();

  check(identifier: string, limit: number, windowMs: number): {
    success: boolean;
    remaining: number;
    resetTime: number;
  } {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record || now > record.resetTime) {
      const newRecord: RateLimitData = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.store.set(identifier, newRecord);
      return {
        success: true,
        remaining: limit - 1,
        resetTime: newRecord.resetTime,
      };
    }

    if (record.count >= limit) {
      return {
        success: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    record.count++;
    return {
      success: true,
      remaining: limit - record.count,
      resetTime: record.resetTime,
    };
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

const registerLimiter = new RateLimiter();
const submissionLimiter = new RateLimiter();

setInterval(() => {
  registerLimiter.cleanup();
  submissionLimiter.cleanup();
}, 60 * 1000);

export const rateLimit = {
  register: (identifier: string) =>
    registerLimiter.check(identifier, 5, 60 * 1000),

  submission: (identifier: string) =>
    submissionLimiter.check(identifier, 10, 60 * 1000),
};

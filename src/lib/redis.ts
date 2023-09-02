import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

// Create a new ratelimiter, that allows 5 requests per 5 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '5 s'),
  analytics: true,
})

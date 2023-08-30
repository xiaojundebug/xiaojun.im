import { type NextRequest, NextResponse } from 'next/server'
import { ratelimit, redis } from '@/lib/redis'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { slug } = await req.json()
  // TODO: 根据 client ip 限制速率而不是全局限制
  const { success } = await ratelimit.limit('post:views')
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const pv = await redis.incr(`post:views:${slug}`)

  return NextResponse.json({ pv })
}

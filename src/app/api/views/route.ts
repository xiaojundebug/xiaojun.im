import { type NextRequest, NextResponse } from 'next/server'
import { ratelimit, redis } from '@/lib/redis'
import { isPostExists } from '@/utils/post'

export async function PATCH(req: NextRequest) {
  const { slug } = await req.json()

  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 })
  }

  const exists = await isPostExists(slug)
  if (!exists) {
    return new Response('Slug failed to match any post', { status: 400 })
  }

  const { success } = await ratelimit.limit(`post:views_${req.ip ?? ''}`)
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const pv = await redis.incr(`post:views:${slug}`)

  return NextResponse.json({ pv })
}

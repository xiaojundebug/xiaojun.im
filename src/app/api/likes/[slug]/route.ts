import { type NextRequest, NextResponse } from 'next/server'
import { ratelimit, redis } from '@/lib/redis'
import { isPostExists } from '@/common/post'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)

  const exists = await isPostExists(slug)
  if (!exists) {
    return new Response('Slug failed to match any post', { status: 400 })
  }

  const { success } = await ratelimit.limit(`post:likes_${req.ip ?? ''}`)
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const likes = await redis.get(`post:likes:${slug}`)

  return NextResponse.json({ likes: likes || 0 })
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)

  const exists = await isPostExists(slug)
  if (!exists) {
    return new Response('Slug failed to match any post', { status: 400 })
  }

  const { success } = await ratelimit.limit(`post:likes_${req.ip ?? ''}`)
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const likes = await redis.incr(`post:likes:${slug}`)

  return NextResponse.json({ likes })
}

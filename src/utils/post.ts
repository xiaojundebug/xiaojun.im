import { promises as fs } from 'fs'
import path from 'path'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { orderBy, take } from 'lodash'
import dayjs from 'dayjs'

// Cache posts and frontmatters
const cache = new Map<string, any>()

export async function getAllPosts() {
  const posts: string[] = cache.get('posts') || (await glob('posts/**/*.mdx'))
  cache.set('posts', posts)
  return posts
}

export function getPostSlug(post: string) {
  return post.replace(/^posts\/|\.mdx$/g, '')
}

export async function readRawMdx(post: string) {
  return fs.readFile(path.resolve(process.cwd(), post), 'utf8')
}

export async function getLatestPosts({
  limit = Infinity,
  orderBy: order = 'desc',
}: {
  limit?: number
  orderBy?: 'asc' | 'desc'
} = {}) {
  const posts = await getAllPosts()
  const allPosts = await Promise.all(
    posts.map(async post => {
      const slug = getPostSlug(post)
      const frontmatter = await getPostFrontmatter(post)

      return {
        slug,
        frontmatter,
      }
    }),
  )

  return take(
    orderBy(
      allPosts.filter(({ frontmatter }) => !frontmatter.draft),
      ({ frontmatter }) => dayjs(frontmatter.date).valueOf(),
      [order],
    ),
    limit,
  )
}

export async function getPostFrontmatter(post: string): Promise<PostFrontmatter> {
  if (cache.has(post)) {
    return cache.get(post)
  }
  const rawMdx = await readRawMdx(post)
  const frontmatter = matter(rawMdx).data
  cache.set(post, frontmatter)
  return frontmatter as PostFrontmatter
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const idx = posts.findIndex(post => post.slug === slug)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : null

  return { prev, next }
}

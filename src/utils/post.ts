import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import matter from 'gray-matter'
import dayjs from 'dayjs'

// Cache posts and frontmatters
const cache = new Map<string, any>()

export async function getAllPosts() {
  const cacheKey = 'posts'
  const posts: string[] = cache.get(cacheKey) || (await glob('posts/**/*.mdx'))
  cache.set(cacheKey, posts)
  return posts
}

export function getPostSlug(post: string) {
  return post.replace(/^posts\/|\.mdx$/g, '')
}

export async function getLatestPosts({
  limit = Infinity,
  orderBy = 'desc',
}: {
  limit?: number
  orderBy?: 'asc' | 'desc'
} = {}) {
  const posts = await getAllPosts()
  const allPosts = await Promise.all(
    posts.map(async post => {
      const slug = getPostSlug(post)
      const frontmatter = await getPostFrontmatter(slug)

      return {
        slug,
        frontmatter,
      }
    }),
  )

  return allPosts
    .filter(({ frontmatter }) => !frontmatter.draft)
    .sort((a, b) => {
      const v1 = dayjs(a.frontmatter.date).valueOf()
      const v2 = dayjs(b.frontmatter.date).valueOf()

      return orderBy === 'desc' ? v2 - v1 : v1 - v2
    })
    .slice(0, limit)
}

export async function getPostFrontmatter(slug: string): Promise<PostFrontmatter> {
  const cacheKey = `post:frontmatter:${slug}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  const rawMdx = await fs.readFile(path.join(process.cwd(), `posts/${slug}.mdx`), 'utf8')
  const frontmatter = matter(rawMdx).data
  cache.set(cacheKey, frontmatter)
  return frontmatter as PostFrontmatter
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const idx = posts.findIndex(post => post.slug === slug)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : null

  return { prev, next }
}

export async function isPostExists(slug: string) {
  try {
    await fs.access(path.join(process.cwd(), `posts/${slug}.mdx`), fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

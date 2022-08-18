import { promises as fs } from 'fs'
import path from 'path'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { orderBy, take } from 'lodash'
import dayjs from 'dayjs'

export async function getAllPostPaths() {
  return await glob('src/posts/**/*.mdx')
}

// TODO: 缓存以优化性能，目前并未发现该方法很占性能
/**
 * 获取所有文章
 */
export async function getLatestPosts({
  limit = Infinity,
  orderBy: order = 'desc',
}: {
  limit?: number
  orderBy?: 'asc' | 'desc'
} = {}) {
  const postsPath = await getAllPostPaths()

  return take(
    orderBy(
      await Promise.all(
        postsPath.map(async path => {
          const slug = path.replace(/^src\/posts\/|\.mdx$/g, '')
          const frontmatter = await getPostFrontmatterBySlug(slug)

          return {
            path,
            slug,
            frontmatter,
          }
        }),
      ),
      ({ frontmatter }) => dayjs(frontmatter.date).valueOf(),
      [order],
    ),
    limit,
  )
}

export function getSlugByPostPath(postPath: string) {
  return postPath.replace(/^src\/posts\/|\.mdx$/g, '')
}

export async function getPostFrontmatterBySlug(slug: string) {
  const rawMdx = await fs.readFile(path.resolve(process.cwd(), `src/posts/${slug}.mdx`), 'utf8')
  return matter(rawMdx).data as Promise<PostFrontmatter>
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const idx = posts.findIndex(post => post.slug === slug)
  const prevPosts = idx > 0 ? posts[idx - 1] : undefined
  const nextPosts = idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : undefined

  return {
    prev: prevPosts ? { slug: prevPosts.slug, frontmatter: prevPosts.frontmatter } : undefined,
    next: nextPosts ? { slug: nextPosts.slug, frontmatter: nextPosts.frontmatter } : undefined,
  }
}

import { getLatestPosts } from '@/utils/post'
import PostsByTagPage from '@/components/PostsByTag'

export async function generateStaticParams() {
  const posts = await getLatestPosts()
  const tags = new Set<string>()

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      tags.add(tag)
    }
  }

  return Array.from(tags).map(tag => ({
    slug: tag,
  }))
}

export default async function PostsByTag({ params }: { params: { slug: string } }) {
  const { slug } = params
  const tag = decodeURIComponent(slug)
  const posts = await getLatestPosts()

  return (
    <PostsByTagPage tag={tag} posts={posts.filter(post => post.frontmatter.tags?.includes(tag))} />
  )
}

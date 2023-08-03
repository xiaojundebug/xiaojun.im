import { GetStaticPaths, GetStaticProps } from 'next'
import PostsByTag from '@/layouts/PostsByTag'
import { getLatestPosts } from '@/utils/post'

export default PostsByTag

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await getLatestPosts()
  const tags = new Set<string>()

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      tags.add(tag)
    }
  }

  return {
    paths: Array.from(tags).map(tag => ({
      params: { slug: `${tag}` },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ params }) => {
  const { slug: tag } = params!
  const posts = await getLatestPosts()

  return {
    props: {
      tag,
      posts: posts.filter(post => post.frontmatter.tags?.includes(tag)),
    },
  }
}

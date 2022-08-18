import { GetStaticPaths, GetStaticProps } from 'next'
import DefaultLayout from '@/layouts/Default'
import { getLatestPosts } from '@/utils/post'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default DefaultLayout

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const posts = await getLatestPosts({ orderBy: 'asc' })
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

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ params, locale }) => {
  const { slug } = params!
  const posts = await getLatestPosts({ orderBy: 'asc' })

  return {
    props: {
      posts: posts.filter(post => post.frontmatter.tags?.includes(slug)),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

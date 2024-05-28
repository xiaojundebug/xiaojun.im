import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import DesktopOnly from '@/components/DesktopOnly'
import { ArrowRight } from '@/components/icons'

export interface PostListProps {
  posts: {
    slug: string
    frontmatter: PostFrontmatter
  }[]
  dateFormat?: string
}

const PostList: React.FC<PostListProps> = props => {
  const { posts = [], dateFormat = 'MMMM D' } = props

  return (
    <>
      {posts.map(({ frontmatter, slug }, idx) => (
        <Link key={idx} className="block -mx-3 sm:-mx-4 mt-2" href={`/posts/${slug}`} prefetch={false}>
          <article className="group relative p-3 sm:p-4 rounded-xl sm:hover:bg-zinc-400/10 transition-colors">
            <h3 className="mb-1.5 text-lg font-medium">{frontmatter.title}</h3>
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              {dayjs(frontmatter.date).format(dateFormat)}
            </span>
            <DesktopOnly>
              <ArrowRight className="absolute right-2.5 top-2.5 text-zinc-300 dark:text-zinc-600 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
            </DesktopOnly>
          </article>
        </Link>
      ))}
    </>
  )
}

export default PostList

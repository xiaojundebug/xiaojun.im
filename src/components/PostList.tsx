import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'

export interface PostListProps {
  posts: {
    path: string
    slug: string
    frontmatter: PostFrontmatter
  }[]
  dateFormat?: string
}

const PostList: React.FC<PostListProps> = props => {
  const { posts, dateFormat = 'MMMM D' } = props

  return (
    <>
      {posts.map(({ frontmatter, slug }, idx) => (
        <article key={idx} className="my-8">
          <h3 className="text-lg font-medium">
            <Link href={`/posts/${slug}`}>
              <a className="hover:text-primary">{frontmatter.title}</a>
            </Link>
          </h3>
          <span className="font-medium inline-block text-sm mt-2 text-zinc-400 dark:text-zinc-500">
            {dayjs(frontmatter.date).format(dateFormat)}
          </span>
        </article>
      ))}
    </>
  )
}

export default PostList

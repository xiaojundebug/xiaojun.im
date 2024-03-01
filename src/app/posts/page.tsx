import React, { Fragment } from 'react'
import { getLatestPosts } from '@/common/post'
import dayjs from 'dayjs'
import Profile from '@/components/Profile'
import PostList, { PostListProps } from '@/components/PostList'

const formatPosts = (posts: PostListProps['posts']) => {
  const m = new Map<number, PostListProps['posts']>()
  for (const post of posts) {
    const year = dayjs(post.frontmatter.date).year()
    if (!m.has(year)) m.set(year, [])
    m.get(year)!.push(post)
  }
  return Array.from(m)
}

export default async function Posts() {
  const posts = await getLatestPosts()
  const formattedPosts = formatPosts(posts)

  return (
    <>
      <div className="prose-container">
        <Profile />
        {formattedPosts.map(([year, postsByYear], idx) => (
          <Fragment key={idx}>
            <h2
              className="font-medium text-2xl
                before:content-['#_'] before:text-primary"
            >
              {year}
            </h2>
            <PostList posts={postsByYear} />
          </Fragment>
        ))}
      </div>
    </>
  )
}

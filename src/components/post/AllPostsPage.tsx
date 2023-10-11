import React, { Fragment, useMemo } from 'react'
import Splash from '../Splash'
import PostList, { PostListProps } from '@/components/post/PostList'
import dayjs from 'dayjs'

export interface AllPostsPageProps {
  posts: PostListProps['posts']
}

const AllPostsPage: React.FC<AllPostsPageProps> = props => {
  const { posts } = props
  const formattedPosts = useMemo(() => {
    const m = new Map<number, PostListProps['posts']>()
    for (const post of posts) {
      const year = dayjs(post.frontmatter.date).year()
      if (!m.has(year)) m.set(year, [])
      m.get(year)!.push(post)
    }
    return Array.from(m)
  }, [posts])

  return (
    <>
      <div className="prose-container">
        <Splash />
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

export default AllPostsPage
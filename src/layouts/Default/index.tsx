import React from 'react'
import Splash from '../../components/Splash'
import PostList, { PostListProps } from '../../components/PostList'

export interface DefaultLayoutProps {
  posts: PostListProps['posts']
}

const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const { posts } = props

  return (
    <>
      <Splash />
      <div className="container min-h-screen">
        <hr className="divider mt-4" />
        <PostList posts={posts} />
        <hr className="divider" />
      </div>
    </>
  )
}

export default DefaultLayout

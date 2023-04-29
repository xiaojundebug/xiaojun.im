import React from 'react'
import Splash from '../components/Splash'
import PostList, { PostListProps } from '../components/PostList'

export interface DefaultLayoutProps {
  posts: PostListProps['posts']
}

const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const { posts } = props

  return (
    <>
      <div className="prose-container">
        <Splash />
        <PostList posts={posts} />
      </div>
    </>
  )
}

export default DefaultLayout

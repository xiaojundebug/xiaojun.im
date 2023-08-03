import React from 'react'
import Splash from '../components/Splash'
import PostList, { PostListProps } from '@/components/PostList'

export interface PostsByTagProps {
  tag: string
  posts: PostListProps['posts']
}

const PostsByTag: React.FC<PostsByTagProps> = props => {
  const { tag, posts } = props

  return (
    <>
      <div className="prose-container">
        <Splash />
        <h2 className="font-medium text-2xl before:content-['#_'] before:text-primary">{tag}</h2>
        <PostList posts={posts} dateFormat="MMMM D, YYYY" />
      </div>
    </>
  )
}

export default PostsByTag

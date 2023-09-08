import React from 'react'
import Splash from '../Splash'
import PostList, { PostListProps } from '@/components/post/PostList'

export interface PostsByTagPageProps {
  tag: string
  posts: PostListProps['posts']
}

const PostsByTagPage: React.FC<PostsByTagPageProps> = props => {
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

export default PostsByTagPage

'use client'

import React from 'react'
import TableOfContents, { Heading } from '@/components/TableOfContents'
import PostLikeButton from './PostLikeButton'

export interface PostAsideProps {
  slug: string
  headings?: Heading[]
}

const PostRightAside: React.FC<PostAsideProps> = props => {
  const { slug, headings = [] } = props

  return (
    <aside className="absolute left-full h-full pt-16 ml-16">
      <div className="sticky top-[10vh] max-w-[250px] mr-4">
        {/* 侧边目录导航 */}
        {headings.length > 0 && <TableOfContents headings={headings} />}
        {/* 点赞 */}
        <PostLikeButton slug={slug} />
      </div>
    </aside>
  )
}

export default PostRightAside

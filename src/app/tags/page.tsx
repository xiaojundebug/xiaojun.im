import React from 'react'
import { getLatestPosts } from '@/common/post'
import TagsPage from './TagsPage'

async function getTags() {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const tags: Record<
    string,
    {
      tagName: string
      postsNum: number
    }
  > = {}

  for (const post of posts) {
    for (const t of post.frontmatter.tags || []) {
      if (!tags[t]) tags[t] = { tagName: t, postsNum: 0 }
      tags[t].postsNum++
    }
  }

  return Object.values(tags)
}

export default async function Tags() {
  const tags = await getTags()
  return <TagsPage tags={tags} />
}

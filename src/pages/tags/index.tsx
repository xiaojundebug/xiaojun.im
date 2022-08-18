import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getLatestPosts } from '@/utils/post'
import Link from 'next/link'
import { animated, useTransition } from 'react-spring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

interface TagsInfo {
  tagName: string
  postsNum: number
}

export interface TagsProps {
  tags: TagsInfo[]
}

const Tags: NextPage<TagsProps> = props => {
  const { tags } = props
  const { t } = useTranslation('common')
  const transitions = useTransition(tags, {
    from: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0.5, opacity: 0 },
    trail: 20,
    reset: true
  })

  return (
    <div className="container flex flex-col items-center justify-center">
      <h2 className="font-medium text-3xl sm:text-5xl mt-20 sm:mt-40">{t('tags-page.title')}</h2>
      <p className="font-medium text-sm m-10 sm:m-14">{t('tags-page.desc', { count: tags.length })}</p>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {transitions((navStyles, { tagName, postsNum }) => (
          <animated.div key={tagName} style={navStyles}>
            <Link href={`/tags/${tagName}`}>
              <a
                className="border-b border-solid border-current transition hover:!opacity-100 hover:text-primary"
                style={{
                  fontSize: Math.min(14 + (postsNum - 1) * 6, 48),
                  opacity: Math.min(0.3 + (postsNum - 1) * 0.175, 1),
                }}
              >
                {tagName}
              </a>
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ locale }) => {
  const posts = await getLatestPosts({ orderBy: 'asc' })
  const tags: Record<string, TagsInfo> = {}

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      if (!tags[tag]) tags[tag] = { tagName: tag, postsNum: 0 }
      tags[tag].postsNum++
    }
  }

  return {
    props: {
      tags: Object.values(tags),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}

export default Tags

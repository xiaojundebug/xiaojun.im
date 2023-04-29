import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import { GetStaticProps } from 'next'
import { getLatestPosts } from '@/utils/post'
import Link from 'next/link'
import { animated, useTransition } from '@react-spring/web'
import classNames from 'classnames'
import useTranslation from '@/hooks/useTranslation'

const FONT_MIN = 12
const FONT_MAX = 48
const OPACITY_MIN = 0
const OPACITY_MAX = 1

interface TagsInfo {
  tagName: string
  postsNum: number
}

export interface TagsProps {
  tags: TagsInfo[]
}

const Tags: NextPageWithCustomProps<TagsProps> = props => {
  const { tags } = props
  const { t } = useTranslation()
  const transitions = useTransition(tags, {
    from: { scale: 0.5, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0.5, opacity: 0 },
    trail: 400 / tags.length,
    reset: true,
  })

  const totalNum = useMemo(() => tags.reduce((acc, cur) => acc + cur.postsNum, 0), [tags])

  return (
    <div className={classNames(styles.tags, 'prose-container flex flex-col items-center justify-center')}>
      <h2
        className={classNames(
          styles.title,
          'relative font-medium font-serif text-5xl mt-20 sm:mt-40',
        )}
      >
        {t('tags-page.title')}
      </h2>
      <p className="font-medium text-sm m-10 sm:m-14">
        {t('tags-page.desc', { count: tags.length })}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {transitions((tagStyles, { tagName, postsNum }) => (
          <animated.div key={tagName} style={tagStyles}>
            <Link href={`/tags/${tagName}`}>
              <a
                className="border-b border-current transition hover:!opacity-100 hover:text-[#ff7464]"
                style={{
                  // 该 tag 文章数占总数 20% 时字体达到最大
                  fontSize: Math.min(
                    FONT_MIN + ((postsNum / totalNum) * (FONT_MAX - FONT_MIN)) / 0.2,
                    FONT_MAX,
                  ),
                  // 该 tag 文章数占总数 10% 时字体颜色达到最深
                  opacity: Math.min(
                    OPACITY_MIN + ((postsNum / totalNum) * (OPACITY_MAX - OPACITY_MIN)) / 0.1,
                    OPACITY_MAX,
                  ),
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
    props: { tags: Object.values(tags) },
  }
}

export default Tags

'use client'

import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { animated, useTransition } from '@react-spring/web'
import clsx from 'clsx'
import useTranslation from '@/hooks/useTranslation'

const FONT_MIN = 12
const FONT_MAX = 48
const OPACITY_MIN = 0
const OPACITY_MAX = 1

export interface TagsPageProps {
  tags: {
    tagName: string
    postsNum: number
  }[]
}

const TagsPage: React.FC<TagsPageProps> = ({ tags }) => {
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
    <div className={clsx(styles.tags, 'prose-container flex flex-col items-center justify-center')}>
      <h2 className={clsx(styles.title, 'relative font-bold text-5xl mt-20 sm:mt-40 italic')}>
        {t('tags-page.title')}
      </h2>
      <p className="font-medium text-sm m-10 sm:m-14">
        {t('tags-page.desc', { count: tags.length })}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {transitions((tagStyles, { tagName, postsNum }) => (
          <animated.div key={tagName} style={tagStyles}>
            <Link
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
              href={`/tags/${tagName}`}
              prefetch={false}
            >
              {tagName}
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default TagsPage
